import {samplingDescriptors, barDescriptors} from "./projects/lambda-project.js";


class BarDescriptorProducer {

  #earliestSamplingOffset;
  #currIndex;

  constructor() {
    this.#earliestSamplingOffset = samplingDescriptors.reduce((acc, elem) => Math.min(acc, elem.offset), 0);
    this.#currIndex = 0;
  }

  produce() {

    const produced = barDescriptors[this.#currIndex++];

    if (this.#currIndex === barDescriptors.length) {
      this.#currIndex = 0;
    }

    return produced;
  };

  get earliestSamplingOffset() {return this.#earliestSamplingOffset;}
}


export default BarDescriptorProducer;
