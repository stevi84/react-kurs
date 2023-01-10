import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { LanguageSwitch } from './LanguageSwitch';

const theme = createTheme(

);

export const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <LanguageSwitch />
        {props.children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
