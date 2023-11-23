
import { sum, randomNormal, abs } from "@tensorflow/tfjs"
import { Tester } from "./tester"
import { binaryInsertionsort, bubblesort, combsort, heapsort, insertionSort, mergesort, quicksort, selectionsort } from "./algorithm"
import { CSVHandler } from "./csvHandler"
import * as fs from "fs/promises"


// Meta Settings
const algIndex = 2
const loops = 100
const listLength = 10_000

const getTime = (): number => {
    return parseInt(process.hrtime.bigint().toString().replace("n", ""))
}
const log = (x: number): number => {
    return Math.log10(x)
}
const n = listLength
const algQueue: any = [
    {
        name: "Quicksort",
        algorithm: quicksort,
        averageOh: n * log(n),
        worstOh: n ** 2,
        bestOh: n * log(n)
    },
    {
        name: "Mergesort",
        algorithm: mergesort,
        averageOh: n * log(n),
        worstOh: n ** 2,
        bestOh: n * log(n)
    },
    {
        name: "Heapsort",
        algorithm: heapsort,
        averageOh: n * log(n),
        worstOh: n * log(n),
        bestOh: n * log(n)
    },
    {
        name: "Combsort",
        algorithm: combsort,
        averageOh: "tbd",
        worstOh: n ** 2,
        bestOh: n * log(n)
    },
    {
        name: "Selectionsort",
        algorithm: selectionsort,
        averageOh: n ** 2,
        worstOh: n ** 2,
        bestOh: n ** 2
    },
    {
        name: "Insertionsort",
        algorithm: insertionSort,
        averageOh: n ** 2,
        worstOh: n ** 2,
        bestOh: n
    },
    {
        name: "Binary Insertionsort",
        algorithm: binaryInsertionsort,
        averageOh: n ** 2,
        worstOh: n ** 2,
        bestOh: n
    },
    {
        name: "Bubblesort",
        algorithm: bubblesort,
        averageOh: n ** 2,
        worstOh: n ** 2,
        bestOh: n * log(n)
    },
]
const stats: any = []
for (let index = 0; index < algQueue.length; index++) {
    stats.push({ randomList: { times: [], ops: [], isSorted: true, isDestructive: false }, semiSorted: { times: [], ops: [], isSorted: true, isDestructive: false } })
}


const runAlg = (algIndex: number, verbose = false): number => {
    const startTime = getTime()

    let lastPercent = 0
    for (let index = 0; index < loops; index++) {

        // Percent readout
        const percent = Math.floor((index / loops) * 100 + 1)
        if (percent !== lastPercent) {
            console.clear()

            const fillAmount = (index / loops) * 20
            let fill = ""
            for (let index = 0; index < 20; index++) {
                if (index < fillAmount) {
                    fill += "="
                } else {
                    fill += " "
                }
            }
            const bar = `[${fill}]`
            console.log(algQueue[algIndex].name + "ing");
            console.log(percent + " % " + bar);
            console.log(`Runtime: ${((getTime() - startTime) * 10 ** -9).toFixed(1)} s`);
        }
        lastPercent = percent


        let result

        const sliceIndex = Math.random() * listLength // randomize how big of slices to use for semisorted lists
        const fullList = abs(randomNormal([listLength])).arraySync() as number[]
        const sortedEnd = fullList.slice(0, sliceIndex + 1).sort()
        const remainder = fullList.slice(sliceIndex, -1)
        const semiSortedList = sortedEnd.concat(remainder)

        const fullListTest = new Tester(algQueue[algIndex].algorithm, fullList, algQueue[algIndex].averageOh, verbose)
        result = fullListTest.start()
        stats[algIndex].randomList.times.push(result.time)
        stats[algIndex].randomList.ops.push(result.ops)
        stats[algIndex].randomList.isSorted = stats[algIndex].randomList.isSorted || result.isSorted
        stats[algIndex].randomList.isDestructive = !(!stats[algIndex].randomList.isDestructive || !result.isDestructive)

        // const semiSortedListTest = new Tester(algQueue[algIndex].algorithm, semiSortedList, algQueue[algIndex].averageOh, verbose)
        // result = semiSortedListTest.start()
        // stats[algIndex].semiSorted.times.push(result.time)
        // stats[algIndex].semiSorted.ops.push(result.ops)
        // stats[algIndex].semiSorted.isSorted = stats[algIndex].semiSorted.isSorted && result.isSorted
        // stats[algIndex].semiSorted.isDestructive = stats[algIndex].semiSorted.isDestructive && result.isDestructive

        // Stability goes here i guess
    }

    return startTime
}

const stopTime = runAlg(algIndex, false)
console.log(`\nAll of it took ${((getTime() - stopTime) * 10 ** -9).toFixed(1)} s \n`);

const csvHandler = new CSVHandler("./outputs/master.csv")
csvHandler.write(algQueue[algIndex], stats[algIndex])

// Results
const randomListStats = {
    time: sum(stats[algIndex].randomList.times).dataSync()[0] / stats[algIndex].randomList.times.length,
    ops: sum(stats[algIndex].randomList.ops).dataSync()[0] / stats[algIndex].randomList.ops.length,
    isSorted: stats[algIndex].randomList.isSorted,
    isDestructive: stats[algIndex].randomList.isDestructive,
}
const semiSortedListStats = {
    time: sum(stats[algIndex].semiSorted.times).dataSync()[0] / stats[algIndex].semiSorted.times.length,
    ops: sum(stats[algIndex].semiSorted.ops).dataSync()[0] / stats[algIndex].semiSorted.ops.length,
    isSorted: stats[algIndex].semiSorted.isSorted,
    isDestructive: stats[algIndex].semiSorted.isDestructive,
}

const result = (
    `
Fully random list results on average:
    Checks:
        Is sorted: ${randomListStats.isSorted}
        Is destructive: ${randomListStats.isDestructive}
    Time:
        ${(randomListStats.time * 10 ** -6).toFixed(0)} ms
        ${randomListStats.time} ns
    Operations:
        Got: ${randomListStats.ops.toFixed(0)}
        Expected average ${algQueue[algIndex].averageOh}
        Expected worst ${algQueue[algIndex].worstOh}
        Expected best ${algQueue[algIndex].bestOh}


Semi sorted list results on average:
    Checks:
        Is sorted: ${semiSortedListStats.isSorted}
        Is destructive: ${semiSortedListStats.isDestructive}
    Time:
        ${(semiSortedListStats.time * 10 ** -6).toFixed(0)} ms
        ${semiSortedListStats.time} ns
    Operations: 
        Got: ${semiSortedListStats.ops.toFixed(0)}
        Expected average ${algQueue[algIndex].averageOh}
        Expected worst ${algQueue[algIndex].worstOh}
        Expected best ${algQueue[algIndex].bestOh}
    `
)
console.log(`Using: ${algQueue[algIndex].name}`);
console.log(result);