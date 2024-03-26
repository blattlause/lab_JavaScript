const fs = require('fs');

// Создаем example.txt, если его нет
if (!fs.existsSync('example.txt')) {
  fs.writeFileSync('example.txt', 'Пример данных для записи');
  console.log("Файл example.txt создан");
} else {
  console.log("Файл example.txt уже существует");
}

console.log("Начало выполнения скрипта");

// Таймер 1
const startTime1 = Date.now();
setTimeout(() => {
  const timeElapsed = Date.now() - startTime1;
  console.log(`Таймер 1: Прошло ${timeElapsed} мс`);
}, 2000);

// Таймер 2
const startTime2 = Date.now();
setTimeout(() => {
  const timeElapsed = Date.now() - startTime2;
  console.log(`Таймер 2: Прошло ${timeElapsed} мс`);
}, 3000);

// Таймер 3
const startTime3 = Date.now();
setTimeout(() => {
  const timeElapsed = Date.now() - startTime3;
  console.log(`Таймер 3: Прошло ${timeElapsed} мс`);
}, 4000);


console.log("Начало операции записи файла");
const fileWriteStartTime = Date.now();
fs.writeFile('example.txt', 'Привет, я коза', (err) => {
  if (err) throw err;
  const timeElapsed = Date.now() - fileWriteStartTime;
  console.log(`Операция записи файла: Прошло ${timeElapsed} мс`);
});

console.log("Начало операции чтения файла");
const fileReadStartTime = Date.now();
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const timeElapsed = Date.now() - fileReadStartTime;
  console.log(`Операция чтения файла: Прошло ${timeElapsed} мс`);
});


console.log("Вызов SetImmediate");
const immediateStartTime = Date.now();
setImmediate(() => {
  const timeElapsed = Date.now() - immediateStartTime;
  console.log(`SetImmediate: Прошло ${timeElapsed} мс`);
});
