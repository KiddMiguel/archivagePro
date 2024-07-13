
// Typographie utilisée dans l'application
import { colors } from './Style.color';

export const typography = {
    fontFamily: 'Roboto, Arial, sans-serif',  // Police principale
    fontSizeBase: '16px',                    // Taille de police de base
    fontWeightLight: 300,                    // Poids léger
    fontWeightRegular: 400,                  // Poids régulier
    fontWeightBold: 700,                     // Poids gras
  
    // Titres
    h1: {
        fontSize: '2.5rem',                  // Taille de H1
        fontWeight: 700,                     // Poids de H1
        lineHeight: '1.2',                   // Hauteur de ligne de H1
        color: colors.primary,                    // Couleur de H1
    },
    h2: {
        fontSize: '2rem',                    // Taille de H2
        fontWeight: 700,                     // Poids de H2
        lineHeight: '1.3',                   // Hauteur de ligne de H2
        color: colors.primary,                    // Couleur de H2
    },
    h3: {
        fontSize: '1.75rem',                 // Taille de H3
        fontWeight: 700,                     // Poids de H3
        lineHeight: '1.4',                   // Hauteur de ligne de H3
        color: colors.primary,                    // Couleur de H3
    },
    h4: {
        fontSize: '1.5rem',                  // Taille de H4
        fontWeight: 700,                     // Poids de H4
        lineHeight: '1.5',                   // Hauteur de ligne de H4
        color: colors.primary,                    // Couleur de H4
    },
    h5: {
        fontSize: '1.25rem',                 // Taille de H5
        fontWeight: 700,                     // Poids de H5
        lineHeight: '1.6',                   // Hauteur de ligne de H5
        color: colors.primary,                    // Couleur de H5
    },
    h6: {
        fontSize: '1rem',                    // Taille de H6
        fontWeight: 700,                     // Poids de H6
        lineHeight: '1.7',                   // Hauteur de ligne de H6
        color: colors.primary,                    // Couleur de H6
    },
  
    // Texte standard
    body: {
        fontSize: '1rem',                    // Taille du corps du texte
        fontWeight: 400,                     // Poids du corps du texte
        lineHeight: '1.5',                   // Hauteur de ligne du corps du texte
        color: colors.darkGrey,                    // Couleur du corps du texte
    },
    smallText: {
        fontSize: '0.875rem',                // Taille du petit texte
        fontWeight: 400,                     // Poids du petit texte
        lineHeight: '1.4',                   // Hauteur de ligne du petit texte
        color: colors.grey,                    // Couleur du petit texte
    },
    link: {
        fontSize: '1rem',                    // Taille des liens
        fontWeight: 400,                     // Poids des liens
        lineHeight: '1.5',                   // Hauteur de ligne des liens
        color: colors.secondary,                    // Couleur des liens
        textDecoration: 'none',              // Décoration des liens
        hoverColor: '#005bb5',               // Couleur au survol des liens
    },
  };
  