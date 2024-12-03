const R = require('ramda');
const { readRows, readCalibration, convertToNumber, abs } = require('../utils');

const rows = readRows(__dirname);

// Part 1
const answer1 = R.pipe(
    R.map(
        R.pipe(
            R.split(" "),
            R.map(convertToNumber)
        )
    ),
    R.map(
        R.allPass([
            R.pipe(
                R.aperture(2),
                R.map(
                    R.pipe(
                        R.apply(abs),
                        R.both(R.gt(R.__, 0), R.lte(R.__, 3)),
                    )
                ),
                R.all(R.identity)
            ),
            R.either(
                R.pipe(
                    R.aperture(2),
                    R.all(R.apply(R.gt))
                ),
                R.pipe(
                    R.aperture(2),
                    R.all(R.apply(R.lt))
                )
            )
        ])
    ),
    R.reject(R.equals(false)),
    R.length
)(rows)

console.log(answer1)