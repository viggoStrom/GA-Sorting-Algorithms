"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
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
var addLeadingZeros = function (binaryString) {
    if (binaryString === "0") {
        return "00000000";
    }
    else {
        return binaryString.replace(/^0*/, "0".repeat(8 - binaryString.length));
    }
};
var bitmap = fs.readFileSync("./graphs/normalDist.bmp", "binary").split("");
var bitmapLength = bitmap.length;
for (var index = 0; index < bitmapLength; index++) {
    var bin = bitmap[index].charCodeAt(0).toString(2);
    if (bin !== "11111111") {
        var row = "".concat(index, " ").concat(bitmap[index], " ").concat(addLeadingZeros(bin));
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
