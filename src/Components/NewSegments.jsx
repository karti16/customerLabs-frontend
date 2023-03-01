import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const popupStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
};
const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgb(0,0,0,0.6)',
  zIndex: 1000,
};

function SegmentsToAdd({ list }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        Add schema to segment
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        label="Add schema to segment"
        // onChange={handleChange}
      >
        {list.map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectedSchema({ schemaList }) {
  return schemaList.map((item) => (
    <TextField
      defaultValue={item.label}
      variant="filled"
      InputProps={{ disableUnderline: true, readOnly: true }}
    />
  ));
}

function NewSegments({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const [schemaList, setSchemaList] = useState([
    { label: 'First Name', Value: 'first_name' },
  ]);
  const [list, setList] = useState([
    { label: 'First Name', Value: 'first_name' },
    { label: 'Last Name', Value: 'last_name' },
    { label: 'Gender', Value: 'gender' },
    { label: 'Age', Value: 'age' },
    { label: 'Account Name', Value: 'account_name' },
    { label: 'City', Value: 'city' },
    { label: 'State', Value: 'state' },
  ]);
  return ReactDom.createPortal(
    <div style={overlayStyles}>
      <div style={popupStyles}>
        New Segments
        <div>
          <TextField placeholder="Name of the segment" />
        </div>
        <p>
          To save your segment, you need to add the schemas to build the query
        </p>
        <SelectedSchema schemaList={schemaList} />
        <SegmentsToAdd list={list} />
        <div>
          <button type="button" onClick={() => setIsOpen(false)}>
            close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal'),
  );
}

NewSegments.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

SegmentsToAdd.propTypes = {
  list: PropTypes.arrayOf.isRequired,
};

SelectedSchema.propTypes = {
  schemaList: PropTypes.arrayOf.isRequired,
};

export default NewSegments;
