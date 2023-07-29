import { ReactNode } from "react";
import Box from "@mui/material/Box";

type Props = {
  children: ReactNode;
};

export const FeedContainer = (props: Props) => {
  return <Box sx={{ maxWidth: 480 }}>{props.children}</Box>;
};

export default FeedContainer;
