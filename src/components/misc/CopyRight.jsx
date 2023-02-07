import { Link, Typography } from "@mui/material";


export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="/">
          BlueSpace
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }