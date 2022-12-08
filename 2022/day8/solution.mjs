import {readFileSync} from "fs";

// Part 1
console.log(readFileSync("input", "utf8")
    .trim()
    .split("\n")
    .map(row => row.split(""))
    .reduce((sum, row, y, rows) =>
        sum + row.reduce((rowSum, col, x) =>
            rowSum + (
                rows[y].slice(0, x).reduce((visible, tree) => visible && tree < col, true) ||  // Zleva
                rows[y].slice(x + 1).reduce((visible, tree) => visible && tree < col, true) || // Zprava
                rows.slice(0, y).reduce((visible, vrow) => visible && vrow[x] < col, true) ||  // Z vrchu
                rows.slice(y + 1).reduce((visible, vrow) => visible && vrow[x] < col, true)    // Ze spodu
            ),
            0
        ),
        0
    )
);

// Part 2
console.log(readFileSync("input", "utf8")
    .trim()
    .split("\n")
    .map(row => row.split(""))
    .map((row, y, rows) =>
        row.map((col, x) =>
            rows[y].slice(0, x).reduceRight((state, tree) => [state[0] + state[1], state[1] && tree < col], [0, true])[0] *  // Zleva
            rows[y].slice(x + 1).reduce((state, tree) => [state[0] + state[1], state[1] && tree < col], [0, true])[0] * // Zprava
            rows.slice(0, y).reduceRight((state, vrow) => [state[0] + state[1], state[1] && vrow[x] < col], [0, true])[0] *  // Z vrchu
            rows.slice(y + 1).reduce((state, vrow) => [state[0] + state[1], state[1] && vrow[x] < col], [0, true])[0]    // Ze spodu
        )
    )
    .flat()
    .reduce((max, val) => val > max ? val : max, 0)
);
