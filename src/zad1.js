const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для логирования ошибок в файл
function logError(error, callback) {
  const date = new Date().toISOString();
  const logEntry = `[${date}] ${error}\n`;

  fs.appendFile('error.log', logEntry, (err) => {
    if (err) throw err;
    callback(); // Вызываем колбэк после успешной записи в файл
  });
}

// Функция для запроса описания ошибки
function promptForError() {
  rl.question('Введите описание ошибки (или "exit" для завершения): ', (errorDescription) => {
    if (errorDescription.toLowerCase() === 'exit') {
      rl.close(); // Завершаем работу приложения если пользователь ввел "exit"
    } else {
      logError(errorDescription, () => {
        console.log('Ошибка зарегистрирована в файле error.log');
        promptForError(); // Запрашиваем следующую ошибку
      });
    }
  });
}

// Начинаем запрос ошибок
promptForError();
