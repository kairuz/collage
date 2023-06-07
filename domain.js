class Timer {
  #callback;

  constructor(callback) {
    this.#callback = callback;
  }

  get currentTime() {
    return this.#callback();
  }
}

let samplingDescriptorSeq = BigInt(0);

class SamplingDescriptor {
  #id;
  #sampleName;
  #offset;

  constructor(sampleName, offset) {
    this.#id = samplingDescriptorSeq++;
    this.#sampleName = sampleName;
    this.#offset = offset;
  }

  toString(){
    return `smplngDesc{id=${this.#id},smplNm=${this.#sampleName},offset=${this.#offset}}`;
  }
  get id() {return this.#id;}
  get sampleName() {return this.#sampleName;}
  get offset() {return this.#offset;}
}


let barDescriptorSeq = BigInt(0);

class BarDescriptor {
  #id;
  #duration;
  #samplingDescriptors;
  #earliestSamplingOffset;

  constructor(duration, samplingDescriptors) {
    this.#id = barDescriptorSeq++;
    this.#duration = duration;
    this.#samplingDescriptors = [...samplingDescriptors];
    this.#earliestSamplingOffset = samplingDescriptors.reduce((acc, elem) => Math.min(acc, elem.offset), 0);
  }

  samplingDescriptorsValues() {
    return this.#samplingDescriptors.values();
  }

  samplingDescriptorsCopy() {
    return [...this.#samplingDescriptors];
  }

  get samplingDescriptorsLength() {return this.#samplingDescriptors.length;}

  toString() {return `barDesc{id=${this.#id},duration=${this.#duration},samplingDescs=${this.#samplingDescriptors}}`;}

  get id() {return this.#id;}
  get duration() {return this.#duration;}
  get earliestSamplingOffset() {return this.#earliestSamplingOffset;}
}


let barSeq = BigInt(0);

class Bar {
  #id;
  #timestamp;
  #descriptor;

  constructor(timestamp, descriptor) {
    this.#id = barSeq++;
    this.#timestamp = timestamp;
    this.#descriptor = descriptor;
  }

  toString() {return `bar{id=${this.#id},timestamp=${this.#timestamp},desc=${this.#descriptor}}`;}

  get id() {return this.#id;}
  get timestamp() {return this.#timestamp;}
  get descriptor() {return this.#descriptor;}
}


let samplingSeq = BigInt(0);

class Sampling {
  #id;
  #descriptor;
  #barTimestamp;

  constructor(descriptor, barTimestamp) {
    this.#id = samplingSeq++;
    this.#descriptor = descriptor;
    this.#barTimestamp = barTimestamp;
  }

  toString() {
    return `smplng{id=${this.#id},timestamp=${this.timestamp},descriptor=${this.#descriptor},barTimestamp=${this.#barTimestamp}}`;
  }

  get id() {return this.#id;}
  get timestamp() {return this.#barTimestamp + this.#descriptor.offset;}
  get descriptor() {return this.#descriptor;}
  get barTimestamp() {return this.#barTimestamp;}
}


class BarSamplingPair {
  #bar;
  #sampling;
  constructor(bar, sampling) {
    this.#bar = bar;
    this.#sampling = sampling;
  }
  get bar() {return this.#bar;}
  get sampling() {return this.#sampling;}
}

class SamplingTracking {
  #started = null;
  #ended = null;

  toString() {
    return `start=${Math.trunc(this.#started)},end=${Math.trunc(this.#ended)}, ` +
           `start->end=${Math.trunc(this.#ended - this.#started)}`;
  }

  isCompleted() {return this.#started !== null && this.#ended !== null};
  isUncompleted() {return !this.isCompleted()};

  set started(started) {this.#started = started;}
  set ended(ended) {this.#ended = ended;}

  get started() {return this.#started;}
  get ended() {return this.#ended;}
}

class BarTracking {
  #produced;
  #timestamp;
  #samplings;
  #samplingTrackings;
  #started = null;
  #completed = null;

  constructor(time, timestamp, samplings) {
    this.#produced = time;
    this.#timestamp = timestamp;
    this.#samplings = samplings;
    this.#samplingTrackings = Array.from(Array(samplings.length).keys()).map(() => new SamplingTracking());
  }

  samplingStarted(sampling, time) {
    if (this.isCompleted()) {
      throw 'illegal state - already completed';
    }

    if (this.isNotStarted()) {
      this.#started = time;
    }

    this.#samplingTrackings[this.#samplings.indexOf(sampling)].started = time;
  }

  samplingEnded(sampling, time) {
    if (this.isNotStarted()) {
      throw 'illegal state - not yet started';
    }
    if (this.isCompleted()) {
      throw 'illegal state - already completed';
    }

    this.#samplingTrackings[this.#samplings.indexOf(sampling)].ended = time;

    if (this.samplingTrackingsUncompleted.length === 0) {
      this.#completed = time;
    }
  }

  isCompleted() {return this.#completed !== null;}
  isNotCompleted() {return !this.isCompleted();}

  isStarted() {return this.#started !== null;}
  isNotStarted() {return !this.isStarted();}

  get produced(){return this.#produced;}
  get timestamp(){return this.#timestamp;}
  get samplings(){return this.#samplings;}
  get samplingTrackings(){return this.#samplingTrackings;}
  get started(){return this.#started;}
  get completed(){return this.#completed;}

  get samplingTrackingsCompleted() {
    return this.#samplingTrackings.filter((samplingTracking) => samplingTracking.isCompleted())
  }

  get samplingTrackingsUncompleted() {
    return this.#samplingTrackings.filter((samplingTracking) => samplingTracking.isUncompleted())
  }

  get samplingsUncompleted() {
    return this.#samplingTrackings
        .map((samplingTracking, i) => [samplingTracking, i])
        .filter((samplingTrackingAndIndex) => samplingTrackingAndIndex[0].isUncompleted())
        .map((samplingTrackingAndIndex) => this.#samplings[samplingTrackingAndIndex[1]]);
  }

  get samplingsCompleted() {
    return this.#samplingTrackings
        .map((samplingTracking, i) => [samplingTracking, i])
        .filter((samplingTrackingAndIndex) => samplingTrackingAndIndex[0].isCompleted())
        .map((samplingTrackingAndIndex) => this.#samplings[samplingTrackingAndIndex[1]]);
  }
}


export {
  Timer,
  SamplingDescriptor, BarDescriptor,
  Bar, Sampling, BarSamplingPair,
  BarTracking, SamplingTracking
};
