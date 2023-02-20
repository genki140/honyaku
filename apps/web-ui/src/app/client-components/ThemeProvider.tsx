"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import type { } from '@mui/x-data-grid/themeAugmentation';

const ThemeProvider = (props: { children: ReactNode }) => (
  <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
);
export default ThemeProvider;

// declare module '@mui/material/styles' {
//   // テーマの拡張
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

// パレットの拡張
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    accent: true;
  }
}

// タイポグラフィーの拡張
declare module '@mui/material/styles' {
  interface TypographyVariants {
    small: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true;
  }
}

// button
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    shadow: true;
  }
}

// const primaryColor = '#80A8CC';
const primaryColor = '#3364A0';

// スタイルの定義
const theme = createTheme({
  palette: {
    // mode: 'dark',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: primaryColor,
      contrastText: '#fff',
    },
    secondary: {
      main: '#D0E1EE',
      // contrastText: '#fff',
    },
    warning: {
      main: '#bb6060',
    },
    accent: {
      // primary が accentの色になったのに伴い、アクセントカラーは変更する必要あり。
      // コブラウズでしか使用していないので、グローバルメニューと同じようなハイライトが出来ればいい？
      main: '#3364A0',
      light: '#5b83b3',
      dark: '#234670',
      contrastText: '#fff',
    },

    // text: {
    //   primary: 'rgba(0,0,0,0.87)',
    //   secondary: 'rgba(0,0,0,0.6)',
    //   disabled: 'rgba(0,0,0,0.38)',
    // },
    divider: 'rgba(0,0,0,0.12)',
  },
  typography: {
    h1: {
      fontSize: 'h1',
    },
    h2: {
      fontSize: 'h2',
    },
    h3: {
      fontSize: 'h3',
    },
    h4: {
      fontSize: 'h4',
    },
    h5: {
      fontSize: 'h5',
    },
    h6: {
      fontSize: 'h6',
    },
    small: {
      // システム共通の少し小さくしたい文字(拡張)
      fontSize: '13px',
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          minWidth: 120,
        },
      },
      variants: [
        {
          props: { variant: 'shadow' },
          style: (t) => ({
            boxShadow: t.theme.shadows[2],
            borderColor: '#0000',
            backgroundColor: t.theme.palette.background.default,
            '&.MuiButton-shadow': {
              color: 'black',
            },
            '&:hover': {
              backgroundColor: '#eee',
            },
            '&>.MuiButton-startIcon, &>.MuiButton-endIcon': {
              color: t.theme.palette.primary.main,
            },
            '&.Mui-disabled': {
              color: t.theme.palette.action.disabled,
              backgroundColor: t.theme.palette.action.disabled,
            },
          }),
        },
        {
          props: { variant: 'shadow', color: 'secondary' },
          style: () => ({
            path: { color: '#aaa' },
          }),
        },
        // {
        //   props: { variant: 'shadow', color: 'warning' },
        //   style: (t) => ({
        //     path: { color: t.theme.palette.warning.main },
        //     '&.Mui-disabled': {
        //       path: { color: t.theme.palette.action.disabled },
        //     },
        //   }),
        // },
      ],
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          // この指定だとダークモードでぴったり同じにならない（要調査）
          backgroundColor: primaryColor,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          gridRow: 2,
          border: 'none',
          '& .MuiDataGrid-virtualScrollerContent': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiCircularProgress-root': {
            zIndex: 1, // グリッドのローディングが消えない様にする
          },
          '& .MuiDataGrid-columnSeparator--sideRight': {
            display: 'none',
          },
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingTop: 3 * 8,
          paddingBottom: 2 * 8,
          paddingRight: 4 * 8,
          paddingLeft: 4 * 8,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingRight: 4 * 8,
          paddingLeft: 4 * 8,
          paddingBottom: 0 * 8,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          paddingRight: 0 * 8,
          paddingLeft: 0 * 8,
          paddingTop: 2 * 8,
          paddingBottom: 1 * 8,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingRight: 2 * 8,
          paddingLeft: 2 * 8,
          paddingTop: 2 * 8,
          paddingBottom: 2 * 8,
        },
      },
    },
  },
});
