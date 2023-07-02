import { ReactNode, UIEvent, useRef, useState } from "react";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

type Props = {
  children: ReactNode;
  onScrollLimit: () => void;
};

export const ScrollLayout = (props: Props) => {
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
        <Stack direction="row" justifyContent="center">
          <Fab variant="extended" size="medium" color="primary" onClick={scrollTop} sx={{ mb: -5, opacity: 0.7 }}>
            <NavigationIcon />
            Top
          </Fab>
        </Stack>
      </Fade>
      <Container
        sx={{
          height: "90vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        onScroll={handleBottomScroll}
        ref={ref}
      >
        {props.children}
      </Container>
    </>
  );
};

export default ScrollLayout;
