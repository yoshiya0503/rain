import { ReactNode } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

type Props = {
  children: ReactNode;
};

export const FeedContainer = (props: Props) => {
  return (
    <Box sx={{ maxWidth: 480 }}>
      <>{props.children}</>
      <LinearProgress />
    </Box>
  );
};

export default FeedContainer;
