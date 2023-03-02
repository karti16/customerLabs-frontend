import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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
  Snackbar,
  Alert,
} from '@mui/material';
import AlertDialog from './AlertDialog';
import SegmentsToAdd from './SegmentsToAdd';
import SelectedSchema from './SelectedSegments';

function NewSegments({ isOpen, setIsOpen, webhookUrl }) {
  if (!isOpen) return null;

  const [list, setList] = useState([
    { label: 'First Name', value: 'first_name', added: true },
    { label: 'Last Name', value: 'last_name', added: true },
    { label: 'Gender', value: 'gender', added: false },
    { label: 'Age', value: 'age', added: false },
    { label: 'Account Name', value: 'account_name', added: false },
    { label: 'City', value: 'city', added: false },
    { label: 'State', value: 'state', added: false },
  ]);

  const [open, setOpen] = React.useState(false);
  const [addNewSchema, setAddNewSchema] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const addSchema = (selectedSchema) => {
    const objIndex = list.findIndex((i) => i.value === selectedSchema);
    const tempList = list;
    tempList[objIndex].added = true;
    setList((prevList) => [...tempList]);
  };

  const removeSchema = (value) => {
    const objIndex = list.findIndex((i) => i.value === value);
    const tempList = list;
    tempList[objIndex].added = false;
    setList((prevList) => [...tempList]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const tempData = {
      segment_name: segmentName,
      schema: list
        .filter((item) => item.added)
        .map((item) => {
          return { [item.value]: item.label };
        }),
    };

    if (!webhookUrl) {
      setSnackBarMessage('No url found to send data');
      setSnackBarOpen(true);
      return;
    }
    const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tempData),
    };
    fetch(webhookUrl, requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log('success', data);
        setSnackBarMessage('Data sent successfully');
        setSnackBarOpen(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
        return new Promise((resolve, reject) => {
          resolve(data ? JSON.parse(data) : {});
        });
      });
  };
  return ReactDom.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgb(0,0,0,0.6)',
        zIndex: 1000,
      }}
    >
      <Card
        style={{
          position: 'absolute',
          height: 'calc(100vh - 20px)',
          backgroundColor: '#FFF',
          zIndex: 1000,
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* header */}
        <Grid
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          style={{
            position: 'relative',
            backgroundColor: '#38AEBD',
            padding: '0px',
            width: '100%',
            height: '50px',
            // overflow: 'hidden',
          }}
        >
          <IconButton>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography>Saving Segment</Typography>
        </Grid>
        {/* content */}
        <Grid
          display="flex"
          flexDirection="column"
          gap="10px"
          style={{
            padding: '30px',
            flex: 1,
            overflow: 'auto',
          }}
        >
          <Typography variant="h9">Enter the Name of the Segment</Typography>

          <TextField
            placeholder="Name of the segment"
            size="small"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
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
        </Grid>
        {/* footer */}
        <Grid
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          style={{
            position: 'relative',
            paddingLeft: '10px',
            width: '100%',
            height: '50px',
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="success"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={() => handleClickOpen()}
          >
            close
          </Button>
        </Grid>
      </Card>
      <AlertDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        dialogTitle="Do you want to close ?"
        dialogText="Changes you made may not be saved. "
        dialogAgreeButtonText="Stay"
        dialogDisagreeButtonText="Leave"
      />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>,
    document.getElementById('portal'),
  );
}

NewSegments.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  webhookUrl: PropTypes.string.isRequired,
};

export default NewSegments;
