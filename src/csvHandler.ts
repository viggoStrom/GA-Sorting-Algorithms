import * as fs from "fs/promises"

export class CSVHandler {
    path: string

    constructor(path: string) {
        this.path = path
        fs.appendFile(this.path, "")
    }

    write(output: any) {
        let data = ""
        if (typeof output === "number") {
            data = output.toString()
        } else if (typeof output === "object") {
            Object.keys(output).forEach((key) => {
                data += output[key].toString() + ","
            })
        } else {
            data = output
        }

        fs.appendFile(this.path, data + "\n")
    }
}