import {readFileSync} from "fs";

const input = readFileSync("input", "utf8")
    .trimEnd()
    .split("\n\n")
    .map((part, i) => i == 0
        ? ((matrix) => matrix[0].map((_, i) => matrix.map(row => row[i])))(
            part.split("\n")
                .map(val => val.match(/.{1,4}/g).map(val => val[1]))
                .map((val, _, arr) => [...val, ...(new Array(arr.reduce((max, curr) => curr.length > max ? curr.length : max, 0) - val.length).fill(" "))])
                .slice(0, -1)
            )
            .map(val => val.reverse().join("").trimEnd().split(""))
        : part.split("\n")
            .map(val => val.split(" ").map(val => parseInt(val, 10)))
            .map(val => ({amount: val[1], from: val[3]-1, to: val[5]-1}))
    )
    .reduce((res, val, i) => i == 0 ? {stack: val, stack2: JSON.parse(JSON.stringify(val)), ...res} : {moves: val, ...res}, {})
;

// Part 1
input.moves.forEach(move => input.stack[move.to].push(...input.stack[move.from].splice(-move.amount).reverse()))
console.log(input.stack.map(stack => stack[stack.length-1]).join(""));

// Part 2
input.moves.forEach(move => input.stack2[move.to].push(...input.stack2[move.from].splice(-move.amount)))
console.log(input.stack2.map(stack => stack[stack.length-1]).join(""));
