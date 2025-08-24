import express from 'express';
import { body, validationResult } from 'express-validator';
import Plant from '../models/Plant.js';

const router = express.Router();

// Validation middleware
const validatePlant = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('price').trim().isLength({ min: 1 }).withMessage('Price is required'),
  body('categories').isArray({ min: 1 }).withMessage('At least one category is required'),
  body('categories.*').isString().withMessage('Each category must be a string'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
];

// GET all plants with optional filtering
router.get('/', async (req, res) => {
  try {
    const { search, category, inStock, sort = 'name', order = 'asc' } = req.query;

    let query = {};

    // Search by name, description, or categories
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category && category !== 'all') {
      query.categories = { $in: [category] };
    }

    // Filter by stock status
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    const plants = await Plant.find(query).sort(sortOptions);

    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET single plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    res.json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// POST create new plant
router.post('/', validatePlant, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const plant = new Plant(req.body);
    const savedPlant = await plant.save();

    res.status(201).json({
      success: true,
      data: savedPlant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT update plant
router.put('/:id', validatePlant, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    res.json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// DELETE plant
router.delete('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    res.json({
      success: true,
      message: 'Plant deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET categories with counts
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Plant.distinct('categories');

    // Get count for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await Plant.countDocuments({ categories: { $in: [category] } });
        return {
          name: category,
          count: count
        };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;
