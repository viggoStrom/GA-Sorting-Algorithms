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
const fs = __importStar(require("fs/promises"));
class CSVHandler {
    constructor(path) {
        this.path = path;
        fs.appendFile(this.path, "Rand/Sort, NAME, TIMES, TimesLENGTH, times..., OPS, opsLENGTH, ...ops,\n");
    }
    write(alg, stats) {
        let output = "";
        output += "Rand" + "," + alg.name + "," + "TIMES" + stats.randomList.times.length.toString() + "," + stats.randomList.times.toString() + "," + `OPS-> (${stats.randomList.ops.length})` + "," + stats.randomList.ops.toString() + "," + "\n";
        output += "Sort" + "," + alg.name + "," + "TIMES" + stats.semiSorted.times.length.toString() + "," + stats.semiSorted.times.toString() + "," + `OPS-> (${stats.semiSorted.ops.length})` + "," + stats.semiSorted.ops.toString() + "," + "\n";
        fs.appendFile(this.path, output);
    }
}
exports.CSVHandler = CSVHandler;
