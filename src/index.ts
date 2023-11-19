
import * as tf from "@tensorflow/tfjs"
import { mergesort, quicksort } from "./algorithm"
import { Tester } from "./tester"


// Meta Settings
const loops = 10
const listLength = 10000

const algQueue: any = [
    { name: "Quicksort", algorithm: quicksort, expectedO: Math.round(listLength * Math.log10(listLength)) }, // n*log(n)
    { name: "Mergesort", algorithm: mergesort, expectedO: Math.round(listLength * Math.log10(listLength)) }, // n*log(n)
]
const stats: any = [
    { randomList: { times: [], ops: [] }, semiSorted: { times: [], ops: [] } },
    { randomList: { times: [], ops: [] }, semiSorted: { times: [], ops: [] } },
]

const algIndex = 0

// The Testening
let lastPercent = 0
for (let index = 0; index < loops; index++) {

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
    }
    lastPercent = percent

    let result

    const sliceIndex = Math.random() * listLength // randomize how big of slices to use for semisorted lists
    const fullList = tf.abs(tf.randomNormal([listLength])).arraySync() as number[]
    const sortedEnd = fullList.slice(0, sliceIndex + 1).sort()
    const remainder = fullList.slice(sliceIndex, -1)
    const semiSortedList = sortedEnd.concat(remainder)

    const fullQuicksort = new Tester(algQueue[algIndex].algorithm, fullList, algQueue[algIndex].expectedO, false)
    result = fullQuicksort.start()
    stats[algIndex].randomList.times.push(result.time)
    stats[algIndex].randomList.ops.push(result.ops)

    const semiSortedQuicksort = new Tester(algQueue[algIndex].algorithm, semiSortedList, algQueue[algIndex].expectedO, false)
    result = semiSortedQuicksort.start()
    stats[algIndex].semiSorted.times.push(result.time)
    stats[algIndex].semiSorted.ops.push(result.ops)

    // Test more algorithms here
}

// Results
const randomListStats = {
    time: tf.sum(stats[algIndex].randomList.times).dataSync()[0] / stats[algIndex].randomList.times.length,
    ops: tf.sum(stats[algIndex].randomList.ops).dataSync()[0] / stats[algIndex].randomList.ops.length
}
const semiSortedListStats = {
    time: tf.sum(stats[algIndex].semiSorted.times).dataSync()[0] / stats[algIndex].semiSorted.times.length,
    ops: tf.sum(stats[algIndex].semiSorted.ops).dataSync()[0] / stats[algIndex].semiSorted.ops.length
}
const result = (
    `
Using: ${algQueue[algIndex].name}

Fully random list results on average:
    ${randomListStats.time} ns
    ${(randomListStats.time * 10 ** -6).toFixed(2)} ms
    ${randomListStats.ops.toFixed(0)} operations (expected ${algQueue[algIndex].expectedO})

Semi sorted list results on average:
    ${semiSortedListStats.time} ns
    ${(semiSortedListStats.time * 10 ** -6).toFixed(2)} ms
    ${semiSortedListStats.ops.toFixed(0)} operations (expected ${algQueue[algIndex].expectedO})
    `
)
console.log(result);
































// Browser Stuff

// const max: number = tf.argMax(list).dataSync()[0]
// const min: number = tf.argMin(list).dataSync()[0]

// // const steps: number = 20
// // const percentList = (list.arraySync() as number[]).map((element) => 5000 * element / max).sort()
// // const normalDistList: number[] = []

// // for (let index = 0; index < percentList.length; index += listLength / steps) {
// //     for (let localIndex = 0; localIndex < listLength / steps; localIndex++) {
// //         normalDistList.push(percentList[index + localIndex])
// //     }
// // }

// // console.log(normalDistList);

// // fs.writeFileSync("src/dataVis/dataVisOut.csv", normalDistList.toString())




// BMP stuff

// const binToBase64 = (fullBin: string): string => {
//     const chunks = []
//     for (let index = 0; index < fullBin.length; index += 6) {
//         chunks.push(fullBin.slice(index, index + 6))
//     }
//     const conversionMap: {} = {
//         "000000": "A",
//         "000001": "B",
//         "000010": "C",
//         "000011": "D",
//         "000100": "E",
//         "000101": "F",
//         "000110": "G",
//         "000111": "H",
//         "001000": "I",
//         "001001": "J",
//         "001010": "K",
//         "001011": "L",
//         "001100": "M",
//         "001101": "N",
//         "001110": "O",
//         "001111": "P",
//         "010000": "Q",
//         "010001": "R",
//         "010010": "S",
//         "010011": "T",
//         "010100": "U",
//         "010101": "V",
//         "010110": "W",
//         "010111": "X",
//         "011000": "Y",
//         "011001": "Z",
//         "011010": "a",
//         "011011": "b",
//         "011100": "c",
//         "011101": "d",
//         "011110": "e",
//         "011111": "f",
//         "100000": "g",
//         "100001": "h",
//         "100010": "i",
//         "100011": "j",
//         "100100": "k",
//         "100101": "l",
//         "100110": "m",
//         "100111": "n",
//         "101000": "o",
//         "101001": "p",
//         "101010": "q",
//         "101011": "r",
//         "101100": "s",
//         "101101": "t",
//         "101110": "u",
//         "101111": "v",
//         "110000": "w",
//         "110001": "x",
//         "110010": "y",
//         "110011": "z",
//         "110100": "0",
//         "110101": "1",
//         "110110": "2",
//         "110111": "3",
//         "111000": "4",
//         "111001": "5",
//         "111010": "6",
//         "111011": "7",
//         "111100": "8",
//         "111101": "9",
//         "111110": "+",
//         "111111": "/",
//     }
//     let base64Data = ""
//     chunks.forEach((chunk: string) => {
//         base64Data += (conversionMap as any)[chunk]
//     })
//     return base64Data
// }
// const base64ToBin = (fullBase64: string): string => {
//     const conversionMap: {} = {
//         "A": "000000",
//         "B": "000001",
//         "C": "000010",
//         "D": "000011",
//         "E": "000100",
//         "F": "000101",
//         "G": "000110",
//         "H": "000111",
//         "I": "001000",
//         "J": "001001",
//         "K": "001010",
//         "L": "001011",
//         "M": "001100",
//         "N": "001101",
//         "O": "001110",
//         "P": "001111",
//         "Q": "010000",
//         "R": "010001",
//         "S": "010010",
//         "T": "010011",
//         "U": "010100",
//         "V": "010101",
//         "W": "010110",
//         "X": "010111",
//         "Y": "011000",
//         "Z": "011001",
//         "a": "011010",
//         "b": "011011",
//         "c": "011100",
//         "d": "011101",
//         "e": "011110",
//         "f": "011111",
//         "g": "100000",
//         "h": "100001",
//         "i": "100010",
//         "j": "100011",
//         "k": "100100",
//         "l": "100101",
//         "m": "100110",
//         "n": "100111",
//         "o": "101000",
//         "p": "101001",
//         "q": "101010",
//         "r": "101011",
//         "s": "101100",
//         "t": "101101",
//         "u": "101110",
//         "v": "101111",
//         "w": "110000",
//         "x": "110001",
//         "y": "110010",
//         "z": "110011",
//         "0": "110100",
//         "1": "110101",
//         "2": "110110",
//         "3": "110111",
//         "4": "111000",
//         "5": "111001",
//         "6": "111010",
//         "7": "111011",
//         "8": "111100",
//         "9": "111101",
//         "+": "111110",
//         "/": "111111",
//     }
//     const splitBase64 = fullBase64.split("")
//     let binaryData = ""
//     splitBase64.forEach((letter: string) => {
//         binaryData += (conversionMap as any)[letter]
//     })

//     return binaryData
// }
// // const decToBase64 = (fullDec: string): string => {
// //     return
// // }
// const replaceAt = (string: string, index: number, replacement: string): string => {
//     return string.substring(0, index) + replacement + string.substring(index + replacement.length);
// }


// class bitmapInterface {
//     height: number;
//     width: number;
//     rowPadding: number;
//     headerSize: number;
//     path: string;
//     data: string;
//     // header: string;
//     constructor(path: string) {
//         this.height = 500
//         this.width = 1000
//         this.rowPadding = 24
//         this.headerSize = 496 // 14 * 8
//         // this.header = `BM${decToBase64(this.height * (this.width + this.offset) + this.headerSize)}AAAA`
//         this.path = path
//         fs.appendFileSync(this.path, "base64")
//         this.data = base64ToBin(fs.readFileSync(this.path, "base64"))
//         // fs.writeFileSync("./outputs/binOut.txt", this.data)
//     }

//     write = (): void => {
//         fs.writeFileSync(this.path, binToBase64(this.data), "base64")
//     }

//     whiteAt = (x: number, y: number) => {
//         const index: number = this.headerSize + (x + (this.width + this.rowPadding) * (this.height - y));
//         this.data = replaceAt(this.data, index, "1")
//         console.log(replaceAt(this.data, index, "1"));
//         this.write()
//     }
// }

// const bmp = new bitmapInterface("./graphs/normalDist.bmp")

// bmp.whiteAt(0, 1)
// bmp.whiteAt(1000, 1)
// bmp.whiteAt(0, 500)
// bmp.whiteAt(1000, 500)