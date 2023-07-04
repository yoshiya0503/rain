import { ReactNode, UIEvent, useRef, useState } from "react";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import NavigationIcon from "@mui/icons-material/Navigation";

type Props = {
  children: ReactNode;
  onScrollLimit: () => void;
};

export const Scroll = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState<boolean>(false);

  const handleBottomScroll = (e: UIEvent<HTMLDivElement>) => {
    const nearBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight;
    if (nearBottom < 100) {
      props.onScrollLimit();
    }
    if (5000 < e.currentTarget.scrollTop) {
      setHasScroll(true);
    }
    if (e.currentTarget.scrollTop < 3000) {
      setHasScroll(false);
    }
  };

  const scrollTop = () => {
    ref?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Fade in={hasScroll}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Fab variant="extended" size="medium" color="primary" onClick={scrollTop} sx={{ mb: -5, opacity: 0.7 }}>
            <NavigationIcon />
            Top
          </Fab>
        </Box>
      </Fade>
      <Box
        sx={{
          height: "90vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        onScroll={handleBottomScroll}
        ref={ref}
      >
        {props.children}
      </Box>
    </>
  );
};

export default Scroll;
