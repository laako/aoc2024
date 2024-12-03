const fs = require("fs");
const R = require("ramda");

const readRows = (dir) =>
    R.compose(
        R.filter(R.complement(R.isEmpty)),
        R.split(/\r?\n/)
    )(fs.readFileSync(dir + "/input.txt", "utf-8"));

const readCalibration = (dir, n = "") =>
    R.compose(
        R.filter(R.complement(R.isEmpty)),
        R.split(/\r?\n/)
    )(fs.readFileSync(dir + `/calibration${n}.txt`, "utf-8"));

const convertToNumber = R.partialRight(parseInt, [10]);
const abs = R.curry((a, b) => Math.abs(a - b));

module.exports = { readRows, readCalibration, convertToNumber, abs };