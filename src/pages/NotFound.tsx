import CenterLayout from "@/templates/CenterLayout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

export const NotFound = () => {
  const theme = useTheme();
  return (
    <CenterLayout>
      <ErrorOutlineIcon sx={{ color: grey[500] }} fontSize="large" />
      <Typography sx={{ color: grey[500] }} variant="h5">
        404 Not Found
      </Typography>
      <Typography variant="body1" color="primary" component="nav">
        <Link to="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
          Return To Home
        </Link>
      </Typography>
    </CenterLayout>
  );
};

export default NotFound;
