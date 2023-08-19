import _ from "lodash";
import { StateCreator } from "zustand";

export interface LayoutSlice {
  scrolls: { path: string; top: number }[];
  getScrollTop: (path: string) => number;
  updateScrollTop: (path: string, top: number) => void;
}

export const createLayoutSlice: StateCreator<LayoutSlice, [], [], LayoutSlice> = (set, get) => ({
  scrolls: [
    {
      path: "/",
      top: 0,
    },
  ],
  getScrollTop: (path: string) => {
    const scroll = _.find(get().scrolls, (scroll) => scroll.path === path);
    return scroll?.top || 0;
  },
  updateScrollTop: (path: string, top: number) => {
    const scrolls = _.map(get().scrolls, (scroll) => (scroll.path === path ? { ...scroll, top } : scroll));
    set({ scrolls });
  },
});
