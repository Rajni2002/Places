import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
      borderRadius: 4,
      marginBottom: '1rem',
      display: 'flex',
      padding: '16px',
    },
    pagination: {
      borderRadius: 4,
      marginTop: '1rem',
      padding: '16px',
    },
    gridContainer: {
      "@media (max-width: 600px)": {
        flexDirection: 'column-reverse',
      },
    },
  }));