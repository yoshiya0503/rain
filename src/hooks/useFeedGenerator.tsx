import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";
// TODO feedのpinのtoggleがサイドパネルで更新されてない

export const useFeedGenerator = () => {
  const like = useStore((state) => state.like);
  const deleteLike = useStore((state) => state.deleteLike);
  const updatePreferences = useStore((state) => state.updatePreferences);
  const updateFeedViewer = useStore((state) => state.updateFeedViewer);
  const updateSavedFeedViewer = useStore((state) => state.updateSavedFeedViewer);
  const updatePinnedFeedViewer = useStore((state) => state.updatePinnedFeedViewer);

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

  const isSaved = useCallback((feed: AppBskyFeedDefs.GeneratorView, preferences: AppBskyActorDefs.Preferences) => {
    const feedPref = _.find(preferences, (p) => AppBskyActorDefs.isSavedFeedsPref(p));
    return AppBskyActorDefs.isSavedFeedsPref(feedPref) && _.find(feedPref.saved, (uri) => feed.uri === uri);
  }, []);

  const isPinned = useCallback((feed: AppBskyFeedDefs.GeneratorView, preferences: AppBskyActorDefs.Preferences) => {
    const feedPref = _.find(preferences, (p) => AppBskyActorDefs.isSavedFeedsPref(p));
    return AppBskyActorDefs.isSavedFeedsPref(feedPref) && _.find(feedPref.pinned, (uri) => feed.uri === uri);
  }, []);

  const onToggleSave = useCallback(
    (feed: AppBskyFeedDefs.GeneratorView, preferences: AppBskyActorDefs.Preferences) => {
      const update = _.map(preferences, (p) => {
        if (AppBskyActorDefs.isSavedFeedsPref(p)) {
          return _.find(p.saved, (uri) => feed.uri === uri)
            ? { ...p, saved: _.reject(p.saved, (uri) => uri === feed.uri) }
            : { ...p, saved: _.concat(p.saved, feed.uri) };
        }
        return p;
      });
      updatePreferences(update);
      updateSavedFeedViewer(feed);
    },
    [updatePreferences, updateSavedFeedViewer]
  );

  const onTogglePin = useCallback(
    (feed: AppBskyFeedDefs.GeneratorView, preferences: AppBskyActorDefs.Preferences) => {
      const update = _.map(preferences, (p) => {
        if (AppBskyActorDefs.isSavedFeedsPref(p)) {
          return _.find(p.pinned, (uri) => feed.uri === uri)
            ? { ...p, pinned: _.reject(p.pinned, (uri) => uri === feed.uri) }
            : { ...p, pinned: _.concat(p.pinned, feed.uri) };
        }
        return p;
      });
      updatePreferences(update);
      updatePinnedFeedViewer(feed);
    },
    [updatePreferences, updatePinnedFeedViewer]
  );

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
