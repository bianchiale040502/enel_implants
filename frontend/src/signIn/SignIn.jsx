import * as React from 'react';
import { useContext, useState } from 'react';
import {
    Box,
    Button,
    FormLabel,
    FormControl,
    TextField,
    Typography,
    Stack,
    Card as MuiCard,
    styled
} from '@mui/material';
import { NavigationContext } from '../NavigationContext';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    // ...theme.applyStyles('dark', {
    //     boxShadow:
    //         'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    // }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        // ...theme.applyStyles('dark', {
        //     backgroundImage:
        //         'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        // }),
    },
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

        const isSuccess = await login(username, password);

        if (!isSuccess) {
            setLoginError('Credenziali errate. Riprova.');
            setUsername('');
            setPassword('');
        } else {
            setLoginError('');
        }
    }

    function validateInputs() {

        let isValid = true;

        if (!username) {
            setUsernameError(true);
            setUsernameErrorMessage('Please enter a username.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        // if (!password.value || password.value.length < 6) {
        if (!password) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <SignInContainer direction="column">
            {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
            <Card variant="outlined">
                {/* <SitemarkIcon /> */}
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
                        // variant="outlined"
                        // color={usernameError ? 'error' : 'primary'}
                        // sx={{ ariaLabel: 'username' }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link
                                    component="button"
                                    type="button"
                                    onClick={handleClickOpen}
                                    variant="body2"
                                    sx={{ alignSelf: 'baseline' }}
                                >
                                    Forgot your password?
                                </Link>
                            </Box> */}
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
                        // variant="outlined"
                        // color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    {loginError && (
                        <Typography
                            color="error"
                            sx={{ textAlign: 'center' }}
                        >
                            {loginError}
                        </Typography>
                    )}
                    {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <ForgotPassword open={open} handleClose={handleClose} /> */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    // onClick={validateInputs}
                    >
                        Sign in
                    </Button>
                </Box>
            </Card>
        </SignInContainer>
    );
}

export default SignIn;