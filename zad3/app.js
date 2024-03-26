const calculateB = require('./bFunction');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Введите значение x: ", function(xInput) {
    rl.question("Введите значение y: ", function(yInput) {
        rl.question("Введите значение z: ", function(zInput) {
            const x = parseFloat(xInput);
            const y = parseFloat(yInput);
            const z = parseFloat(zInput);

            if (isNaN(x) || isNaN(y) || isNaN(z)) {
                console.log("Пожалуйста, введите корректные числовые значения.");
            } else {
                const result = calculateB(x, y, z);
                console.log(`Исходные данные:\n x = ${x.toFixed(2)}, y = ${y.toFixed(2)}, z = ${z.toFixed(2)}`);
                console.log(`Значение функции b: ${result.toFixed(2)}`);
            }
            rl.close();
        });
    });
});
