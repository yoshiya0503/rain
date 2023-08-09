import _ from "lodash";
import { ReactNode, UIEvent, useRef, useState } from "react";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import NavigationIcon from "@mui/icons-material/Navigation";

type Props = {
  children: ReactNode;
  onScrollLimit: () => void;
};

export const ScrollLayout = (props: Props) => {
  const showScrollThreashold = 3000;

  const ref = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState<boolean>(false);

  const handleBottomScroll = (e: UIEvent<HTMLDivElement>) => {
    const nearBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight;
    if (_.floor(nearBottom) <= 1) {
      // TODO スムーズにしたい
      props.onScrollLimit();
    }
    if (showScrollThreashold < e.currentTarget.scrollTop) {
      setHasScroll(true);
    }
    if (e.currentTarget.scrollTop < showScrollThreashold) {
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
    <Box>
      <Fade in={hasScroll}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Fab variant="extended" size="medium" color="primary" onClick={scrollTop} sx={{ mb: -5, opacity: 0.7 }}>
            <NavigationIcon />
            Top
          </Fab>
        </Box>
      </Fade>
      <Box
        sx={{ height: "95vh", overflowY: "scroll", "&::-webkit-scrollbar": { display: "none" } }}
        onScroll={handleBottomScroll}
        ref={ref}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default ScrollLayout;
