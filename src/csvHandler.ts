import * as fs from "fs/promises"

export class CSVHandler {
    path: string

    constructor(path: string) {
        this.path = path
        fs.appendFile(this.path, "Rand/Sort, NAME, TIMES, TimesLENGTH, times..., OPS, opsLENGTH, ...ops,\n")
    }

    write(alg: any, stats: any) {
        let output = ""

        output += "Rand" + "," + alg.name + "," + "TIMES" + stats.randomList.times.length.toString() + "," + stats.randomList.times.toString() + "," + `OPS-> (${stats.randomList.ops.length})` + "," + stats.randomList.ops.toString() + "," + "\n"
        output += "Sort" + "," + alg.name + "," + "TIMES" + stats.semiSorted.times.length.toString() + "," + stats.semiSorted.times.toString() + "," + `OPS-> (${stats.semiSorted.ops.length})` + "," + stats.semiSorted.ops.toString() + "," + "\n"

        fs.appendFile(this.path, output)
    }
}