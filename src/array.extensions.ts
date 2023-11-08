
interface Array {
    swap(i: number, j: number): void,
    partition(lower: number, higher: number): number,
    quicksort(leftIndex?: number, rightIndex?: number): number[],
}

Array.prototype.swap = function (
    i: number,
    j: number,
): void {

    const iValue = this[i]
    const jValue = this[j]

    this[i] = jValue
    this[j] = iValue
}

Array.prototype.partition = function (
    lower: number,
    higher: number,
): number {

    const pivot = this[Math.floor(Math.random() * this.length)]

    let leftIndex = lower
    let rightIndex = higher

    while (true) {
        console.log(leftIndex, rightIndex);
        while (this[leftIndex] < pivot) {
            leftIndex++
        }

        while (this[rightIndex] > pivot) {
            rightIndex--
        }

        if (leftIndex >= rightIndex) {
            return rightIndex
        }

        this.swap(leftIndex, rightIndex)
    }
}

Array.prototype.quicksort = function (
    leftIndex: number = 0,
    rightIndex: number = this.length - 1
): number[] {
    if (this.length < 1) {

    }

    if (leftIndex >= 0 && rightIndex >= 0 && leftIndex < rightIndex) {
        const pivot = this.partition(leftIndex, rightIndex)
        this.quicksort(leftIndex, pivot)
        this.quicksort(pivot + 1, rightIndex)
    }

    return this
}
