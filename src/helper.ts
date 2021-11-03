import { bus } from './socket';

function getStringfiedBus() {
  let returnString = '';
  
  bus.boolean.forEach(value => {
    returnString += (value ? 1 : 0) + ' ';
  });

  bus.number.forEach(value => {
    returnString += value + ' ';
  });

  return returnString.slice(0, -1);
}

export {
  getStringfiedBus
}