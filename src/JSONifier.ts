import * as fs from "fs"

export class CSVHandler {
    path: string
    loops: number
    listLength: number

    constructor(loops: number, listLength: number, path: string) {
        this.path = path
        this.loops = loops
        this.listLength = listLength

        // fs.appendFileSync(this.path, `\nLoops per alg: ${this.loops}. List length: ${this.listLength}.\n`)
    }

    write(alg: any, stats: any) {
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
        }

        fs.appendFileSync(this.path, JSON.stringify(output) + "\n", "utf-8")
    }
}