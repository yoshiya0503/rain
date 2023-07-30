import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "grid",
        placeItems: "center",
        mt: "25%",
      }}
    >
      <Stack alignItems="center">
        <CircularProgress />
        <Typography variant="caption" color="primary">
          Now Loading
        </Typography>
      </Stack>
    </Box>
  );
};

export default Loading;
