"use strict";
Array.prototype.swap = function (i, j) {
    const iValue = this[i];
    const jValue = this[j];
    this[i] = jValue;
    this[j] = iValue;
};
Array.prototype.partition = function (lower, higher) {
    const pivot = this[Math.floor(Math.random() * this.length)];
    let leftIndex = lower;
    let rightIndex = higher;
    while (true) {
        console.log(leftIndex, rightIndex);
        while (this[leftIndex] < pivot) {
            leftIndex++;
        }
        while (this[rightIndex] > pivot) {
            rightIndex--;
        }
        if (leftIndex >= rightIndex) {
            return rightIndex;
        }
        this.swap(leftIndex, rightIndex);
    }
};
Array.prototype.quicksort = function (leftIndex = 0, rightIndex = this.length - 1) {
    if (this.length < 1) {
    }
    if (leftIndex >= 0 && rightIndex >= 0 && leftIndex < rightIndex) {
        const pivot = this.partition(leftIndex, rightIndex);
        this.quicksort(leftIndex, pivot);
        this.quicksort(pivot + 1, rightIndex);
    }
    return this;
};
