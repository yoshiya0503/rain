import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

type Props = {
  type?: "thread" | "liked" | "reposted" | "search";
};

export const NotFound = (props: Props) => {
  const theme = useTheme();
  return (
    <>
      <ErrorOutlineIcon sx={{ color: grey[500] }} fontSize="large" />
      <Typography sx={{ color: grey[500] }} variant="h5">
        {props.type === "reposted" && "There area no repost"}
        {props.type === "liked" && "There are no like"}
        {props.type === "thread" && "Post Not Found"}
        {props.type === "search" && "No search results"}
        {!props.type && "404 Not Found"}
      </Typography>
      {props.type !== "search" && (
        <Typography variant="body1" color="primary" component="nav">
          <Link to="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Return To Home
          </Link>
        </Typography>
      )}
    </>
  );
};

export default NotFound;
