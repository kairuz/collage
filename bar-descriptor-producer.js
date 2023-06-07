import {SAMPLING_DESCRIPTORS, BAR_DESCRIPTORS} from "./projects/lambda-project.js";


class BarDescriptorProducer {

  #earliestSamplingOffset;
  #currIndex;

  constructor() {
    this.#earliestSamplingOffset = SAMPLING_DESCRIPTORS.reduce((acc, elem) => Math.min(acc, elem.offset), 0);
    this.#currIndex = 0;
  }

  produce() {

    const produced = BAR_DESCRIPTORS[this.#currIndex++];

    if (this.#currIndex === BAR_DESCRIPTORS.length) {
      this.#currIndex = 0;
    }

    return produced;
  };

  get earliestSamplingOffset() {return this.#earliestSamplingOffset;}
}


export default BarDescriptorProducer;
