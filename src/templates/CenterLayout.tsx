import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

type Props = {
  children: ReactNode;
};

export const CenterLayout = (props: Props) => {
  return (
    <Box
      component="main"
      sx={{
        display: "grid",
        placeItems: "center",
        mt: "25%",
      }}
    >
      <Stack alignItems="center">{props.children}</Stack>
    </Box>
  );
};

export default CenterLayout;
