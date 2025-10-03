import db from '../config/db.js';

export const getAllItems = async () => {
  const sql = `SELECT * FROM inventory;`;
  const [result] = await db.query(sql);
  return result;
};

export const getItemById = async (id) => {
  const sql = `SELECT id ,item_name, category, brand, quantity FROM inventory WHERE id = ? LIMIT 1;`;
  const [rows] = await db.query(sql, [id]);
  return rows;
};

export const createItem = async (item_name, category, brand, quantity) => {
  const sql = `INSERT INTO  inventory ( item_name ,  category ,  brand ,  quantity ) VALUES (?, ?, ?, ?);`;
  const [result] = await db.query(sql, [item_name, category, brand, quantity]);

  return getItemById(result.insertId);
};

export const updateItem = async (id, updateFields) => {
  try {
    const sql = `UPDATE inventory SET item_name = ?, category = ?, brand = ?, quantity = ? WHERE id = ? LIMIT 1;`;
    const [result] = await db.query(sql, [
      updateFields.item_name,
      updateFields.category,
      updateFields.brand,
      updateFields.quantity,
      id,
    ]);

    return result;
  } catch (error) {
    console.error('Error updating inventory item:', error.message);
    throw error;
  }
};

export const deleteItem = async ({ id }) => {
  try {
    const sql = `DELETE FROM inventory WHERE id = ?`;
    const [item] = await db.query(sql, id);

    console.log(item[0]);
    return item[0];
  } catch (error) {
    console.error(error);
  }
};
