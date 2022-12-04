import {readFileSync} from "fs";

const input = readFileSync("input", "utf8")
    .trim()
    .split("\n")
    .map(line => line
        .split(",")
        .map(ass => ass.split("-"))
        .map(ass => ({from: parseInt(ass[0], 10), to: parseInt(ass[1], 10)})))
;

// Part 1
console.log(input
    .filter(line =>
        (line[0].from <= line[1].from && line[0].to >= line[1].to) ||
        (line[1].from <= line[0].from && line[1].to >= line[0].to))
    .length
);

// Part 2
console.log(input.filter(line => (line[0].to >= line[1].from) && (line[1].to >= line[0].from)).length);
