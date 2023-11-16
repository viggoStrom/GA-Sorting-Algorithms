


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