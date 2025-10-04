import { Router } from 'express';
import {
  fetchAll,
  fetchById,
  insert,
  update,
  remove,
} from '../controllers/inventoryController.js';

const router = Router();

router.get('/inventory', fetchAll);
router.get('/inventory/:id', fetchById);
router.post('/inventory/', insert);
router.put('/inventory/:id', update);
router.delete('/inventory/:id', remove);
// router.get('/inventory/:id', fetchById)
// router.post('/inventory/', insertInventory)
// router.patch('/inventory/:id', updatedInventory)
// router.delete('/inventory/:id', removeInventory)

export default router;
