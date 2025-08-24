import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plant from '../models/Plant.js';

// Load environment variables
dotenv.config({ path: './config.env' });

async function fixIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');

    // Drop existing indexes
    console.log('🗑️ Dropping existing indexes...');
    await Plant.collection.dropIndexes();
    console.log('✅ Existing indexes dropped');

    // Create new indexes
    console.log('🔧 Creating new indexes...');
    await Plant.collection.createIndex({ name: 'text', description: 'text' });
    await Plant.collection.createIndex({ categories: 1 });
    console.log('✅ New indexes created successfully');

    // List all indexes to verify
    const indexes = await Plant.collection.getIndexes();
    console.log('📋 Current indexes:');
    console.log(JSON.stringify(indexes, null, 2));

    console.log('🎉 Index fix completed successfully!');
  } catch (error) {
    console.error('❌ Error fixing indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

fixIndexes();
