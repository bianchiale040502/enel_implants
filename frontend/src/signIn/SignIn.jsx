import * as React from 'react';
import { useContext, useState } from 'react';
import { NavigationContext } from '../contextFiles/NavigationContext';

import {
    Box,
    Button,
    FormLabel,
    FormControl,
    TextField,
    Typography,
    Stack,
    Alert,
    AlertTitle,
    Card as MuiCard,
    styled
} from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px'
}));

function SignIn() {
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [loginError, setLoginError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(NavigationContext);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateInputs()) return;

        const response = await login(username, password);

        if (!response.success) {
            if (response.code === 401) {
                setLoginError('')
                setUsernameError(true);
                setUsernameErrorMessage(response.error);
                setPasswordError(true);
                setPasswordErrorMessage(response.error);
                setPassword('');
            } else {
                setLoginError(response.error)
                setUsername('');
                setPassword('');
            }
        }
    }

    function validateInputs() {

        let isValid = true;

        if (!username) {
            setUsernameError(true);
            setUsernameErrorMessage('Inserire username');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password deve avere almeno 6 caratteri.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Stack sx={{ padding: 10 }}>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="username">Usename</FormLabel>
                        <TextField
                            error={usernameError}
                            helperText={usernameErrorMessage}
                            id="username"
                            type="text"
                            name="username"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Sign in
                    </Button>
                    {loginError && (
                        <Alert severity="error">
                            <AlertTitle>Errore</AlertTitle>
                            {loginError}
                        </Alert>
                    )}
                </Box>
            </Card>
        </Stack >
    );
}

export default SignIn;