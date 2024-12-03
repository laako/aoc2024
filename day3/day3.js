const R = require('ramda');
const { readRows, readCalibration, convertToNumber } = require('../utils');

// Util
const mulRegex = /mul\((\d+),(\d+)\)/g;
const letterRegex = /[a-zA-Z()]/g;
const mulDoDontRegex = /(mul\((\d+),(\d+)\))|do\(\)|don't\(\)/g;
const processMul = R.pipe(
    R.match(mulRegex),
    R.map(R.replace(letterRegex, "")),
    R.map(R.pipe(
        R.split(","),
        R.map(convertToNumber),
        R.apply(R.multiply)
    )))

// Part 1
const input = readRows(__dirname);
const answer1 = R.pipe(
    R.join(""),
    processMul,
    R.sum
)(input)

console.log(answer1);

// Part 2
const reducer = (acc, val) => {
    if (val === "don't()") {
        return {
            ...acc,
            calc: false
        }
    }

    if (val === "do()") {
        return {
            ...acc,
            calc: true
        }
    }

    if (val !== "do()" && val !== "don't()" && acc.calc) {
        return {
            val: acc.val + R.pipe(
                processMul,
                R.sum
            )(val),
            calc: true
        }
    }
    return acc
}
const answer2 = R.pipe(
    R.join(""),
    R.match(mulDoDontRegex),
    R.reduce(reducer, { val: 0, calc: true }),
    R.prop('val')
)(input)

console.log(answer2)