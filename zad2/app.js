const calculateB = require('./bFunction');

const x = parseFloat(process.argv[2]);
const y = parseFloat(process.argv[3]);
const z = parseFloat(process.argv[4]);

if (isNaN(x) || isNaN(y) || isNaN(z)) {
    console.log("Пожалуйста, укажите значения x, y и z как аргументы командной строки.");
} else {
    const result = calculateB(x, y, z);
    console.log(`Значение функции b для x=${x}, y=${y}, z=${z}: ${result}`);
}