import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';

const theme = createTheme();

export const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        {props.children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
