import { type Plant } from '../types/plant';
// import monsteraImg from '../assets/monstera.jpg';
// import jadePlantImg from '../assets/jade-plant.jpg';
// import snakePlantImg from '../assets/snake-plant.jpg';
// import pothosImg from '../assets/pothos.jpg';
// import fiddleLeafFigImg from '../assets/fiddle-leaf-fig.jpg';
// import peaceLilyImg from '../assets/peace-lily.jpg';

export const mockPlants: Plant[] = [
  {
    _id: '1',
    name: 'Monstera Deliciosa',
    price: '₹2499.99',
    categories: ['Indoor,Large,Air Purifying'],
    inStock: true,
    // image: monsteraImg,
    description: 'A stunning tropical plant with iconic split leaves that brings a jungle vibe to any space.'
  },
  {
    _id: '2',
    name: 'Jade Plant',
    price: '₹899.99',
    categories: ['Succulent,Indoor,Small,Low Light'],
    inStock: true,
    // image: jadePlantImg,
    description: 'Lucky jade plant with thick, glossy leaves. Perfect for beginners and brings good fortune.'
  },
  {
    _id: '3',
    name: 'Snake Plant',
    price: '₹1499.50',
    categories: ['Indoor,Low Light,Air Purifying,Pet Safe'],
    inStock: false,
    // image: snakePlantImg,
    description: 'Virtually indestructible plant with striking upright leaves. Perfect for low-light spaces.'
  },
  {
    _id: '4',
    name: 'Golden Pothos',
    price: '₹1199.99',
    categories: ['Indoor,Hanging,Low Light,Air Purifying'],
    inStock: true,
    // image: pothosImg,
    description: 'Beautiful trailing plant with heart-shaped leaves. Great for hanging baskets or shelves.'
  },
  {
    _id: '5',
    name: 'Fiddle Leaf Fig',
    price: '₹3999.99',
    categories: ['Indoor,Large'],
    inStock: true,
    // image: fiddleLeafFigImg,
    description: 'Statement plant with large, violin-shaped leaves. A stunning centerpiece for any room.'
  },
  {
    _id: '6',
    name: 'Peace Lily',
    price: '₹1299.99',
    categories: ['Indoor,Flowering,Air Purifying,Low Light'],
    inStock: true,
    // image: peaceLilyImg,
    description: 'Elegant plant with glossy leaves and beautiful white flowers. Excellent air purifier.'
  }
];