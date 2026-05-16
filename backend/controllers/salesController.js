const Sale = require('../models/Sales');

// Create a new sales record
exports.createSale = async (req, res) => {
    try {
        const newSale = new Sale(req.body);
        await newSale.save();
        res.status(201).json({ message: 'Sale created successfully', sale: newSale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all sales records
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a specific sales record by ID
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a sales record (full update)
exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json({ message: 'Sale updated successfully', sale: updatedSale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Partially update a sales record
exports.partialUpdateSale = async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json({ message: 'Sale partially updated', sale: updatedSale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a sales record
exports.deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        if (!deletedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};