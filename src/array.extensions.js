Array.prototype.swap = function (i, j) {
    var iValue = this[i];
    var jValue = this[j];
    this[i] = jValue;
    this[j] = iValue;
};
Array.prototype.partition = function (lower, higher) {
    var pivot = this[Math.floor(Math.random() * this.length)];
    var leftIndex = lower;
    var rightIndex = higher;
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
Array.prototype.quicksort = function (leftIndex, rightIndex) {
    if (leftIndex === void 0) { leftIndex = 0; }
    if (rightIndex === void 0) { rightIndex = this.length - 1; }
    if (this.length < 1) {
    }
    if (leftIndex >= 0 && rightIndex >= 0 && leftIndex < rightIndex) {
        var pivot = this.partition(leftIndex, rightIndex);
        this.quicksort(leftIndex, pivot);
        this.quicksort(pivot + 1, rightIndex);
    }
    return this;
};
