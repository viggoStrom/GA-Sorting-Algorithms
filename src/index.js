"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var list = tf.randomNormal([1000]);
console.log(tf.argMax(list).dataSync()[0]);
