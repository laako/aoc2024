const R = require('ramda');
const { readRows, readCalibration, convertToNumber, abs } = require('../utils');

const rows = readCalibration(__dirname);

// Part 1
const answer1 = R.pipe(
    R.map(R.pipe(
        R.split(" "),
        R.filter(R.complement(R.isEmpty)),
        R.map(convertToNumber),
    )),
    R.transpose,
    R.map(R.sort(R.ascend(R.dec))),
    R.apply(R.zipWith(abs)),
    R.sum
)(rows)

console.log(answer1);
