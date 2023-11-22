
export class Tester {
    startTime: number
    stopTime: number
    time: number
    list: number[]
    initialLength: number
    inventory: any
    algorithm: Function
    expectedOps: number
    humanReadable: boolean

    constructor(algorithm: Function, list: number[], expectedOps: number, humanReadable: boolean = false) {
        this.startTime = 0
        this.stopTime = 0
        this.time = 0
        this.list = list
        this.initialLength = list.length
        this.inventory = this.takeInventory(this.list)
        this.algorithm = algorithm
        this.expectedOps = expectedOps
        this.humanReadable = humanReadable
    }

    takeInventory(list: number[]): any {
        const inventory: any = {}
        for (let index = 0; index < this.initialLength; index++) {
            const selector = list[index].toString()
            if (inventory[selector] === undefined) {
                inventory[selector] = 1
            } else {
                inventory[selector]++
            }
        }
        return inventory
    }

    startTimer(): void {
        this.startTime = parseInt(process.hrtime.bigint().toString().replace("n", ""))
    }

    stopTimer(): void {
        this.stopTime = parseInt(process.hrtime.bigint().toString().replace("n", ""))
    }

    getMS(): number {
        return Math.floor((this.stopTime - this.startTime) * 10 ** -6)
    }

    getNS(): number {
        return this.stopTime - this.startTime
    }

    isSorted(sortedList: number[]): boolean {
        const length = sortedList.length
        for (let index = 0; index < length; index++) {
            if (sortedList[index] > sortedList[index + 1]) {
                return false
            }
        }
        return true
    }

    isDestructive(sortedList: number[]): boolean {
        if (this.initialLength !== sortedList.length) {
            return true
        }

        let isDestructive = false
        const sortedInventory = this.takeInventory(sortedList)
        Object.keys(sortedInventory).forEach(element => {
            isDestructive = !(!isDestructive && sortedInventory[element] === this.inventory[element])
        })

        return isDestructive
    }

    start(): { time: number, ops: number, isSorted: boolean, isDestructive: boolean } {
        const mem: number[] = []
        const ops: number[] = [0]

        this.startTimer()
        const sortedList = this.algorithm.call(undefined, this.list, mem, ops)
        this.stopTimer()

        const time = this.getNS()

        if (!this.humanReadable) {
            return { time, ops: ops[0], isSorted: this.isSorted(sortedList), isDestructive: this.isDestructive(sortedList) }
        }

        const result = (
            `
Time: ${this.getNS()} ns (${this.getMS()} ms)
Is sorted: ${this.isSorted(sortedList) ? "yes" : "no"}
Is destructive: ${this.isDestructive(sortedList) ? "yes" : "no"}
O(): ${ops[0]} (expected ${this.expectedOps} ops)
`
        )
        console.log(result);

        return { time, ops: ops[0], isSorted: this.isSorted(sortedList), isDestructive: this.isDestructive(sortedList) }
    }
}