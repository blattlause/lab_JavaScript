const { EventEmitter } = require('events');
const myEventEmitter = new EventEmitter();

myEventEmitter.on('myEvent', eventData => {
  console.log('Получено событие:');
  console.log(`Сообщение: ${eventData.message}`);
  console.log(`Дата: ${eventData.date}`);
});

const eventData = {
  message: 'Cобытие сгенерировано',
  date: new Date()
};

myEventEmitter.emit('myEvent', eventData);
