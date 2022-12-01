import {readFileSync} from "fs";

// Načíst vstup, elfové jsou odděleni prázdným řádkem a každý má na jednom řádku své spotřebované kalorie (číslo)
// Potom uděláme součet kalorii pro každého elfa (seřazeno od největšího počtu kalorií)
const elvesSum = readFileSync("input", "utf8")
    .split("\n\n")
    .map(group => group.split("\n").map(item => parseInt(item, 10)))
    .map(elf => elf.reduce((prev, curr) => prev + curr, 0))
    .sort((a, b) => b - a)
;

// Part 1 - nejvyšší počet kalorií
console.log(elvesSum[0]);

// Part 2 - součet tří nejvyšších počtů kalorií
console.log(elvesSum.slice(0, 3).reduce((prev, curr) => prev + curr, 0));
