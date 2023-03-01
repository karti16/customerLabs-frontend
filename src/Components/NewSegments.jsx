import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Link,
  Button,
  Card,
  Typography,
  Grid,
  Box,
} from '@mui/material';

const popupStyles = {
  position: 'fixed',
  left: 0,
  height: '100%',
  // transform: 'translate(-50%, -50%)',
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

function SegmentsToAdd({ list, setList, removeSchema, addSchema }) {
  const [selectedSchema, setSelectedSchema] = useState('');
  return (
    <>
      <FormControl fullWidth size="small">
        <InputLabel
          id="demo-simple-select-label"
          style={{ height: 30, fontSize: '12px' }}
        >
          Add schema to segment
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSchema}
          label="Add schema to segment"
          onChange={(e) => setSelectedSchema(e.target.value)}
          style={{ height: 30, fontSize: '12px' }}
        >
          {list.map(
            (item) =>
              !item.added && (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ),
          )}
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="flex-start">
        <Button
          sx={{ height: 30, fontSize: '10px' }}
          onClick={() => {
            addSchema(selectedSchema);
          }}
        >
          +Add new schema
        </Button>
      </Box>
    </>
  );
}

function SelectedSchema({ list, setList, removeSchema, addSchema }) {
  const modifySelectedSchema = (oldValue, newValue) => {
    const oldValueIndex = list.findIndex((i) => i.value === oldValue);
    const newValueIndex = list.findIndex((i) => i.value === newValue);

    const tempList = list;
    tempList[oldValueIndex].added = false;
    tempList[newValueIndex].added = true;
    console.log(tempList);
    setList((prevList) => [...tempList]);
  };

  return (
    <>
      {list.map(
        (item) =>
          item.added && (
            <Grid
              key={item.value}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControl fullWidth size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ height: 30, fontSize: '12px' }}
                />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item.value}
                  displayEmpty
                  style={{ height: 30, fontSize: '12px' }}
                  label=""
                  onChange={(e) =>
                    modifySelectedSchema(item.value, e.target.value)
                  }
                >
                  {list.map((i) => (
                    <MenuItem key={i.value} disabled={i.added} value={i.value}>
                      {i.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton onClick={() => removeSchema(item.value)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          ),
      )}
    </>
  );
}

function NewSegments({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const [list, setList] = useState([
    { label: 'First Name', value: 'first_name', added: false },
    { label: 'Last Name', value: 'last_name', added: false },
    { label: 'Gender', value: 'gender', added: false },
    { label: 'Age', value: 'age', added: false },
    { label: 'Account Name', value: 'account_name', added: false },
    { label: 'City', value: 'city', added: false },
    { label: 'State', value: 'state', added: false },
  ]);

  const [addNewSchema, setAddNewSchema] = useState(false);

  const addSchema = (selectedSchema) => {
    const objIndex = list.findIndex((i) => i.value === selectedSchema);
    const tempList = list;
    tempList[objIndex].added = true;
    console.log(tempList);
    setList((prevList) => [...tempList]);
  };

  const removeSchema = (value) => {
    console.log('ssss', value);
    const objIndex = list.findIndex((i) => i.value === value);
    const tempList = list;
    tempList[objIndex].added = false;
    console.log(tempList);
    setList((prevList) => [...tempList]);
  };

  return ReactDom.createPortal(
    <div style={overlayStyles}>
      <Card style={popupStyles}>
        <Grid display="flex" flexDirection="column" gap="10px">
          <Typography variant="h9">Enter the Name of the Segment</Typography>

          <TextField placeholder="Name of the segment" size="small" />
          <Typography variant="h9">
            To save your segment, you need to add the schemas to build the query
          </Typography>
          <SelectedSchema
            list={list}
            setList={setList}
            addSchema={addSchema}
            removeSchema={removeSchema}
          />
          <SegmentsToAdd
            list={list}
            setList={setList}
            addSchema={addSchema}
            removeSchema={removeSchema}
          />
          <Grid display="flex" gap="10px">
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={() => console.log('save')}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={() => setIsOpen(false)}
            >
              close
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>,
    document.getElementById('portal'),
  );
}

NewSegments.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

SegmentsToAdd.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      added: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setList: PropTypes.func.isRequired,
  addSchema: PropTypes.func.isRequired,
  removeSchema: PropTypes.func.isRequired,
};

SelectedSchema.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      added: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setList: PropTypes.func.isRequired,
  addSchema: PropTypes.func.isRequired,
  removeSchema: PropTypes.func.isRequired,
};

export default NewSegments;
