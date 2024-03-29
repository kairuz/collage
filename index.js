import {downloadBuffer} from "https://kairuz.github.io/acyoustic/sample-utils.js";
import {sampleNames, sampleModels} from "./projects/lambda-project.js";
import {Scheduler, SchedulerCallbacks} from "./scheduler.js";
import BarDescriptorProducer from "./bar-descriptor-producer.js";

let scheduler = null;

const barDescriptorProducer = new BarDescriptorProducer();

const runScheduler = () => {

  const visualsDiv = document.getElementById('visuals');
  const audioContext = new AudioContext();

  const sampleBuffersPromise = Promise.all(Object.entries(sampleModels).map(([sampleName, {path}]) => {
    return downloadBuffer(audioContext, path);
  }));

  sampleBuffersPromise
      .then((sampleBuffers) => {

        const SamplingUi = (sampling, barDuration, earliestSamplingOffset) => {
          const sampleBuffer = sampleBuffers[sampleNames.indexOf(sampling.descriptor.sampleName)];

          const div = document.createElement('div');
          div.classList.add('samplingUiDiv');
          div.style.display = 'inline-block';
          div.style.position = 'relative';
          div.style.margin = '4px';
          div.style.height = '20px';

          div.style.width = `${Math.trunc(sampleBuffer.duration * 50)}px`;
          div.style.color = 'grey';
          div.style.outline = '1px solid lightgrey';

          div.textContent = `${Math.trunc(sampling.timestamp / 100) / 10}`;

          return {
            getSampling: () => sampling,
            getDiv: () => div,
            setAsStarted: () => {
              div.style.color = 'black';
              div.style.outline = '2px solid darkgreen';
            },
            setAsPlaying: () => {
              div.style.outline = '4px solid lightgreen';
              div.style['background-position'] = 'right';
              div.offsetHeight; // force animation on browser
              div.style['background'] = 'linear-gradient(to right, lightblue 50%, transparent 50%) left';
              div.style['background-size'] = '200%';
              const transitionDurationSecs = sampleBuffer.duration;
              div.style['transition'] = `background ${transitionDurationSecs}s linear`;
            },
            setAsDone: () => {
              div.style.outline = '2px solid orange';
            },
          }
        };

        const BarUi = (bar, samplings) => {
          const div = document.createElement('div');
          div.classList.add('barUiDiv');
          div.style.position = 'relative';
          div.style.margin = '20px';
          div.style.outline = '4px solid lightgrey';
          div.style['overflow'] = 'hidden';

          div.textContent = `${bar.id}-${Math.trunc(bar.timestamp)}-${bar.descriptor.duration}`;
          const samplingsDiv = document.createElement('div');
          samplingsDiv.classList.add('barUiSamplingsDiv');
          div.appendChild(samplingsDiv);


          const sampleNameDivs = new Map();

          const samplingUis = new Map();
          samplings.forEach((sampling) => {
            const samplingUi = SamplingUi(sampling, bar.descriptor.duration, barDescriptorProducer.earliestSamplingOffset);
            samplingUis.set(sampling, samplingUi);

            if (sampleNameDivs.has(sampling.descriptor.sampleName)) {
              sampleNameDivs.get(sampling.descriptor.sampleName).appendChild(samplingUi.getDiv());
            }
            else {
              const sampleNameDiv = document.createElement('div');
              sampleNameDiv.classList.add('sampleNameDiv');
              sampleNameDiv.style.position = 'relative';
              sampleNameDiv.style.margin = '10px';
              const sampleNameDivNameDiv = document.createElement('div');
              sampleNameDivNameDiv.classList.add('sampleNameDivNameDiv');
              sampleNameDivNameDiv.style.position = 'absolute';
              sampleNameDivNameDiv.textContent = sampling.descriptor.sampleName;
              sampleNameDiv.appendChild(sampleNameDivNameDiv);
              sampleNameDiv.appendChild(document.createElement('br'));
              sampleNameDivs.set(sampling.descriptor.sampleName, sampleNameDiv);
              samplingsDiv.appendChild(sampleNameDiv);
              sampleNameDiv.appendChild(samplingUi.getDiv());
            }

          });
          return {
            getBar: () => bar,
            getSamplingUi: (sampling) => samplingUis.get(sampling),
            getDiv: () => div,
            getSamplingsDiv: () => samplingsDiv,
            setAsStarted: () => {
              div.style.outline = '4px solid darkgreen';
            },
            setAsPlaying: () => {
              div.style.outline = '4px solid green';
            },
            setAsDone: () => {
              div.style['height'] = `${div.clientHeight}px`;
              div.style['transition'] = 'height 0.5s ease, margin 0.5s ease, outline 0.2s ease';
              div.style['overflow'] = 'hidden';

              div.offsetHeight;
              div.style['height'] = '0';
              div.style['margin'] = '0 20px 0 20px';
              div.style['outline'] = '4px solid transparent';
              div.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'height') {
                  div.remove();
                }
              });
            }
          }
        };

        const barUis = new Map();
        const schedulerCallbacks = new SchedulerCallbacks(
            (bar, samplings) => {
              console.log(`bar ${bar.id} samplings ${samplings.map((sampling) => sampling.id).join(',')} scheduled`);
              const barUi = BarUi(bar, samplings);
              visualsDiv.appendChild(barUi.getDiv());
              barUis.set(bar, barUi);
            },
            (bar) => {
              console.log(`bar ${bar.id} started`);
              const barUi = barUis.get(bar);
              barUi.setAsPlaying();
            },
            (bar) => {
              console.log(`bar ${bar.id} ended`);
              const barUi = barUis.get(bar);
              barUis.delete(bar);
              barUi.setAsDone();
            },
            (bar, sampling) => {
              const barUi = barUis.get(bar);
              const samplingUi = barUi.getSamplingUi(sampling);
              samplingUi.setAsStarted();
              setTimeout(() => samplingUi.setAsPlaying(), sampling.timestamp - scheduler.timer.currentTime);
            },
            (bar, sampling) => {
              const barUi = barUis.get(bar);
              const samplingUi = barUi.getSamplingUi(sampling);
              samplingUi.setAsDone();
            },
        );

        stopScheduler();
        scheduler = new Scheduler(audioContext, barDescriptorProducer, sampleNames, sampleBuffers, schedulerCallbacks);
      })
      .catch((err) => {
        console.log('err ', err);
        throw err;
      });

};


const stopScheduler = () => {
  scheduler?.stop();
  const visualsDiv = document.getElementById('visuals');
  while (visualsDiv.firstChild) {
    visualsDiv.removeChild(visualsDiv.firstChild);
  }
};

window.addEventListener('load', () => {
  document.getElementById('start').addEventListener('click', () => runScheduler());
  document.getElementById('stop').addEventListener('click', () => stopScheduler());
});
