"use strict";
// n stuff
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubblesort = exports.binaryInsertionsort = exports.insertionSort = exports.selectionsort = exports.combsort = exports.heapsort = exports.mergesort = exports.quicksort = void 0;
// An elementary operation is any one of the arithmetic operations (addition, subtraction, multiplication, division) or a comparison between two numbers or the execution of a branching instruction.
// Stolen from https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/ 
// With heavy modification and help from Axel Thornberg
const quicksort = (list) => {
    if (list.length <= 1) {
        return list;
    }
    const pivot = list[Math.floor(Math.random() * list.length)];
    const leftArray = [];
    const rightArray = [];
    const equalities = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element < pivot) {
            leftArray.push(element);
        }
        else if (element === pivot) {
            equalities.push(element);
        }
        else {
            rightArray.push(element);
        }
    }
    return [...(0, exports.quicksort)(leftArray), ...equalities, ...(0, exports.quicksort)(rightArray)];
};
exports.quicksort = quicksort;
// Credit to https://www.doabledanny.com/merge-sort-javascript 
// With modification
const merge = (left, right) => {
    const sortedArr = []; // the sorted items will go here
    while (left.length > 0 && right.length > 0) {
        // Insert the smallest item into sortedArr
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        }
        else {
            sortedArr.push(right.shift());
        }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right];
};
const mergesort = (list) => {
    // Base case
    if (list.length <= 1) {
        return list;
    }
    const middleIndex = Math.floor(list.length / 2);
    // Recursive calls
    const left = (0, exports.mergesort)(list.slice(0, middleIndex));
    const right = (0, exports.mergesort)(list.slice(middleIndex));
    return merge(left, right);
};
exports.mergesort = mergesort;
// Source: https://bit.ly/3hEZdCl
// I renamed and moved some stuff for the sake of clearity
// Helper function
const heapify = (list, index, length) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let max = index;
    if (left < length && list[left] > list[max])
        max = left;
    if (right < length && list[right] > list[max])
        max = right;
    if (max !== index) {
        [list[max], list[index]] = [list[index], list[max]];
        heapify(list, max, length);
    }
};
const heapsort = (list) => {
    let length = list.length;
    for (let index = Math.floor(length / 2); index >= 0; index -= 1) {
        heapify(list, index, length);
    }
    ;
    for (let index = list.length - 1; index > 0; index--) {
        [list[0], list[index]] = [list[index], list[0]];
        length--;
        heapify(list, 0, length);
    }
    return list;
};
exports.heapsort = heapsort;
// Combsort by https://www.geeksforgeeks.org/comb-sort/ (user: decode2207)
// Renamed and move stuff yet again
// Helper function
const isSorted = (list) => {
    var isSorted = true;
    for (var index = 0; index < list.length - 1; index++) {
        if (list[index] > list[index + 1]) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
};
const combsort = (list) => {
    var iteration_count = 0;
    var gap = list.length - 2;
    var decrease_factor = 1.25;
    // Repeat iterations Until array is not sorted
    while (!isSorted(list)) {
        // If not first gap  Calculate gap
        if (iteration_count > 0) {
            gap = (gap == 1) ? gap : Math.floor(gap / decrease_factor);
        }
        // Set front and back elements and increment to a gap
        var front = 0;
        var back = gap;
        while (back <= list.length - 1) {
            // Swap the elements if they are not ordered
            if (list[front] > list[back]) {
                const temp = list[front];
                list[front] = list[back];
                list[back] = temp;
            }
            // Increment and re-run swapping
            front += 1;
            back += 1;
        }
        iteration_count += 1;
    }
    return list;
};
exports.combsort = combsort;
// Borrowed from https://www.doabledanny.com/selection-sort-javascript
// With only minor modificaftion
const selectionsort = (list) => {
    for (let index = 0; index < list.length; index++) {
        let lowest = index;
        for (let subIndex = index + 1; subIndex < list.length; subIndex++) {
            if (list[subIndex] < list[lowest]) {
                lowest = subIndex;
            }
        }
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
const insertionSort = (list) => {
    for (let index = 1; index < list.length; index++) {
        let currentValue = list[index];
        let subIndex;
        for (subIndex = index - 1; subIndex >= 0 && list[subIndex] > currentValue; subIndex--) {
            list[subIndex + 1] = list[subIndex];
        }
        list[subIndex + 1] = currentValue;
    }
    return list;
};
exports.insertionSort = insertionSort;
// Plagarized from https://www.geeksforgeeks.org/binary-insertion-sort/ (by user: unknown2108)
// Helper function to binary insertionsort
const binarySearch = (list, item, low, high) => {
    if (high <= low)
        return (item > list[low]) ? (low + 1) : low;
    const mid = Math.floor((low + high) / 2);
    if (item == list[mid])
        return mid + 1;
    if (item > list[mid])
        return binarySearch(list, item, mid + 1, high);
    return binarySearch(list, item, low, mid - 1);
};
const binaryInsertionsort = (unsortedList) => {
    const list = unsortedList;
    for (let index = 1; index < list.length; index++) {
        let subIndex = index - 1;
        let x = list[index];
        // Find location to insert
        // using binary search
        let location = Math.abs(binarySearch(list, x, 0, subIndex));
        // Shifting array to one
        // location right
        while (subIndex >= location) {
            list[subIndex + 1] = list[subIndex];
            subIndex--;
        }
        // Placing element at its
        // correct location
        list[subIndex + 1] = x;
    }
    return list;
};
exports.binaryInsertionsort = binaryInsertionsort;
// Reluctantly taken from https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
// I renamed stuff and removed comments
const bubblesort = (list) => {
    for (var index = 0; index < list.length; index++) {
        for (var subIndex = 0; subIndex < (list.length - index - 1); subIndex++) {
            if (list[subIndex] > list[subIndex + 1]) {
                const temp = list[subIndex];
                list[subIndex] = list[subIndex + 1];
                list[subIndex + 1] = temp;
            }
        }
    }
    return list;
};
exports.bubblesort = bubblesort;
