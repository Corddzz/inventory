import { Router } from 'express'
import {
  fetchAll,
  fetchById,
  insertInventory,
  removeInventory,
} from '../controllers/inventoryController.js'

const router = Router()

router.get('/inventory', fetchAll)
router.get('/inventory/:id', fetchById)
router.post('/inventory/', insertInventory)
router.delete('/inventory/:id', removeInventory)
// router.get('/inventory/:id', fetchById)
// router.post('/inventory/', insertInventory)
// router.patch('/inventory/:id', updatedInventory)
// router.delete('/inventory/:id', removeInventory)

export default router
