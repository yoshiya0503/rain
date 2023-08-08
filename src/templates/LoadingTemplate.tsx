import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CenterLayout from "@/templates/CenterLayout";

export const LoadingTemplate = () => {
  return (
    <CenterLayout>
      <CircularProgress />
      <Typography variant="caption" color="primary">
        Now Loading
      </Typography>
    </CenterLayout>
  );
};

export default LoadingTemplate;
