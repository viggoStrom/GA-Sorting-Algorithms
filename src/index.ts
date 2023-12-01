
import { sum, randomNormal, abs, round } from "@tensorflow/tfjs"
import { Tester } from "./tester"
import { binaryInsertionsort, bubblesort, combsort, heapsort, insertionSort, mergesort, quicksort, selectionsort } from "./algorithm"
import { CSVHandler } from "./csvHandler"
// import { isMainThread, Worker, MessagePort, parentPort } from "node:worker_threads"

// if (isMainThread) {
//     const queue = []

//     const workers = []
//     for (let index = 0; index < 4; index++) {
//         workers.push(new Worker(__filename))
//     }

//     workers.forEach(worker => {
//         worker.on("message", (result) => {
//             console.log("here are the results:", result);
//         })
//     })


//     workers.forEach(worker => {
//         worker.postMessage("sort this: _")
//     })
// } else {
//     // Worker end
//     parentPort?.on("message", (order) => {
//         console.log(order, "recieved from parent");
//         const result = (randomNormal([1000]).arraySync() as number[]).sort().toString()
//         parentPort?.postMessage(result)
//     })
// }

const getTime = (): number => {
    return parseInt(process.hrtime.bigint().toString().replace("n", ""))
}
const log = (x: number): number => {
    return Math.log10(x)
}

const listLengths = [1_000, 500, 100, 50, 10, 5] // 10_000, 5_000,
const loops = 100
// const std: any[] = []
// const stdOf = (list: number[]): number => {
//     const mean = sum(list).dataSync()[0] / list.length
//     const tempList = []
//     for (let index = 0; index < list.length; index++) {
//         tempList.push((list[index] - mean) ** 2)
//     }
//     return Math.sqrt((1 / (list.length - 1)) * sum(tempList).dataSync()[0])
// }

const startTime = getTime()

for (let listIndex = 0; listIndex < listLengths.length; listIndex++) {
    const listLength = listLengths[listIndex]

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

    const runLoop = (algIndex: number, verbose = false): any => {

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
                console.log("List length: " + listLength);
                console.log(algQueue[algIndex].name + "ing");
                console.log(percent + " % " + bar);
                console.log(`Runtime: ${((getTime() - startTime) * 10 ** -9).toFixed(1)} s`);
            }
            lastPercent = percent

            const sliceIndex = Math.random() * listLength // randomize how big of slices to use for semisorted lists
            const fullList = (abs(randomNormal([listLength], 0, Math.random() * 1000 + 1),).arraySync() as number[]).map((x) => Math.round(x * 1000) / 1000)
            const sortedEnd = fullList.slice(0, sliceIndex + 1).sort()
            const remainder = fullList.slice(sliceIndex, -1)
            const semiSortedList = sortedEnd.concat(remainder)

            const fullListTest = new Tester(algQueue[algIndex].algorithm, fullList, algQueue[algIndex].averageOh, verbose)
            const fullListResult = fullListTest.start()
            stats[algIndex].randomList.times.push(fullListResult.time)
            stats[algIndex].randomList.ops.push(fullListResult.ops)
            stats[algIndex].randomList.isSorted = stats[algIndex].randomList.isSorted || fullListResult.isSorted
            stats[algIndex].randomList.isDestructive = !(!stats[algIndex].randomList.isDestructive || !fullListResult.isDestructive)

            const semiSortedListTest = new Tester(algQueue[algIndex].algorithm, semiSortedList, algQueue[algIndex].averageOh, verbose)
            const semiSortedResult = semiSortedListTest.start()
            stats[algIndex].semiSorted.times.push(semiSortedResult.time)
            stats[algIndex].semiSorted.ops.push(semiSortedResult.ops)
            stats[algIndex].semiSorted.isSorted = stats[algIndex].semiSorted.isSorted && semiSortedResult.isSorted
            stats[algIndex].semiSorted.isDestructive = stats[algIndex].semiSorted.isDestructive && semiSortedResult.isDestructive
        }

        return
    }

    const csvHandler = new CSVHandler(loops, listLength, "./outputs/master.txt")

    for (let algIndex = 0; algIndex < algQueue.length; algIndex++) {
        runLoop(algIndex, false)

        csvHandler.write(algQueue[algIndex], stats[algIndex])
    }
}

// console.log(std);
process.exit()

// const algIndex = 0

// // Results
// const randomListStats = {
//     time: sum(stats[algIndex].randomList.times).dataSync()[0] / stats[algIndex].randomList.times.length,
//     ops: sum(stats[algIndex].randomList.ops).dataSync()[0] / stats[algIndex].randomList.ops.length,
//     isSorted: stats[algIndex].randomList.isSorted,
//     isDestructive: stats[algIndex].randomList.isDestructive,
// }
// const semiSortedListStats = {
//     time: sum(stats[algIndex].semiSorted.times).dataSync()[0] / stats[algIndex].semiSorted.times.length,
//     ops: sum(stats[algIndex].semiSorted.ops).dataSync()[0] / stats[algIndex].semiSorted.ops.length,
//     isSorted: stats[algIndex].semiSorted.isSorted,
//     isDestructive: stats[algIndex].semiSorted.isDestructive,
// }

// const result = (
//     `
// Fully random list results on average:
//     Checks:
//         Is sorted: ${randomListStats.isSorted}
//         Is destructive: ${randomListStats.isDestructive}
//     Time:
//         ${(randomListStats.time * 10 ** -6).toFixed(0)} ms
//         ${randomListStats.time} ns
//     Operations:
//         Got: ${randomListStats.ops.toFixed(0)}
//         Expected average ${algQueue[algIndex].averageOh}
//         Expected worst ${algQueue[algIndex].worstOh}
//         Expected best ${algQueue[algIndex].bestOh}


// Semi sorted list results on average:
//     Checks:
//         Is sorted: ${semiSortedListStats.isSorted}
//         Is destructive: ${semiSortedListStats.isDestructive}
//     Time:
//         ${(semiSortedListStats.time * 10 ** -6).toFixed(0)} ms
//         ${semiSortedListStats.time} ns
//     Operations:
//         Got: ${semiSortedListStats.ops.toFixed(0)}
//         Expected average ${algQueue[algIndex].averageOh}
//         Expected worst ${algQueue[algIndex].worstOh}
//         Expected best ${algQueue[algIndex].bestOh}
//     `
// )
// console.log(`Using: ${algQueue[algIndex].name}`);
// console.log(result);