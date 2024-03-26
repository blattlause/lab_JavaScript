const fs = require('fs');

class GraphicsCard {
  constructor(interfaceType, manufacturer, gpu, gpuFrequency, vram) {
    this.interfaceType = interfaceType;
    this.manufacturer = manufacturer;
    this.gpu = gpu;
    this.gpuFrequency = gpuFrequency;
    this.vram = vram;
  }
}

// Создаем несколько объектов графических карт
const graphicsCards = [
  new GraphicsCard("PCIe 4.0", "NVIDIA", "RTX 3080", "1.71 GHz", "10 GB"),
  new GraphicsCard("PCIe 4.0", "AMD", "Radeon RX 6900 XT", "2.25 GHz", "16 GB"),
  new GraphicsCard("PCIe 4.0", "NVIDIA", "RTX 3070", "1.73 GHz", "8 GB")
];

// Преобразуем массив объектов в формат JSON
const jsonData = JSON.stringify(graphicsCards, null, 2);

// Записываем JSON данные в файл
fs.writeFile('graphics_cards.json', jsonData, { flag: 'wx' }, (err) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('Файл уже существует, данные не были записаны.');
      return;
    }
    throw err;
  }
  console.log('Массив объектов был успешно записан в файл graphics_cards.json');
});
