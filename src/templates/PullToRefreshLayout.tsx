import { ReactNode, useState, useEffect, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import { useStore } from "@/stores";
import { useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

type Props = {
  children: ReactNode;
  onRefresh: () => Promise<void>;
};

const MAX = 128;
const k = 0.4;
const TIMEOUT = 10 * 1000;

export const PullToRefreshLayout = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const getScrollTop = useStore((state) => state.getScrollTop);
  const [initialY, setInitialY] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onLoading = useCallback(async () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, TIMEOUT);

    await props.onRefresh();
    setLoading(false);
    clearTimeout(timeout);
  }, [props]);

  const appr = useCallback((dy: number) => {
    return MAX * (1 - Math.exp((-k * dy) / MAX));
  }, []);

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      const initialY = e.touches[0].clientY;
      setInitialY(initialY);
    },
    [setInitialY]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const el = ref.current;
      const currentY = e.touches[0].clientY;
      const dy = currentY - initialY;
      if (100 < getScrollTop(pathname)) return;
      if (dy < 0) return;
      if (el) el.style.transform = `translateY(${appr(dy)}px)`;
    },
    [ref, initialY, appr, getScrollTop, pathname]
  );

  const onTouchEnd = useCallback(
    async (e: TouchEvent) => {
      const el = ref.current;
      if (el) {
        el.style.transition = "transform 0.2s";
        el.style.transform = "";
      }
      const currentY = e.changedTouches[0].clientY;
      const dy = currentY - initialY;
      setInitialY(0);
      if (dy < 200) return;
      await onLoading();
    },
    [ref, initialY, setInitialY, onLoading]
  );

  const onTransitionEnd = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.transition = "";
    }
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    el?.addEventListener("touchstart", onTouchStart, { passive: false });
    el?.addEventListener("touchmove", onTouchMove, { passive: false });
    el?.addEventListener("touchend", onTouchEnd, { passive: false });
    el?.addEventListener("transitionend", onTransitionEnd, { passive: false });
    return () => {
      el?.removeEventListener("touchstart", onTouchStart);
      el?.removeEventListener("touchmove", onTouchMove);
      el?.removeEventListener("touchend", onTouchEnd);
      el?.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [ref, onTouchStart, onTouchMove, onTouchEnd, onTransitionEnd]);

  return (
    <Box ref={ref}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowUpwardOutlinedIcon sx={{ position: "absolute", width: "100%", top: -40 }} color="primary" />
      </Box>
      {loading && <LinearProgress sx={{ borderRadius: 1 }} />}
      {props.children}
    </Box>
  );
};

export default PullToRefreshLayout;
