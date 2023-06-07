import {newSampleNode} from "https://kairuz.github.io/acyoustic/sample-utils.js";
import Heap from "./heap.js";
import {Timer, Sampling, Bar, BarSamplingPair, BarTracking} from "./domain.js";


class SchedulerCallbacks {
  #barScheduled;
  #barStarted;
  #barEnded;
  #samplingStarted;
  #samplingEnded;

  constructor(barScheduled = (bar, samplings) => {},
              barStarted = (bar) => {},
              barEnded = (bar) => {},
              samplingStarted = (bar, sampling) => {},
              samplingEnded = (bar, sampling) => {}) {
    this.#barScheduled = barScheduled;
    this.#barStarted = barStarted;
    this.#barEnded = barEnded;
    this.#samplingStarted = samplingStarted;
    this.#samplingEnded = samplingEnded;
  }

  get barScheduled() {return this.#barScheduled;}
  get barStarted() {return this.#barStarted;}
  get barEnded() {return this.#barEnded;}
  get samplingStarted() {return this.#samplingStarted;}
  get samplingEnded() {return this.#samplingEnded;}
}

const DEFAULT_SCHEDULER_CALLBACKS = new SchedulerCallbacks();


class Scheduler {
  #audioContext;
  #timer;
  #barDescriptorProducer;
  #nextBarDescriptor;

  #lastScheduledTime = null;
  #lastScheduledDuration = 0;

  #sampleNames;
  #sampleAudioBuffers;
  #samplingsBuffer = new Heap((a, b) => a.sampling.timestamp - b.sampling.timestamp, false);
  #startedSamplings = new Set();
  #running = true;

  #bars = new Map();
  #barTrackingsBuffer = [];
  #barTrackings = new Map();

  #callbacks;

  constructor(audioContext, barDescriptorProducer, sampleNames, sampleAudioBuffers, callbacks = DEFAULT_SCHEDULER_CALLBACKS) {
    if (audioContext.state !== 'running') {
      throw `illegal audioContext state ${audioContext.state}`;
    }
    if (!Array.isArray(sampleAudioBuffers) || sampleAudioBuffers.length === 0) {
      throw `sampleAudioBuffers must be non-empty array`;
    }

    this.#audioContext = audioContext;
    this.#barDescriptorProducer = barDescriptorProducer;
    this.#sampleNames = sampleNames;
    this.#sampleAudioBuffers = sampleAudioBuffers;
    this.#callbacks = callbacks;
    // this.#timer = new Timer(() => Math.trunc(audioContext.currentTime * 1000));
    this.#timer = new Timer(() => audioContext.currentTime * 1000);

    this.#nextBarDescriptor = this.#barDescriptorProducer.produce();

    this.#lastScheduledTime = this.#timer.currentTime + Math.abs(this.#nextBarDescriptor.earliestSamplingOffset);
    this.#lastScheduledDuration = this.#nextBarDescriptor.duration;

    const samplingDescriptors = this.#nextBarDescriptor.samplingDescriptorsCopy();
    console.log(`samplingDescriptors ${samplingDescriptors.join(',')}`);

    const barTimestamp = this.#lastScheduledTime;
    const bar = new Bar(barTimestamp, this.#nextBarDescriptor);
    this.#bars.set(bar.id, bar);

    this.#bufferSamplings(bar);

    this.#nextBarDescriptor = this.#barDescriptorProducer.produce();

    // while (this.#lastScheduledTime < (this.#timer.currentTime + Math.abs(this.#barDescriptorProducer.earliestSamplingOffset))) {
    while (this.#lastScheduledTime < (this.#timer.currentTime + -this.#barDescriptorProducer.earliestSamplingOffset)) {
      this.#scheduleBar();
    }
    setTimeout(() => this.#scheduleBarLoop());
  }

  #bufferSamplings(bar) {
    const samplings = Array.from(this.#nextBarDescriptor.samplingDescriptorsValues(), (samplingDescriptor) => {
      const sampling = new Sampling(samplingDescriptor, bar.timestamp);
      const barSamplingPair = new BarSamplingPair(bar, sampling);
      this.#samplingsBuffer.add(barSamplingPair);
      return sampling;
    });

    this.#callbacks.barScheduled(bar, samplings);
    this.#barTrackings.set(bar, new BarTracking(this.#timer.currentTime, bar.timestamp, samplings));
  }

  #scheduleBar() {
    const barTimestamp = this.#lastScheduledTime + this.#lastScheduledDuration;
    const bar = new Bar(barTimestamp, this.#nextBarDescriptor);
    this.#bars.set(bar.id, bar);

    console.log(`scheduleBar lastTime ${this.#lastScheduledTime}, lastDuration ${this.#lastScheduledDuration}, barTimestamp=${barTimestamp}`);
    this.#bufferSamplings(bar);

    this.#lastScheduledTime = barTimestamp;
    this.#lastScheduledDuration = this.#nextBarDescriptor.duration;

    this.#nextBarDescriptor = this.#barDescriptorProducer.produce();
  }

  #sequenceSamplingDescriptors() {
    while (this.#samplingsBuffer.isNotEmpty() &&
           ((this.#timer.currentTime + 100 /*300*/) > this.#samplingsBuffer.peek().sampling.timestamp)) {

      const barSamplingPair = this.#samplingsBuffer.pop();
      const sampling = barSamplingPair.sampling;
      const bar = barSamplingPair.bar;
      const sampleNode = newSampleNode(this.#sampleAudioBuffers[this.#sampleNames.indexOf(sampling.descriptor.sampleName)], this.#audioContext);

      const startedSampling = [sampling, sampleNode];

      sampleNode.addEventListener('ended', () => {
        const endedTime = this.#timer.currentTime;
        // console.log(`${endedTime} sampling     ended ${sampling.toIdStr()} ` +
        //             `seq->end=${Math.trunc(endedTime - sequencedTime)}`);
        this.#callbacks.samplingEnded(bar, sampling);
        this.#startedSamplings.delete(startedSampling);
        const samplingEndedBarTracking = this.#barTrackings.get(bar);
        samplingEndedBarTracking.samplingEnded(sampling, endedTime);
        if (samplingEndedBarTracking.isCompleted()) {
          this.#callbacks.barEnded(bar);
          this.#barTrackings.delete(bar);
          this.#barTrackingsBuffer.push([bar, samplingEndedBarTracking]);

          if (this.#barTrackingsBuffer.length > 50) {
            this.#barTrackingsBuffer.shift();
          }
        }

      });

      const sequencedTime = this.#timer.currentTime;
      // console.log(`${sequencedTime} sampling sequenced ${sampling.toIdStr()}`);

      const [sampleNodeStartWhen, sampleNodeOffset] =
          sampling.timestamp < 0 ?
              [0, ((-sampling.timestamp + this.#timer.currentTime) / 1000)] :
              [sampling.timestamp / 1000, undefined];

      sampleNode.start(sampleNodeStartWhen, sampleNodeOffset);

      this.#startedSamplings.add(startedSampling);

      const barTracking = this.#barTrackings.get(bar);
      if (barTracking.isNotStarted()) {
        this.#callbacks.barStarted(bar);
      }
      barTracking.samplingStarted(sampling, sequencedTime);
      this.#callbacks.samplingStarted(bar, sampling);
    }
  }

  #scheduleBarLoop() {
    while (this.#lastScheduledTime < (this.#timer.currentTime + -this.#barDescriptorProducer.earliestSamplingOffset)) {
      this.#scheduleBar();
    }

    if (this.#running) {
      this.#sequenceSamplingDescriptors();
      setTimeout(() => {
        if (this.#running) {
          this.#scheduleBarLoop()
        }
        else {
          console.log('barPipeline push loop stopping');
        }
      }, 50);
    }
  }

  get bars() {return this.#bars};
  get barTrackings() {return this.#barTrackings;}
  get barTrackingsBuffer() {return this.#barTrackingsBuffer;}
  get barDescriptorProducer() {return this.#barDescriptorProducer;}
  get lastScheduledTime() {return this.#lastScheduledTime;}
  get lastScheduledDuration() {return this.#lastScheduledDuration;}
  get running() {return this.#running;}
  get startedSamplings() {return this.#startedSamplings;}
  get sampleAudioBuffers() {return this.#sampleAudioBuffers;}
  get samplingsBuffer() {return this.#samplingsBuffer;}
  get timer() {return this.#timer;}
  get audioContext() {return this.#audioContext;}

  stop() {
    this.#running = false;
  }
}


export {
  Scheduler, SchedulerCallbacks
}
