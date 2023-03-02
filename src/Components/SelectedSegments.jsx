import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  MenuItem,
  Select,
  Button,
  Box,
} from '@mui/material';

function SelectedSchema({ list, setList, removeSchema, addSchema }) {
  const modifySelectedSchema = (oldValue, newValue) => {
    const oldValueIndex = list.findIndex((i) => i.value === oldValue);
    const newValueIndex = list.findIndex((i) => i.value === newValue);

    const tempList = list;
    tempList[oldValueIndex].added = false;
    tempList[newValueIndex].added = true;
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

export default SelectedSchema;
