import React, { useState, createContext } from 'react';

export const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        severity: 'error',
        message: '',
    });

    return (
        <SnackBarContext.Provider value=
            {{
                snackbarState,
                setSnackbarState
            }}
        >
            {children}
        </SnackBarContext.Provider>
    )
}