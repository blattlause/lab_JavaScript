const fs = require('fs');
const path = require('path');

// Пути к исходной папке lab2 и папкам src и dist
const lab2Dir = './';
const srcDir = './src';
const distDir = './dist';

// Создаем папки src и dist, если они не существуют
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
  console.log('Папка src была успешно создана.');
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
  console.log('Папка dist была успешно создана.');
}

// Читаем содержимое папки lab2
fs.readdir(lab2Dir, (err, files) => {
  if (err) {
    console.error('Ошибка чтения директории lab2:', err);
    return;
  }

  // Перебираем файлы в папке lab2
  files.forEach(file => {
    const srcFilePath = path.join(lab2Dir, file);

    // Определяем расширение файла
    const ext = path.extname(file);

    // Копируем файлы с расширением .js в папку src
    if (ext === '.js') {
      const distFilePath = path.join(srcDir, file);
      fs.copyFile(srcFilePath, distFilePath, (err) => {
        if (err) {
          console.error(`Ошибка копирования файла ${srcFilePath} в ${distFilePath}:`, err);
          return;
        }
        console.log(`Файл ${srcFilePath} успешно скопирован в ${distFilePath}`);
      });
    }
    // Копируем файлы с расширениями .json и .log в папку dist
    else if (ext === '.json' || ext === '.log') {
      const distFilePath = path.join(distDir, file);
      fs.copyFile(srcFilePath, distFilePath, (err) => {
        if (err) {
          console.error(`Ошибка копирования файла ${srcFilePath} в ${distFilePath}:`, err);
          return;
        }
        console.log(`Файл ${srcFilePath} успешно скопирован в ${distFilePath}`);
      });
    }
  });
});
