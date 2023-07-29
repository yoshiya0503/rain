import { ReactNode } from "react";
import Box from "@mui/material/Box";

type Props = {
  children: ReactNode;
};

export const ProfileContainer = (props: Props) => {
  return <Box sx={{ maxWidth: 480, maxHeight: 400 }}>{props.children}</Box>;
};

export default ProfileContainer;
