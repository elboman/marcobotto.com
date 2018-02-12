import Typography from 'typography';
import TwinPeaksTheme from 'typography-theme-twin-peaks';

const typography = new Typography(TwinPeaksTheme);

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default {
  typography,
};
