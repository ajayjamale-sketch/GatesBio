import { createTheme } from '@mui/material/styles';

export const gatsBioTheme = createTheme({
  palette: {
    primary: {
      main: '#1E40AF', // Deep Blue
      dark: '#1E3A8A',
      light: '#3B82F6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0F766E', // Teal
      dark: '#115E59',
      light: '#14B8A6',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981', // Emerald QC Pass
      light: '#ECFDF5',
    },
    warning: {
      main: '#F59E0B', // Amber Pending
      light: '#FFFBEB',
    },
    error: {
      main: '#DC2626', // Crimson Out of Spec
      light: '#FEF2F2',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
  },
});
