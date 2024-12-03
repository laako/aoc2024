const R = require('ramda');
const { readRows, readCalibration, convertToNumber, abs } = require('../utils');

const rows = readRows(__dirname);

// Util
const convertToNumberArrays = R.pipe(
    R.map(R.pipe(
        R.split(" "),
        R.reject(R.isEmpty),
        R.map(convertToNumber),
    )),
    R.transpose
)

// Part 1
const answer1 = R.pipe(
    convertToNumberArrays,
    R.map(R.sort(R.ascend(R.dec))),
    R.apply(R.zipWith(abs)),
    R.sum
)(rows)

console.log(answer1);

// Part 2

const reducer = R.curry((x, prev, current) => R.ifElse(R.equals(x), R.add(prev), R.always(prev))(current))
const findEquals = (list1, list2) => R.map(x => R.reduce(reducer(x), 0)(list2))(list1)

const answer2 = R.pipe(
    convertToNumberArrays,
    R.apply(findEquals),
    R.sum
)(rows)

console.log(answer2)
