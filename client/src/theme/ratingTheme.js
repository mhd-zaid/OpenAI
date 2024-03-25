import { createTheme } from '@mui/material/styles';

const ratingTheme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        iconEmpty: {
          color: '#facc15',
          fill: 'white',
        },
        iconFilled: {
          color: '#facc15',
        },
        iconHover: {
          color: '#facc15',
        },
      }
    }
  }
});

export default ratingTheme;
