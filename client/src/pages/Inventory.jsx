import * as React from 'react';
import { createItem, fetchItems } from '../api/axios.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/material';
import InputComponent from '../components/InputComponent';
import SelectComponent from '../components/SelectComponent';
import ButtonComponent from '../components/ButtonComponent';
import { Check, Clear } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '4px',
  p: 4,
};

const Inventory = () => {
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [handleSnack, setHandleSnack] = React.useState(false);

  const handleSnackbar = () => {
    setHandleSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return;
    setHandleSnack(false);
  };

  const [input, setInput] = React.useState({
    item_name: '',
    category: '',
    brand: '',
    quantity: '',
  });

  const category = [
    { value: 'Consumables', label: 'Consumables' },
    { value: 'Equipment', label: 'Equipment' },
    { value: 'Tools', label: 'Tools' },
  ];

  const tableHeaders = [
    { label: 'Id', value: 'id', align: 'left' },
    { label: 'Item Name', value: 'item_name', align: 'right' },
    { label: 'Category', value: 'category', align: 'right' },
    { label: 'Brand', value: 'brand', align: 'right' },
    { label: 'Quantity', value: 'quantity', align: 'right' },
    { label: 'Date', value: 'formatted_date', align: 'center' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(input);
      const result = await fetchItems();
      setItems(result);
      handleClose();
      setHandleSnack(true);
      setInput({
        item_name: '',
        category: '',
        brand: '',
        quantity: '',
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  React.useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await fetchItems();
        console.table(data);
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'end', marginBottom: '14px' }}
      >
        <Box>
          <Snackbar
            open={handleSnack}
            message="✅ Item added successfully!"
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleCloseSnack}
          />
        </Box>

        <Button
          onClick={handleSnackbar}
          startIcon={<AddCircleIcon />}
          variant="outlined"
        >
          Snackbar
        </Button>

        <Button
          onClick={handleOpen}
          startIcon={<AddCircleIcon />}
          variant="outlined"
        >
          New
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: '32px' }}
              >
                Add Inventory
              </Typography>

              <InputComponent
                label={'Item Name'}
                value={input.item_name}
                name="item_name"
                onChange={handleChange}
                required
              />
              <SelectComponent
                label={'Category'}
                options={category}
                value={input.category}
                name="category"
                onChange={handleChange}
                required
              />
              <InputComponent
                label={'Brand'}
                value={input.brand}
                name="brand"
                onChange={handleChange}
                required
              />
              <InputComponent
                type={'number'}
                label={'Quantity'}
                value={input.quantity}
                name="quantity"
                onChange={handleChange}
                required
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <ButtonComponent
                  color={'error'}
                  variant={'outlined'}
                  sx={{ mr: '8px' }}
                  onClick={handleClose}
                  startIcon={<Clear />}
                >
                  Cancel
                </ButtonComponent>
                <ButtonComponent
                  variant={'outlined'}
                  endIcon={<Check />}
                  type="submit"
                >
                  Save
                </ButtonComponent>
              </Box>
            </form>
          </Box>
        </Modal>
      </Box>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="data table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.value}
                    align={header.align}
                    sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {tableHeaders.map((header, i) => (
                      <TableCell
                        key={header.value}
                        component={i === 0 ? 'th' : 'td'}
                        scope={i === 0 ? 'row' : undefined}
                        align={header.align}
                      >
                        {row[header.value]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableHeaders.length} align="center">
                    No inventory found ⚠️
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Inventory;
