import {readFileSync} from "fs";

// Part 1
console.log(readFileSync("input", "utf8").split("").findIndex((_, i, arr) => new Set(arr.slice(i - 4, i)).size === 4));

// Part 2
console.log(readFileSync("input", "utf8").split("").findIndex((_, i, arr) => new Set(arr.slice(i - 14, i)).size === 14));
