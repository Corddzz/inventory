import db from '../config/db.js'

export const getAllItems = async () => {
  try {
    const sql =
      'SELECT ITEM_ID ,ITEM_NAME, CATEGORY, BRAND, QUANTITY FROM inventory;'
    const [result] = await db.query(sql)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const getItemById = async (id) => {
  try {
    const sql =
      'SELECT ITEM_ID ,ITEM_NAME, CATEGORY, BRAND, QUANTITY FROM inventory WHERE ITEM_ID = ? LIMIT 1;'
    const result = await db.query(sql, [id])

    return result[0]
  } catch (error) {
    console.error(error)
  }
}

export const addItem = async (ITEM_NAME, CATEGORY, BRAND, QUANTITY) => {
  try {
    const sql =
      'INSERT INTO `inventory`(`ITEM_NAME`, `CATEGORY`, `BRAND`, `QUANTITY`) VALUES (?, ?, ?, ?);'
    const [result] = await db.query(sql, [ITEM_NAME, CATEGORY, BRAND, QUANTITY])

    return result.insertId
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateItem = async (
  ITEM_ID,
  ITEM_NAME,
  CATEGORY,
  BRAND,
  QUANTITY
) => {
  try {
    const sql =
      'UPDATE `inventory` SET `ITEM_NAME` = ?, `CATEGORY` = ?, `BRAND` = ?, `QUANTITY` = ? WHERE `ITEM_ID` = ? LIMIT 1;'
    const [result] = await db.query(sql, [
      ITEM_NAME,
      CATEGORY,
      BRAND,
      QUANTITY,
      ITEM_ID,
    ])

    console.log(result)
    return result
  } catch (error) {
    console.error('Error updating item', error)
    throw error
  }
}

export const deleteItem = async ({ id }) => {
  try {
    const sql = 'DELETE FROM inventory WHERE ITEM_ID = ?'
    const [item] = await db.query(sql, id)

    console.log(item[0])
    return item[0]
  } catch (error) {
    console.error(error)
  }
}
