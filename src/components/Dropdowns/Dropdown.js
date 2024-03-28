import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function Dropdown() {
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label" style={{fontSize:11}}>Month</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Month"
          onChange={handleChange}
          style={{ height: '45px',backgroundColor:"white"}}
           >
          <MenuItem style={{ fontSize:11}}  value="">
            None
          </MenuItem>
          <MenuItem  style={{ fontSize:11}} value={10}>January</MenuItem>
          <MenuItem  style={{ fontSize:11}} value={20}>February</MenuItem>
          <MenuItem style={{ fontSize:11}} value={30}>March</MenuItem>
          <MenuItem style={{ fontSize:11}} value={40}>April</MenuItem>
          <MenuItem style={{ fontSize:11}} value={50}>May</MenuItem>
          <MenuItem style={{ fontSize:11}} value={60}>June</MenuItem>
          <MenuItem style={{ fontSize:11}} value={70}>July</MenuItem>
          <MenuItem style={{ fontSize:11}} value={80}>August</MenuItem>
          <MenuItem style={{ fontSize:11}} value={90}>September</MenuItem>
          <MenuItem style={{ fontSize:11}} value={100}>October</MenuItem>
          <MenuItem style={{ fontSize:11}} value={110}>November</MenuItem>
          <MenuItem style={{ fontSize:11}} value={120}>December</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}