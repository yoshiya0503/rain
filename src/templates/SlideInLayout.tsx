import { useRef, ReactNode } from "react";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

type Props = {
  children: ReactNode;
};

export const SlideInLayout = (props: Props) => {
  const containerRef = useRef(null);
  return (
    <Box ref={containerRef}>
      <Slide direction="left" in container={containerRef.current}>
        <Box>{props.children}</Box>
      </Slide>
    </Box>
  );
};

export default SlideInLayout;
