import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";

export const useFeedGenerator = (feed: AppBskyFeedDefs.GeneratorView, preferences: AppBskyActorDefs.Preferences) => {
  const like = useStore((state) => state.like);
  const deleteLike = useStore((state) => state.deleteLike);
  const updatePreferences = useStore((state) => state.updatePreferences);
  const updateFeedViewer = useStore((state) => state.updateFeedViewer);

  const feedPref = _.find(preferences, (p) => AppBskyActorDefs.isSavedFeedsPref(p));
  const isSaved = AppBskyActorDefs.isSavedFeedsPref(feedPref) && _.find(feedPref.saved, (uri) => feed.uri === uri);
  const isPinned = AppBskyActorDefs.isSavedFeedsPref(feedPref) && _.find(feedPref.pinned, (uri) => feed.uri === uri);

  const updateViewer = useCallback(
    (f: AppBskyFeedDefs.GeneratorView, resourceURI?: string) => {
      const feed = { ...f };
      if (resourceURI) {
        if (_.isNumber(feed.likeCount)) {
          feed.likeCount += 1;
          feed.viewer = { ...feed, like: resourceURI };
        }
      } else {
        if (_.isNumber(feed.likeCount)) {
          feed.likeCount -= 1;
          feed.viewer = _.omit(feed.viewer, "like");
        }
      }
      updateFeedViewer(feed);
    },
    [updateFeedViewer]
  );

  const onToggleSave = useCallback(() => {
    if (!AppBskyActorDefs.isSavedFeedsPref(feedPref)) return;
    const update = _.map(preferences, (p) => {
      if (isSaved) return { ...p, saved: _.reject(feedPref.saved, (uri) => uri === feed.uri) };
      return { ...p, saved: _.concat(feedPref.saved, feed.uri) };
    });
    updatePreferences(update);
  }, [updatePreferences, feed, preferences, feedPref, isSaved]);

  const onTogglePin = useCallback(() => {
    if (!AppBskyActorDefs.isSavedFeedsPref(feedPref)) return;
    const update = _.map(preferences, (p) => {
      if (isPinned) return { ...p, pinned: _.reject(feedPref.pinned, (uri) => uri === feed.uri) };
      return { ...p, pinned: _.concat(feedPref.pinned, feed.uri) };
    });
    updatePreferences(update);
  }, [updatePreferences, feed, preferences, feedPref, isPinned]);

  const onLike = useCallback(
    async (feed: AppBskyFeedDefs.GeneratorView) => {
      const res = await like(feed);
      updateViewer(feed, res?.uri);
    },
    [like, updateViewer]
  );

  const onDeleteLike = useCallback(
    async (feed: AppBskyFeedDefs.GeneratorView) => {
      deleteLike(feed);
      updateViewer(feed);
    },
    [deleteLike, updateViewer]
  );

  const onToggleLike = useCallback(
    async (feed: AppBskyFeedDefs.GeneratorView) => {
      return feed.viewer?.like ? onDeleteLike(feed) : onLike(feed);
    },
    [onDeleteLike, onLike]
  );

  const onShare = useCallback((feed: AppBskyFeedDefs.GeneratorView) => {
    const url = _.chain(feed.uri)
      .replace("at://", "https://bsky.app/profile/")
      .replace("/app.bsky.feed.generator/", "/feed/")
      .value();
    navigator.clipboard.writeText(url);
  }, []);

  return { isPinned, isSaved, onToggleLike, onToggleSave, onTogglePin, onShare } as const;
};

export default useFeedGenerator;
