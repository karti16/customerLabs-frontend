import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from '@mui/material';

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

export default SegmentsToAdd;
