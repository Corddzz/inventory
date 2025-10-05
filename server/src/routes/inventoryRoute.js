import { Router } from 'express';
import {
  fetchAll,
  fetchById,
  insert,
  update,
  remove,
} from '../controllers/inventoryController.js';

const router = Router();

router.get('/api/inventory', fetchAll);
router.get('/api/inventory/:id', fetchById);
router.post('/api/inventory/', insert);
router.put('/api/inventory/:id', update);
router.delete('/api/inventory/:id', remove);
// router.get('/inventory/:id', fetchById)
// router.post('/inventory/', insertInventory)
// router.patch('/inventory/:id', updatedInventory)
// router.delete('/inventory/:id', removeInventory)

export default router;
