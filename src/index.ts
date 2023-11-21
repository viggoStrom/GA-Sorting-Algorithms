
import { sum, randomNormal, abs } from "@tensorflow/tfjs"
import { Tester } from "./tester"
import { heapsort, mergesort, quicksort } from "./algorithm"


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
        worstOh: n * log(n
        ), bestOh: n * log(n)
    },
]
const stats: any = []
for (let index = 0; index < algQueue.length; index++) {
    stats.push({ randomList: { times: [], ops: [] }, semiSorted: { times: [], ops: [] } })
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

        const semiSortedListTest = new Tester(algQueue[algIndex].algorithm, semiSortedList, algQueue[algIndex].averageOh, verbose)
        result = semiSortedListTest.start()
        stats[algIndex].semiSorted.times.push(result.time)
        stats[algIndex].semiSorted.ops.push(result.ops)

        // Stability goes here i guess
    }

    return startTime
}

const stopTime = runAlg(algIndex, true)
console.log(`\nAll of it took ${((getTime() - stopTime) * 10 ** -9).toFixed(1)} s \n`);

// Results
const randomListStats = {
    time: sum(stats[algIndex].randomList.times).dataSync()[0] / stats[algIndex].randomList.times.length,
    ops: sum(stats[algIndex].randomList.ops).dataSync()[0] / stats[algIndex].randomList.ops.length
}
const semiSortedListStats = {
    time: sum(stats[algIndex].semiSorted.times).dataSync()[0] / stats[algIndex].semiSorted.times.length,
    ops: sum(stats[algIndex].semiSorted.ops).dataSync()[0] / stats[algIndex].semiSorted.ops.length
}
const result = (
    `
Using: ${algQueue[algIndex].name}

Fully random list results on average:
    ${(randomListStats.time * 10 ** -6).toFixed(0)} ms
    ${randomListStats.time} ns
    ${randomListStats.ops.toFixed(0)} operations:
        Expected average ${algQueue[algIndex].averageOh}
        Expected worst ${algQueue[algIndex].worstOh}
        Expected best ${algQueue[algIndex].bestOh}

Semi sorted list results on average:
    ${(semiSortedListStats.time * 10 ** -6).toFixed(0)} ms
    ${semiSortedListStats.time} ns
    ${semiSortedListStats.ops.toFixed(0)} operations: 
        Expected average ${algQueue[algIndex].averageOh}
        Expected worst ${algQueue[algIndex].worstOh}
        Expected best ${algQueue[algIndex].bestOh}
    `
)

console.log(result);
