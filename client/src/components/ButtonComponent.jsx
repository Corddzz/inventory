import Button from '@mui/material/Button';

const ButtonComponent = ({
  children,
  onClick,
  startIcon,
  color,
  endIcon,
  sx,
  type,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={'outlined'}
      startIcon={startIcon}
      color={color}
      endIcon={endIcon}
      sx={sx}
      type={type}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
