import { createTheme } from '@mui/material/styles';
const Theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(42,134,199,0.87)',
    },
    secondary: {
      light: '#ffbc43',
      main: '#ff9500',
      dark: '#f76621',
      contrastText: '#000',
    },
  },

  typography: {
    fontFamily: 'Montserrat',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#fff',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.125rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      color: '#00000099',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '0.875rem',
      color: '#fff',
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '0.75rem',
      color: '#00000099',
    },
  },
});

export default Theme;