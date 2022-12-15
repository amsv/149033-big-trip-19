import { getRandomArrayElement } from '../utils.js';
const type = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const mockDestination = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Lyon, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Lyon',
    pictures: [
      {
        src: 'https://picsum.photos/200/300?random=1',
        description: 'Lyon parliament building'
      }
    ]
  },
  {
    id: 3,
    description: 'Strasbourg, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Strasbourg',
    pictures: [
      {
        src: 'https://picsum.photos/200/300?random=2',
        description: 'Strasbourg parliament building'
      }
    ]
  }
];

const mockOffer = [
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 320
  },
  {
    id: 2,
    title: 'Do nulla fugiat proident ipsum.',
    price: 125
  },
  {
    id: 3,
    title: 'Enim id ipsum cupidatat non non reprehenderit.',
    price: 220
  },
];


const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomArrayElement(mockDestination).id,
    id: 0,
    isFavorite: false,
    offers: getRandomArrayElement(mockOffer).id,
    type: getRandomArrayElement(type),
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
