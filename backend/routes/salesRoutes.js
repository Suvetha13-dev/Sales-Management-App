const express = require('express');
const router = express.Router();
const Sale = require('../models/Sales.js');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     description: Add a new sale record to the database
 *     security:
 *       - BearerAuth: []  # ✅ Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Sale added successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - JWT Token required
 */
router.post('/', async (req, res) => {
    const { productName, quantity, price } = req.body;

    if (!productName || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const sale = await Sale.create({ productName, quantity, price });
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add sale. Please try again.' });
    }
});

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Retrieve all sales
 *     description: Retrieve a list of all sales records
 *     security:
 *       - BearerAuth: []  # ✅ Requires JWT Token
 *     responses:
 *       200:
 *         description: Successfully retrieved sales
 *       401:
 *         description: Unauthorized - JWT Token required
 */
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sales' });
    }
});

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get a specific sale by ID
 *     description: Retrieve a single sale record by its ID
 *     security:
 *       - BearerAuth: []  # ✅ Requires JWT Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sale to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved sale
 *       401:
 *         description: Unauthorized - JWT Token required
 */
router.get('/:id', async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sale' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { productName, quantity, price } = req.body;
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, {
            productName,
            quantity,
            price
        }, { new: true });

        if (!updatedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update sale' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete sale' });
    }
});

module.exports = router;