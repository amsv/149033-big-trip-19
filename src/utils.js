import dayjs from 'dayjs';

const DATE_FORMAT = 'МММ DD';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}


export {getRandomArrayElement, humanizeDate};
