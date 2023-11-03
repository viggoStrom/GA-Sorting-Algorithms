
import * as tf from "@tensorflow/tfjs"
import * as fs from "fs"

// const listLength: number = 1000
// const list: tf.Tensor = tf.randomNormal([listLength])
// const max: number = tf.argMax(list).dataSync()[0]
// const min: number = tf.argMin(list).dataSync()[0]
// const span: number = max - min
// const values: number[] = new Array(40)

// for (let index = 0; index < listLength; index++) {
// if () {

// }
// }

// const map: string[] = [ // ▮
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
// ]

const addLeadingZeros = (binaryString: string): string => {
    if (binaryString === "0") {
        return "00000000"
    } else {
        return binaryString.replace(/^0*/, "0".repeat(8 - binaryString.length));
    }
}

const bitmap: string[] = fs.readFileSync("./graphs/normalDist.bmp", "binary").split("")
const bitmapLength: number = bitmap.length
for (let index = 0; index < bitmapLength; index++) {

    const bin: string = bitmap[index].charCodeAt(0).toString(2)
    if (bin !== "11111111") {
        const row: string = `${index} ${bitmap[index]} ${addLeadingZeros(bin)}`
        console.log(row);
    }
    // fs.appendFileSync("./outputs/binOut.txt", addLeadingZeros(bin) + "\n", "binary")
}

// const fileRows = fs.readFileSync("./outputs/binOut.txt", "binary").split("\n")

// fileRows.forEach((row, index) => {
//     const [base, middle, topLeft, bottomRight] = row.split("  ")
//     if (base !== bottomRight) {
//         console.log(index, row);
//     }
// })
