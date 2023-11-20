"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
class Tester {
    constructor(algorithm, list, expectedOps, humanReadable = false) {
        this.startTime = 0;
        this.stopTime = 0;
        this.time = 0;
        this.list = list;
        this.initialLength = list.length;
        this.inventory = this.takeInventory(this.list);
        this.algorithm = algorithm;
        this.expectedOps = expectedOps;
        this.humanReadable = humanReadable;
    }
    takeInventory(list) {
        const inventory = {};
        for (let index = 0; index < this.initialLength; index++) {
            const selector = list[index].toString();
            if (inventory[selector] === undefined) {
                inventory[selector] = 1;
            }
            else {
                inventory[selector]++;
            }
        }
        return inventory;
    }
    startTimer() {
        this.startTime = parseInt(process.hrtime.bigint().toString().replace("n", ""));
    }
    stopTimer() {
        this.stopTime = parseInt(process.hrtime.bigint().toString().replace("n", ""));
    }
    getMS() {
        return Math.floor((this.stopTime - this.startTime) * 10 ** -6);
    }
    getNS() {
        return this.stopTime - this.startTime;
    }
    isSorted(sortedList) {
        const length = sortedList.length;
        for (let index = 0; index < length; index++) {
            if (sortedList[index] > sortedList[index + 1]) {
                return false;
            }
        }
        return true;
    }
    isDestructive(sortedList) {
        if (this.initialLength !== sortedList.length) {
            return true;
        }
        let isDestructive = false;
        const sortedInventory = this.takeInventory(sortedList);
        Object.keys(sortedInventory).forEach(element => {
            isDestructive = !(!isDestructive && sortedInventory[element] === this.inventory[element]);
        });
        return isDestructive;
    }
    start() {
        const mem = [];
        const ops = [0];
        this.startTimer();
        const sortedList = this.algorithm.call(undefined, this.list, mem, ops);
        this.stopTimer();
        const time = this.getNS();
        if (!this.humanReadable) {
            return { time, ops: ops[0] };
        }
        const result = (`
Time: ${this.getNS()} ns (${this.getMS()} ms)
Is sorted: ${this.isSorted(sortedList) ? "yes" : "no"}
Is destructive: ${this.isDestructive(sortedList) ? "yes" : "no"}
O(): ${ops[0]} (expected ${this.expectedOps} ops)
`);
        console.log(result);
        return { time, ops: ops[0] };
    }
}
exports.Tester = Tester;
