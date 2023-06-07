export default class Heap {
  #arr = [];
  #isMax;
  #isGreaterThan;

  constructor(compare, isMax = true) {
    if (typeof compare !== 'function') {
      throw 'compare callback param must be a function';
    }
    this.#isGreaterThan = (a, b) => compare(a, b) > 0;
    this.#isMax = isMax;
  }

  add(val) {
    this.#arr.push(val);
    if (this.#arr.length > 1) {
      const lastIndex = this.#arr.length - 1;
      this.#trickleUp(lastIndex);
    }
  }

  #trickleUp(index) {
    const val = this.#arr[index];
    const parentInd = Math.floor((index - 1) / 2);
    const parentVal = this.#arr[parentInd];

    if (parentInd >= 0 &&
        (this.#isMax ?
         this.#isGreaterThan(val, parentVal) :
         this.#isGreaterThan(parentVal, val))) {
      this.#arr[parentInd] = val;
      this.#arr[index] = parentVal;
      this.#trickleUp(parentInd);
    }
  }

  peek() {
    if (this.#arr.length === 0) {
      throw 'heap is empty';
    }
    return this.#arr[0];
  }

  pop() {
    if (this.#arr.length === 0) {
      throw 'heap is empty';
    }
    else if (this.#arr.length === 1) {
      return this.#arr.pop();
    }
    const popped = this.#arr[0];
    this.#arr[0] = this.#arr.pop();
    this.#trickleDown(0);
    return popped;
  }

  #trickleDown(index) {
    const val = this.#arr[index];
    const child1Index = (index * 2) + 1;

    const hasChild1 = child1Index in this.#arr;

    if (hasChild1) {
      const child2Index = (index * 2) + 2;
      const child1Val = this.#arr[child1Index];
      const hasChild2 = child2Index in this.#arr;
      const child2Val = hasChild2 ? this.#arr[child2Index] : null;

      const chosenChildIndex = hasChild2 &&
                               (this.#isMax ? this.#isGreaterThan(child2Val, child1Val) : this.#isGreaterThan(child1Val, child2Val)) ?
                               child2Index : child1Index;
      const chosenChildValue = this.#arr[chosenChildIndex];
      const violation = this.#isMax ? this.#isGreaterThan(chosenChildValue, val) : this.#isGreaterThan(val, chosenChildValue);

      if (violation) {
        this.#arr[index] = chosenChildValue;
        this.#arr[chosenChildIndex] = val;
        this.#trickleDown(chosenChildIndex);
      }
    }

  }

  toArray() {
    return [...this.#arr];
  }

  isEmpty() {
    return this.#arr.length === 0;
  }

  isNotEmpty() {
    return !this.isEmpty();
  }

  get size() {
    return this.#arr.length;
  }

}
