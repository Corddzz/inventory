import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const style = {
  marginBottom: '24px',
};

const SelectComponent = ({ label, options = [], value, onChange, name }) => {
  return (
    <FormControl fullWidth sx={style}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        required
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
