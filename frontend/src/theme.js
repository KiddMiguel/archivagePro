import { createTheme } from "@mui/material/styles";
import { colors } from "./assets/styles/Style.color";
import { typography } from "./assets/styles/Style.typography";
import { buttonStyles } from "./assets/styles/Style.button";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary, // You can customize your primary color here
    },
    secondary: {
      main: colors.secondary, // You can customize your secondary color here
    },
    error: {
      main: colors.error, // Darker red color for error
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
  },

  // Text styles
  typography: {
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeBase,
    fontWeightLight: typography.fontWeightLight,
    fontWeightRegular: typography.fontWeightRegular,
    fontWeightBold: typography.fontWeightBold,
    h1: {
      fontSize: typography.h1.fontSize,
      fontWeight: typography.h1.fontWeight,
      lineHeight: typography.h1.lineHeight,
      color: typography.h1.color,
    },
    h2: {
      fontSize: typography.h2.fontSize,
      fontWeight: typography.h2.fontWeight,
      lineHeight: typography.h2.lineHeight,
      color: typography.h2.color,
    },
    h3: {
      fontSize: typography.h3.fontSize,
      fontWeight: typography.h3.fontWeight,
      lineHeight: typography.h3.lineHeight,
      color: typography.h3.color,
    },
    h4: {
      fontSize: typography.h4.fontSize,
      fontWeight: typography.h4.fontWeight,
      lineHeight: typography.h4.lineHeight,
      color: typography.h4.color,
    },
    h5: {
      fontSize: typography.h5.fontSize,
      fontWeight: typography.h5.fontWeight,
      lineHeight: typography.h5.lineHeight,
      color: typography.h5.color,
    },
    h6: {
      fontSize: typography.h6.fontSize,
      fontWeight: typography.h6.fontWeight,
      lineHeight: typography.h6.lineHeight,
      color: typography.h6.color,
    },
  },
  // Ajout les styles de bouton ici de mon fichier Style.button.js
    // Button styles
    button: {
      ...buttonStyles,
    },


});

export default theme;
