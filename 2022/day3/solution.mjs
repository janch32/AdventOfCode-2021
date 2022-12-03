import {readFileSync} from "fs";

const priority = char => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) + 1;

const input = readFileSync("input", "utf8")
    .trim()
    .split("\n");

// Part 1
console.log(input
    .map(sack => [sack.slice(0, sack.length / 2).split(""), sack.slice(sack.length / 2, sack.length).split("")])
    .map(sack => sack.map(items => items.map(item => priority(item))))
    .map(sack => sack[0].filter(item => sack[1].indexOf(item) >= 0))
    .map(sack => sack.filter((item, i) => sack.indexOf(item) === i))
    .flatMap(sack => sack)
    .reduce((sum, curr) => sum + curr, 0)
);

// Part 2
console.log(input
    .map(sack => sack.split("").map(item => priority(item)))
    .reduce((res, line, i) => [
            ...res.slice(0, Math.floor(i / 3)),
            [
                ...(res[Math.floor(i / 3)] ?? []),
                line
            ]
        ], [])
    .map(group => group[0].filter(item => group[1].indexOf(item) >= 0 && group[2].indexOf(item) >= 0))
    .map(sack => sack.filter((item, i) => sack.indexOf(item) === i))
    .flatMap(sack => sack)
    .reduce((sum, curr) => sum + curr, 0)
);
