


// Stolen from https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/ 
// With heavy modification and help from Axel Thornberg
export const quicksort = (list: number[], mem: number[], ops: number[]): number[] => {
    mem.push(process.memoryUsage.rss())
    ops[0]++
    if (list.length <= 1) {
        return list;
    }

    const pivot = list[Math.floor(Math.random() * list.length)];
    const leftArray = [];
    const rightArray = [];
    const equalities = []
    for (let i = 0; i < list.length; i++) {
        ops[0]++
        const element = list[i]
        if (element < pivot) {
            ops[0]++
            leftArray.push(element);
        } else if (element === pivot) {
            ops[0] += 2
            equalities.push(element)
        } else {
            ops[0] += 2
            rightArray.push(element);
        }
    }

    return [...quicksort(leftArray, mem, ops), ...equalities, ...quicksort(rightArray, mem, ops)];
}



// Credit to https://www.doabledanny.com/merge-sort-javascript 
// With modification
const merge = (left: number[], right: number[], ops: number[]): number[] => {
    const sortedArr = [] // the sorted items will go here
    ops[0] += 2 // might be problematic if it loosly checks conditions
    while (left.length > 0 && right.length > 0) {
        // Insert the smallest item into sortedArr
        ops[0] += 1
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right] as number[]
}

export const mergesort = (list: number[], mem: number[], ops: number[]): number[] => {
    mem.push(process.memoryUsage.rss())

    // Base case
    ops[0] += 1
    if (list.length <= 1) { return list }
    const middleIndex = Math.floor(list.length / 2)

    // Recursive calls
    const left = mergesort(list.slice(0, middleIndex), mem, ops)
    const right = mergesort(list.slice(middleIndex), mem, ops)

    return merge(left, right, ops)
}
