const fs = require('fs');

// Считываем данные из файла
fs.readFile('graphics_cards.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }

  // Преобразуем данные из JSON в объекты JavaScript
  const graphicsCards = JSON.parse(data);

  // Выводим массив в консоль
  console.log(graphicsCards);
});
