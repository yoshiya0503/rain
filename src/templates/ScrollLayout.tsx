import _ from "lodash";
import { ReactNode, UIEvent, useRef, useState, useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import { useLocation } from "react-router-dom";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigationIcon from "@mui/icons-material/Navigation";
import UnreadPosts from "@/components/UnreadPosts";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  children: ReactNode;
  onScrollLimit?: () => void;
  unread?: AppBskyFeedDefs.FeedViewPost[];
};

const SHOW_SCROLL_THREASHOLD = 3000;

export const ScrollLayout = (props: Props) => {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState<boolean>(false);
  const drainTimeline = useStore((state) => state.drainTimeline);
  const getScrollTop = useStore((state) => state.getScrollTop);
  const updateScrollTop = useStore((state) => state.updateScrollTop);

  useEffect(() => {
    ref?.current?.scrollTo({
      top: getScrollTop(pathname),
      behavior: "auto",
    });
  }, [pathname, getScrollTop]);

  const handleBottomScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (pathname === "/") {
        // TODO 別ページからバックで戻ってきた際に
        // 意図せずスクロールイベントがかなり下のscrollTopで呼ばれることがある。
        updateScrollTop(pathname, e.currentTarget.scrollTop);
      }

      const nearBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight;
      if (_.floor(nearBottom) <= 1) {
        props.onScrollLimit && props.onScrollLimit();
      }
      if (SHOW_SCROLL_THREASHOLD < e.currentTarget.scrollTop) {
        setHasScroll(true);
      }
      if (e.currentTarget.scrollTop < SHOW_SCROLL_THREASHOLD) {
        setHasScroll(false);
      }
    },
    [props, pathname, updateScrollTop]
  );

  const scrollTop = useCallback(() => {
    setTimeout(drainTimeline, 100);
    ref?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [drainTimeline]);

  return (
    <Stack sx={{ overflow: "hidden" }}>
      <Fade in={hasScroll}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={scrollTop}
            sx={{ mb: -5, opacity: 0.85, textTransform: "none" }}
          >
            {_.size(props.unread) ? (
              <UnreadPosts unread={props.unread || []} />
            ) : (
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                <NavigationIcon fontSize="small" />
                <Typography variant="caption">TOP</Typography>
              </Stack>
            )}
          </Fab>
        </Box>
      </Fade>
      <Box
        sx={{ overflowY: "scroll", "&::-webkit-scrollbar": { display: "none" } }}
        onScroll={handleBottomScroll}
        ref={ref}
      >
        {props.children}
      </Box>
    </Stack>
  );
};

export default ScrollLayout;
