"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tfjs_1 = require("@tensorflow/tfjs");
const tester_1 = require("./tester");
const algorithm_1 = require("./algorithm");
// Meta Settings
const algIndex = 2;
const loops = 100;
const listLength = 10000;
const getTime = () => {
    return parseInt(process.hrtime.bigint().toString().replace("n", ""));
};
const log = (x) => {
    return Math.log10(x);
};
const n = listLength;
const algQueue = [
    {
        name: "Quicksort",
        algorithm: algorithm_1.quicksort,
        averageOh: n * log(n),
        worstOh: n ** 2,
        bestOh: n * log(n)
    },
    {
        name: "Mergesort",
        algorithm: algorithm_1.mergesort,
        averageOh: n * log(n),
        worstOh: n ** 2,
        bestOh: n * log(n)
    },
    {
        name: "Heapsort",
        algorithm: algorithm_1.heapsort,
        averageOh: n * log(n),
        worstOh: n * log(n), bestOh: n * log(n)
    },
];
const stats = [];
for (let index = 0; index < algQueue.length; index++) {
    stats.push({ randomList: { times: [], ops: [] }, semiSorted: { times: [], ops: [] } });
}
const runAlg = (algIndex, verbose = false) => {
    const startTime = getTime();
    let lastPercent = 0;
    for (let index = 0; index < loops; index++) {
        // Percent readout
        const percent = Math.floor((index / loops) * 100 + 1);
        if (percent !== lastPercent) {
            console.clear();
            const fillAmount = (index / loops) * 20;
            let fill = "";
            for (let index = 0; index < 20; index++) {
                if (index < fillAmount) {
                    fill += "=";
                }
                else {
                    fill += " ";
                }
            }
            const bar = `[${fill}]`;
            console.log(percent + " % " + bar);
            console.log(`Runtime: ${((getTime() - startTime) * 10 ** -9).toFixed(1)} s`);
        }
        lastPercent = percent;
        let result;
        const sliceIndex = Math.random() * listLength; // randomize how big of slices to use for semisorted lists
        const fullList = (0, tfjs_1.abs)((0, tfjs_1.randomNormal)([listLength])).arraySync();
        const sortedEnd = fullList.slice(0, sliceIndex + 1).sort();
        const remainder = fullList.slice(sliceIndex, -1);
        const semiSortedList = sortedEnd.concat(remainder);
        const fullListTest = new tester_1.Tester(algQueue[algIndex].algorithm, fullList, algQueue[algIndex].averageOh, verbose);
        result = fullListTest.start();
        stats[algIndex].randomList.times.push(result.time);
        stats[algIndex].randomList.ops.push(result.ops);
        const semiSortedListTest = new tester_1.Tester(algQueue[algIndex].algorithm, semiSortedList, algQueue[algIndex].averageOh, verbose);
        result = semiSortedListTest.start();
        stats[algIndex].semiSorted.times.push(result.time);
        stats[algIndex].semiSorted.ops.push(result.ops);
        // Stability goes here i guess
    }
    return startTime;
};
const stopTime = runAlg(algIndex, true);
console.log(`\nAll of it took ${((getTime() - stopTime) * 10 ** -9).toFixed(1)} s \n`);
// Results
const randomListStats = {
    time: (0, tfjs_1.sum)(stats[algIndex].randomList.times).dataSync()[0] / stats[algIndex].randomList.times.length,
    ops: (0, tfjs_1.sum)(stats[algIndex].randomList.ops).dataSync()[0] / stats[algIndex].randomList.ops.length
};
const semiSortedListStats = {
    time: (0, tfjs_1.sum)(stats[algIndex].semiSorted.times).dataSync()[0] / stats[algIndex].semiSorted.times.length,
    ops: (0, tfjs_1.sum)(stats[algIndex].semiSorted.ops).dataSync()[0] / stats[algIndex].semiSorted.ops.length
};
const result = (`
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
    `);
console.log(result);
