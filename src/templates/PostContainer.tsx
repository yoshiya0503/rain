import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

type Props = {
  children: ReactNode;
};

export const PostContainer = (props: Props) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      {props.children}
      <Divider />
    </Box>
  );
};

export default PostContainer;
