import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function FSdropdown() {
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}></Button>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="demo-controlled-open-select-label">Fingers</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Finger"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Left-Thumb</MenuItem>
          <MenuItem value={20}>Left-Index</MenuItem>
          <MenuItem value={30}>Left-Middle</MenuItem>
          <MenuItem value={40}>Left-Ring</MenuItem>
          <MenuItem value={50}>Left-Pinky</MenuItem>
          <MenuItem value={60}>Rignt-Thumb</MenuItem>
          <MenuItem value={70}>Rignt-Index</MenuItem>
          <MenuItem value={80}>Rignt-Middle</MenuItem>
          <MenuItem value={90}>Rignt-Ring</MenuItem>
          <MenuItem value={100}>Rignt-Pinky</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}