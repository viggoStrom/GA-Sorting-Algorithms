
// n stuff

// An elementary operation is any one of the arithmetic operations (addition, subtraction, multiplication, division) or a comparison between two numbers or the execution of a branching instruction.


// Stolen from https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/ 
// With heavy modification and help from Axel Thornberg
export const quicksort = (list: number[]): number[] => {
    if (list.length <= 1) {
        return list;
    }

    const pivot = list[Math.floor(Math.random() * list.length)];
    const leftArray = [];
    const rightArray = [];
    const equalities = []
    for (let i = 0; i < list.length; i++) {
        const element = list[i]
        if (element < pivot) {
            leftArray.push(element);
        } else if (element === pivot) {
            equalities.push(element)
        } else {
            rightArray.push(element);
        }
    }

    return [...quicksort(leftArray), ...equalities, ...quicksort(rightArray)];
}

// Credit to https://www.doabledanny.com/merge-sort-javascript 
// With modification
const merge = (left: number[], right: number[]): number[] => {
    const sortedArr = [] // the sorted items will go here
    while (left.length > 0 && right.length > 0) {
        // Insert the smallest item into sortedArr
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right] as number[]
}
export const mergesort = (list: number[]): number[] => {
    // Base case
    if (list.length <= 1) { return list }
    const middleIndex = Math.floor(list.length / 2)

    // Recursive calls
    const left = mergesort(list.slice(0, middleIndex))
    const right = mergesort(list.slice(middleIndex))

    return merge(left, right)
}

// Source: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/js/s/heapsort.md
// I renamed and moved some stuff for the sake of clarity
// Helper function
const heapify = (list: number[], index: number, length: number) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let max = index;
    if (left < length && list[left] > list[max]) max = left;
    if (right < length && list[right] > list[max]) max = right;
    if (max !== index) {
        [list[max], list[index]] = [list[index], list[max]];
        heapify(list, max, length);
    }
};
export const heapsort = (list: number[]): number[] => {
    let length = list.length;

    for (let index = Math.floor(length / 2); index >= 0; index -= 1) {
        heapify(list, index, length)
    };
    for (let index = list.length - 1; index > 0; index--) {
        [list[0], list[index]] = [list[index], list[0]];
        length--;
        heapify(list, 0, length);
    }
    return list;
};

// Combsort by https://www.geeksforgeeks.org/comb-sort/ (user: decode2207)
// Renamed and move stuff yet again
// Helper function
const isSorted = (list: number[]): boolean => {
    var isSorted = true;
    for (var index = 0; index < list.length - 1; index++) {
        if (list[index] > list[index + 1]) {
            isSorted = false;
            break;
        }
    }
    return isSorted;
}
export const combsort = (list: number[]): number[] => {
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
}

// Borrowed from https://www.doabledanny.com/selection-sort-javascript
// With only minor modificaftion
export const selectionsort = (list: number[]): number[] => {
    for (let index = 0; index < list.length; index++) {
        let lowest = index
        for (let subIndex = index + 1; subIndex < list.length; subIndex++) {
            if (list[subIndex] < list[lowest]) {
                lowest = subIndex
            }
        }
        if (lowest !== index) {
            // Swap
            [list[index], list[lowest]] = [list[lowest], list[index]]
        }
    }
    return list
}

// Borrowed from https://www.doabledanny.com/selection-sort-javascript
// With only minor modificaftion
export const insertionSort = (list: number[]): number[] => {
    for (let index = 1; index < list.length; index++) {
        let currentValue = list[index]
        let subIndex
        for (subIndex = index - 1; subIndex >= 0 && list[subIndex] > currentValue; subIndex--) {
            list[subIndex + 1] = list[subIndex]
        }
        list[subIndex + 1] = currentValue
    }
    return list
}

// Plagarized from https://www.geeksforgeeks.org/binary-insertion-sort/ (by user: unknown2108)
// Helper function to binary insertionsort
const binarySearch = (list: number[], item: number, low: number, high: number): number => {
    if (high <= low)
        return (item > list[low]) ? (low + 1) : low;

    const mid = Math.floor((low + high) / 2);

    if (item == list[mid])
        return mid + 1;

    if (item > list[mid])
        return binarySearch(list, item, mid + 1, high);

    return binarySearch(list, item, low, mid - 1);
}
export const binaryInsertionsort = (unsortedList: number[]): number[] => {
    const list = unsortedList
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
    return list
}

// Reluctantly taken from https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
// I renamed stuff and removed comments
export const bubblesort = (list: number[]): number[] => {
    for (var index = 0; index < list.length; index++) {
        for (var subIndex = 0; subIndex < (list.length - index - 1); subIndex++) {
            if (list[subIndex] > list[subIndex + 1]) {
                const temp = list[subIndex]
                list[subIndex] = list[subIndex + 1]
                list[subIndex + 1] = temp
            }
        }
    }
    return list
}
