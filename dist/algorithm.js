"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubblesort = exports.binaryInsertionsort = exports.insertionSort = exports.selectionsort = exports.combsort = exports.heapsort = exports.mergesort = exports.quicksort = void 0;
// Stolen from https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/ 
// With heavy modification and help from Axel Thornberg
const quicksort = (list, ops) => {
    ops[0]++;
    if (list.length <= 1) {
        return list;
    }
    const pivot = list[Math.floor(Math.random() * list.length)];
    ops[0]++;
    const leftArray = [];
    const rightArray = [];
    const equalities = [];
    for (let i = 0; i < list.length; i++) {
        ops[0]++;
        const element = list[i];
        if (element < pivot) {
            ops[0]++;
            leftArray.push(element);
        }
        else if (element === pivot) {
            ops[0] += 2;
            equalities.push(element);
        }
        else {
            ops[0] += 2;
            rightArray.push(element);
        }
    }
    return [...(0, exports.quicksort)(leftArray, ops), ...equalities, ...(0, exports.quicksort)(rightArray, ops)];
};
exports.quicksort = quicksort;
// Credit to https://www.doabledanny.com/merge-sort-javascript 
// With modification
const merge = (left, right, ops) => {
    const sortedArr = []; // the sorted items will go here
    while (left.length > 0 && right.length > 0) {
        ops[0] += 2;
        // Insert the smallest item into sortedArr
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        }
        else {
            sortedArr.push(right.shift());
        }
        ops[0]++;
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right];
};
const mergesort = (list, ops) => {
    // Base case
    if (list.length <= 1) {
        ops[0]++;
        return list;
    }
    const middleIndex = Math.floor(list.length / 2);
    ops[0]++;
    // Recursive calls
    const left = (0, exports.mergesort)(list.slice(0, middleIndex), ops);
    const right = (0, exports.mergesort)(list.slice(middleIndex), ops);
    return merge(left, right, ops);
};
exports.mergesort = mergesort;
// Source: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/js/s/heapsort.md
// I renamed and moved some stuff for the sake of clarity
// Helper function
const heapify = (list, index, length, ops) => {
    const left = 2 * index + 1;
    ops[0] += 2;
    const right = 2 * index + 2;
    ops[0] += 2;
    let max = index;
    if (left < length && list[left] > list[max]) {
        max = left;
    }
    ;
    ops[0] += 2;
    if (right < length && list[right] > list[max]) {
        max = right;
    }
    ;
    ops[0] += 3;
    if (max !== index) {
        [list[max], list[index]] = [list[index], list[max]];
        heapify(list, max, length, ops);
    }
};
const heapsort = (list, ops) => {
    let length = list.length;
    ops[0]++;
    for (let index = Math.floor(length / 2); index >= 0; index--) {
        ops[0] += 2;
        heapify(list, index, length, ops);
    }
    ;
    ops[0]++;
    for (let index = list.length - 1; index > 0; index--) {
        ops[0] += 2;
        [list[0], list[index]] = [list[index], list[0]];
        length--;
        ops[0]++;
        heapify(list, 0, length, ops);
    }
    return list;
};
exports.heapsort = heapsort;
// Combsort by https://www.geeksforgeeks.org/comb-sort/ (user: decode2207)
// Renamed and move stuff yet again
// Helper function
const isSorted = (list, ops) => {
    var isSorted = true;
    for (var index = 0; index < list.length - 1; index++) {
        ops[0] += 2;
        if (list[index] > list[index + 1]) {
            ops[0] += 2;
            isSorted = false;
            break;
        }
    }
    return isSorted;
};
const combsort = (list, ops) => {
    var iteration_count = 0;
    var gap = list.length - 2;
    ops[0]++;
    var decrease_factor = 1.25;
    // Repeat iterations Until array is not sorted
    while (!isSorted(list, ops)) {
        // If not first gap  Calculate gap
        ops[0]++;
        if (iteration_count > 0) {
            ops[0]++;
            if (gap !== 1) {
                gap = Math.floor(gap / decrease_factor);
                ops[0]++;
            }
        }
        // Set front and back elements and increment to a gap
        var front = 0;
        var back = gap;
        while (back <= list.length - 1) {
            ops[0] += 2;
            // Swap the elements if they are not ordered
            ops[0]++;
            if (list[front] > list[back]) {
                const temp = list[front];
                list[front] = list[back];
                list[back] = temp;
            }
            // Increment and re-run swapping
            front += 1;
            back += 1;
            ops[0] += 2;
        }
        ops[0]++;
        iteration_count += 1;
    }
    return list;
};
exports.combsort = combsort;
// Borrowed from https://www.doabledanny.com/selection-sort-javascript
// With only minor modificaftion
const selectionsort = (list, ops) => {
    for (let index = 0; index < list.length; index++) {
        ops[0] += 2;
        let lowest = index;
        for (let subIndex = index + 1; subIndex < list.length; subIndex++) {
            ops[0] += 4;
            if (list[subIndex] < list[lowest]) {
                lowest = subIndex;
            }
        }
        ops[0]++;
        if (lowest !== index) {
            // Swap
            [list[index], list[lowest]] = [list[lowest], list[index]];
        }
    }
    return list;
};
exports.selectionsort = selectionsort;
// Borrowed from https://www.doabledanny.com/selection-sort-javascript
// With only minor modificaftion
const insertionSort = (list, ops) => {
    for (let index = 1; index < list.length; index++) {
        ops[0] += 2;
        let currentValue = list[index];
        let subIndex;
        for (subIndex = index - 1; subIndex >= 0 && list[subIndex] > currentValue; subIndex--) {
            ops[0] += 5;
            list[subIndex + 1] = list[subIndex];
        }
        ops[0]++;
        list[subIndex + 1] = currentValue;
    }
    return list;
};
exports.insertionSort = insertionSort;
// Plagarized from https://www.geeksforgeeks.org/binary-insertion-sort/ (by user: unknown2108)
// Helper function to binary insertionsort
const binarySearch = (list, item, low, high, ops) => {
    if (high <= low) {
        ops[0] += 2;
        if (item > list[low]) {
            ops[0]++;
            return low + 1;
        }
        else {
            return low;
        }
    }
    ops[0]++;
    const mid = Math.floor((low + high) / 2);
    ops[0]++;
    if (item == list[mid]) {
        ops[0]++;
        return mid + 1;
    }
    ops[0]++;
    if (item > list[mid]) {
        ops[0]++;
        return binarySearch(list, item, mid + 1, high, ops);
    }
    ops[0]++;
    return binarySearch(list, item, low, mid - 1, ops);
};
const binaryInsertionsort = (unsortedList, ops) => {
    const list = unsortedList;
    for (let index = 1; index < list.length; index++) {
        ops[0] += 3;
        let subIndex = index - 1;
        let x = list[index];
        let location = Math.abs(binarySearch(list, x, 0, subIndex, ops));
        while (subIndex >= location) {
            ops[0] += 2;
            list[subIndex + 1] = list[subIndex];
            subIndex--;
        }
        ops[0]++;
        list[subIndex + 1] = x;
    }
    return list;
};
exports.binaryInsertionsort = binaryInsertionsort;
// Reluctantly taken from https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
// I renamed stuff and removed comments
const bubblesort = (list, ops) => {
    for (var index = 0; index < list.length; index++) {
        ops[0] += 2;
        for (var subIndex = 0; subIndex < (list.length - index - 1); subIndex++) {
            ops[0] += 4;
            if (list[subIndex] > list[subIndex + 1]) {
                ops[0] += 4;
                const temp = list[subIndex];
                list[subIndex] = list[subIndex + 1];
                list[subIndex + 1] = temp;
            }
        }
    }
    return list;
};
exports.bubblesort = bubblesort;
