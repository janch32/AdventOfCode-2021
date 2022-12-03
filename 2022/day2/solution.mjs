import {readFileSync} from "fs";

/**
 * rock = 0
 * paper = 1
 * scissors = 2
 *
 * move | win | lost
 * -----+-----+-----
 *   0  |  2  |  1
 *   1  |  0  |  2
 *   2  |  1  |  0
 *
 * win = (move + 2) % 3
 * lose = (move + 1) % 3
 */

const games = readFileSync("input", "utf8")
    .trim()
    .split("\n")
    .map(round => round
        .split(" ")
        .map(move => ["A", "B", "C", "X", "Y", "Z"].indexOf(move) % 3)
    )
;

// Part 1
const countMoves = games.reduce((prev, curr) => prev + curr[1] + 1, 0);
const countWin = games
    .map(move => move[1] === move[0] ? 1 : ((move[1] + 2) % 3 === move[0] ? 2 : 0))
    .reduce((prev, curr) => prev + curr * 3, 0);
;
console.log(countMoves + countWin);

// Part 2
const countWin2 = games.reduce((prev, curr) => prev + curr[1] * 3, 0);
const countMoves2 = games
    .map(move => move[1] === 1 ? move[0] : (move[1] === 0 ? (move[0] + 2) % 3 : (move[0] + 1) % 3))
    .reduce((prev, curr) => prev + curr + 1, 0)
;
console.log(countMoves2 + countWin2);
