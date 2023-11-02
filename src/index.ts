
import * as tf from "@tensorflow/tfjs"
import fs from "fs"

const list: tf.Tensor = tf.randomNormal([1000])

console.log(tf.argMax(list).dataSync()[0]);