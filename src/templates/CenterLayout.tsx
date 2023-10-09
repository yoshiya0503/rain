import { ReactNode } from "react";
import Stack from "@mui/material/Stack";

type Props = {
  children: ReactNode;
};

export const CenterLayout = (props: Props) => {
  return (
    <Stack sx={{ height: "100vh" }} component="main" justifyContent="center" alignItems="center">
      {props.children}
    </Stack>
  );
};

export default CenterLayout;
