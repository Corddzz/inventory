import {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from '../models/inventoryModel.js'

export const fetchAll = async (req, res) => {
  try {
    const data = await getAllItems()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const fetchById = async (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  try {
    const data = await getItemById(Number(id))

    if (!data[0]) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.status(200).json(data[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const insertInventory = async (req, res) => {
  const { ITEM_NAME, CATEGORY, BRAND, QUANTITY } = req.body

  try {
    if (!ITEM_NAME || !CATEGORY || !BRAND || !QUANTITY) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const insertId = await addItem(ITEM_NAME, CATEGORY, BRAND, QUANTITY)

    res.status(201).json({
      message: 'Item created successfully!',
      id: insertId,
      ITEM_NAME,
      CATEGORY,
      BRAND,
      QUANTITY,
    })
  } catch (error) {
    console.error('Error adding data', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const updatedInventory = async (req, res) => {
  const { id } = req.params
  const data = req.body

  if (!data.ITEM_NAME || !data.CATEGORY || !data.BRAND || !data.QUANTITY) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const updatedFields = {
    ITEM_NAME: data.ITEM_NAME,
    CATEGORY: data.CATEGORY,
    BRAND: data.BRAND,
    QUANTITY: data.QUANTITY,
  }

  try {
    const result = await updateItem(id, updatedFields)

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Item updated successfully' })
    } else {
      return res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    console.error('Error while updating item', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const removeInventory = async (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  try {
    await deleteItem({ id: Number(id) })

    // console.log(data)
    res.status(200).json({ message: 'Item deleted successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// export const updatedInventory = async (req, res) => {
//   const { id } = req.params
//   const { ITEM_NAME, CATEGORY, BRAND, QUANTITY } = req.body

//   if (!ITEM_NAME || !CATEGORY || !BRAND || !QUANTITY) {
//     return res.status(400).json({ message: 'All fields are required.' })
//   }

//   try {
//     const getId = await fetchById(id)
//   } catch (error) {
//     console.error('Error while updating item', error)
//     res.status(500).json({ message: 'Server error', error: error.message })
//   }
// }

// try {
//   const { ITEM_ID, ITEM_NAME, CATEGORY, BRAND, QUANTITY } = req.body

//   if (ITEM_ID === null) {
//     return res.status(400).json({ message: 'ID is required' })
//   }

//   if (!ITEM_NAME || !CATEGORY || !BRAND || !QUANTITY) {
//     return res.status(400).json({ message: 'All fields are required.' })
//   }

//   await update(ITEM_ID, ITEM_NAME, CATEGORY, BRAND, QUANTITY)

//   res.status(200).json({ message: 'Item updated successfully!' })
// } catch (error) {
//   console.error('Error updating data', error)
//   res.status(500).json({ message: 'Server error', error: error.message })
// }

// export const removeInventory = async (req, res) => {
//   try {
//     const { id } = req.params.id
//     const data = await removeData(id)

//     if (data === 0) {
//       return res.status(404).json({ message: 'Item not found' })
//     }

//     return res.status(200).json({ message: 'Item deleted successfully!', id })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error', error: error.message })
//   }
// }
