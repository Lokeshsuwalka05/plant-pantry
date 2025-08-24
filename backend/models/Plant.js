import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true,
    maxlength: [100, 'Plant name cannot exceed 100 characters']
  },
  price: {
    type: String,
    required: [true, 'Plant price is required'],
    trim: true
  },
  categories: [{
    type: String,
    required: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for better search performance
plantSchema.index({ name: 'text', description: 'text' });
plantSchema.index({ categories: 1 }); // Index for categories

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;
