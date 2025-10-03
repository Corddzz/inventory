import { TextField } from '@mui/material';

const style = {
  marginBottom: '24px',
};

const InputComponent = ({
  label,
  value,
  onChange,
  error,
  variant,
  name,
  type,
}) => {
  return (
    <div>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        fullWidth
        variant={variant}
        sx={style}
        name={name}
        type={type}
        required
      />
    </div>
  );
};

export default InputComponent;
