import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import NewSegments from './Components/NewSegments';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [urlDisplay, setUrlDisplay] = useState('');
  return (
    <Grid display="flex" flexDirection="column" gap="20px">
      <Grid
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        style={{
          position: 'relative',
          backgroundColor: '#38AEBD',
          padding: '10px',
          width: '100%',
          height: '50px',
          // overflow: 'hidden',
        }}
      >
        <Typography>Saving Segment</Typography>
      </Grid>
      <Grid>
        <Typography>
          Enter webhool url from webhook.site to send responce to.
        </Typography>
        <Grid
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="15px"
        >
          <TextField
            id="outlined-basic"
            value={webhookUrl}
            size="small"
            onChange={(e) => setWebhookUrl(e.target.value)}
            label="Webhook url"
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={() => {
              setUrlDisplay(webhookUrl);
              setWebhookUrl('');
            }}
          >
            Submit url
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h9">Url : {urlDisplay}</Typography>
      <Grid>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Save Segment
        </Button>
        <NewSegments
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          webhookUrl={urlDisplay}
        />
      </Grid>
    </Grid>
  );
}

export default App;
