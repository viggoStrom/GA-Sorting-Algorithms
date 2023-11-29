"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVHandler = void 0;
const fs = __importStar(require("fs"));
class CSVHandler {
    constructor(loops, listLength, path) {
        this.path = path;
        this.loops = loops;
        this.listLength = listLength;
        // fs.appendFileSync(this.path, `\nLoops per alg: ${this.loops}. List length: ${this.listLength}.\n`)
    }
    write(alg, stats) {
        const output = {
            name: alg.name,
            metaData: {
                "loops": this.loops,
                "listLength": this.listLength,
                "averageOh": Math.floor(alg.averageOh)
            },
            randomList: {
                "times": [...stats.randomList.times].toString(),
                "ops": [...stats.randomList.ops].toString(),
                "isSorted": stats.randomList.isSorted,
                "isDestructive": stats.randomList.isDestructive,
                // "mem": [...stats.randomList.mem]
            },
            semiSortedList: {
                "times": [...stats.semiSorted.times].toString(),
                "ops": [...stats.semiSorted.ops].toString(),
                "isSorted": stats.semiSorted.isSorted,
                "isDestructive": stats.semiSorted.isDestructive,
                // "mem": [...stats.semiSortedList.mem]
            }
        };
        fs.appendFileSync(this.path, JSON.stringify(output) + "\n", "utf-8");
    }
}
exports.CSVHandler = CSVHandler;
