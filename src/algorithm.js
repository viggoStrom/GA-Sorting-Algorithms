"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quicksort = void 0;
// Stolen from https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/ 
// With heavy modification and help from Axel Thornberg
var quicksort = function (list, mem, ops) {
    mem.push(process.memoryUsage.rss());
    ops[0]++;
    if (list.length <= 1) {
        return list;
    }
    var pivot = list[Math.floor(Math.random() * list.length)];
    var leftArray = [];
    var rightArray = [];
    var equalities = [];
    for (var i = 0; i < list.length; i++) {
        ops[0]++;
        var element = list[i];
        if (element < pivot) {
            ops[0]++;
            leftArray.push(element);
        }
        else if (element === pivot) {
            ops[0] += 2;
            equalities.push(element);
        }
        else {
            ops[0] += 2;
            rightArray.push(element);
        }
    }
    return __spreadArray(__spreadArray(__spreadArray([], (0, exports.quicksort)(leftArray, mem, ops), true), equalities, true), (0, exports.quicksort)(rightArray, mem, ops), true);
};
exports.quicksort = quicksort;
