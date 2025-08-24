import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plant from '../models/Plant.js';

// Load environment variables
dotenv.config({ path: '../config.env' });

const seedPlants = [
  {
    name: 'Monstera Deliciosa',
    price: '₹2499.99',
    categories: ['Indoor,Large,Air Purifying'],
    inStock: true,
    description: 'A stunning tropical plant with iconic split leaves that brings a jungle vibe to any space.'
  },
  {
    name: 'Jade Plant',
    price: '₹899.99',
    categories: ['Succulent,Indoor,Small,Low Light'],
    inStock: true,
    description: 'Lucky jade plant with thick, glossy leaves. Perfect for beginners and brings good fortune.'
  },
  {
    name: 'Snake Plant',
    price: '₹1499.50',
    categories: ['Indoor,Low Light,Air Purifying,Pet Safe'],
    inStock: false,
    description: 'Virtually indestructible plant with striking upright leaves. Perfect for low-light spaces.'
  },
  {
    name: 'Golden Pothos',
    price: '₹1199.99',
    categories: ['Indoor,Hanging,Low Light,Air Purifying'],
    inStock: true,
    description: 'Beautiful trailing plant with heart-shaped leaves. Great for hanging baskets or shelves.'
  },
  {
    name: 'Fiddle Leaf Fig',
    price: '₹3999.99',
    categories: ['Indoor,Large'],
    inStock: true,
    description: 'Statement plant with large, violin-shaped leaves. A stunning centerpiece for any room.'
  },
  {
    name: 'Peace Lily',
    price: '₹1299.99',
    categories: ['Indoor,Flowering,Air Purifying,Low Light'],
    inStock: true,
    description: 'Elegant plant with glossy leaves and beautiful white flowers. Excellent air purifier.'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Plant.deleteMany({});
    console.log('🗑️  Cleared existing plants');

    // Insert seed data
    const plants = await Plant.insertMany(seedPlants);
    console.log(`🌱 Seeded ${plants.length} plants successfully`);

    console.log('✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
