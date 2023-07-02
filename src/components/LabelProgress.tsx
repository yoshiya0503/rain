import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";

export const LabelProgress = (props: CircularProgressProps & { value: number; label: string }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
};

export default LabelProgress;
