import * as fs from "node:fs/promises"

class opsCounter {
    count: number
    constructor() {
        fs.appendFile("./outputs/opsCount.txt", "")
        this.count = 0
    }
    increment() {
        this.count++
    }
}

opsCounter

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