import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../models/inventoryModel.js';

export const fetchAll = async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    console.error('Fetch all error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);

    if (!item || item.length === 0) {
      return res.status(404).json({ message: 'Item not found!' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Fetch by ID error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const insert = async (req, res) => {
  try {
    const { item_name, category, brand, quantity } = req.body;

    if (!item_name || !category || !brand || !quantity == null) {
      return res.status(400).json({ message: 'All fields are required ⚠️' });
    }

    const newItem = await createItem(item_name, category, brand, quantity);

    res.status(201).json({
      message: 'Item inserted successfully ✅',
      item: newItem,
    });
  } catch (error) {
    console.error('Insert error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { item_name, category, brand, quantity } = req.body;

  try {
    if (!item_name || !category || !brand || !quantity == null) {
      return res.status(400).json({ message: 'All fields are required ⚠️' });
    }

    const result = await updateItem(id, {
      item_name,
      category,
      brand,
      quantity,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Item with ID ${id} not found` });
    }

    res.status(200).json({
      message: 'Item updated successfully ✅',
      updatedItem: { id, item_name, category, brand, quantity },
    });
  } catch (error) {
    console.error('Update error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRow = await deleteItem(id);

    if (deletedRow === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully ✅' });
  } catch (error) {
    console.error('Error deleting inventory item:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
