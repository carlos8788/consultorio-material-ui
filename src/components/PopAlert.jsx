import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function PopAlert() {
  return (
    <Stack
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1500,
        justifyContent: 'center',
      }}
      spacing={2}
    >
      <Alert variant="filled" severity="success">
        El comentario se guardó con éxito
      </Alert>
    </Stack>
  );
}