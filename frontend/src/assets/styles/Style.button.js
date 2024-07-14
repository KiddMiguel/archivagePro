import { colors } from './Style.color';
// Styles des boutons utilisés dans l'application

export const buttonStyles = {
    // Bouton de taille standard
    standard: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.primary,   // Couleur de fond
        hoverBackgroundColor: colors.primaryDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton de taille petite
    small: {
        padding: '5px 10px',              // Espacement intérieur
        fontSize: '0.875rem',             // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '4px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.primary,   // Couleur de fond
        hoverBackgroundColor: colors.primaryDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton de taille grande
    large: {
        padding: '15px 30px',             // Espacement intérieur
        fontSize: '1.125rem',             // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '6px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.primary,   // Couleur de fond
        hoverBackgroundColor: colors.primaryDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton de succès
    success: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.success,   // Couleur de fond
        hoverBackgroundColor: colors.successDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton de danger (erreur)
    danger: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.danger,    // Couleur de fond
        hoverBackgroundColor: colors.dangerDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton d'avertissement
    warning: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.warning,   // Couleur de fond
        hoverBackgroundColor: colors.warningDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton d'information
    info: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.info,      // Couleur de fond
        hoverBackgroundColor: colors.infoDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton léger
    light: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.dark,                // Couleur du texte
        backgroundColor: colors.light,     // Couleur de fond
        hoverBackgroundColor: colors.lightDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
    // Bouton sombre
    dark: {
        padding: '10px 20px',             // Espacement intérieur
        fontSize: '1rem',                 // Taille de la police
        fontWeight: 700,                  // Poids de la police
        borderRadius: '5px',              // Rayon des bordures
        border: 'none',                   // Bordure
        color: colors.white,               // Couleur du texte
        backgroundColor: colors.dark,      // Couleur de fond
        hoverBackgroundColor: colors.darkDark,  // Couleur de fond au survol
        focusOutline: 'none',             // Contour au focus
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Ombre portée
        transition: 'background-color 0.3s', // Transition de la couleur de fond
    },
};
