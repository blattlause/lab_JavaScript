const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');

// Создаем класс для товара
class GraphicsCard {
  constructor(producer, name, frequency, memory) {
    this.producer = producer;
    this.name = name;
    this.frequency = frequency;
    this.memory = memory;
  }
}

// Создаем класс для продавца
class Seller extends EventEmitter {
  constructor() {
    super();
    this.products = [];
    this.clientsSubscribed = false; // Флаг для отслеживания подписки клиентов
    this.logFilePath = path.join(__dirname, 'client_logs.txt');
    this.init();
  }

  // Инициализация: подписываем клиентов на обновления списка товаров
  init() {
    if (!this.clientsSubscribed) {
      this.on('productAdded', (product) => {
        const message = `Добавлен новый товар: ${product.name}`;
        this.logEvent(message);
      });

      this.on('productModified', ({ index, modifiedProduct }) => {
        const message = `Товар с индексом ${index} был изменен на: ${modifiedProduct.name}`;
        this.logEvent(message);
      });

      this.clientsSubscribed = true;
    }
  }

  // Метод для добавления нового товара
  addProduct(product) {
    this.products.push(product);
    this.emit('productAdded', product);
  }

  // Метод для модификации существующего товара
  modifyProduct(index, modifiedProduct) {
    if (index >= 0 && index < this.products.length) {
      this.products[index] = modifiedProduct;
      this.emit('productModified', { index, modifiedProduct });
    }
  }

  // Логгирование событий в файл и вывод в консоль
  logEvent(event) {
    // Проверяем существование файла
    if (!fs.existsSync(this.logFilePath)) {
      // Если файл не существует, создаем его
      fs.writeFileSync(this.logFilePath, '');
    }
  
    const currentTime = new Date().toISOString();
    const logMessage = `${currentTime}: ${event}\n`;
  
    // Вывод в консоль
    console.log(logMessage);
  
    // Запись в файл
    fs.appendFileSync(this.logFilePath, logMessage);
  }
}

// Создаем экземпляр продавца
const seller = new Seller();

// Добавляем новые товары
seller.addProduct(new GraphicsCard('NVIDIA', 'GeForce RTX 3080', '1.44 GHz', '10 GB'));
seller.addProduct(new GraphicsCard('AMD', 'Radeon RX 6800 XT', '2.25 GHz', '16 GB'));

// Модифицируем существующий товар
seller.modifyProduct(0, new GraphicsCard('NVIDIA', 'GeForce RTX 3090', '1.70 GHz', '24 GB'));
