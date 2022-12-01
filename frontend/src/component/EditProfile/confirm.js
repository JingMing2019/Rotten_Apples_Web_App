import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Confirm = () => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">Saved!</Alert>
        </Stack>
    );
}
export default Confirm;
