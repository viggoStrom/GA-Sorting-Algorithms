
import { sum, randomNormal, abs } from "@tensorflow/tfjs"
import { Tester } from "./tester"
import { binaryInsertionsort, bubblesort, combsort, heapsort, insertionSort, mergesort, quicksort, selectionsort } from "./algorithm"
import { CSVHandler } from "./JSONifier"

const getTime = (): number => {
    return parseInt(process.hrtime.bigint().toString().replace("n", ""))
}
const log = (x: number): number => {
    return Math.log10(x)
}

const listLengths = [100000, 90000, 80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100,90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const loops = 100

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

process.exit()
