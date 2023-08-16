import _ from "lodash";
import { useState, useCallback, useEffect } from "react";
import { useStore } from "@/stores";
import { AppBskyEmbedRecord, AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export const useQuote = (post?: AppBskyFeedDefs.PostView) => {
  const getPostThread = useStore((state) => state.getPostThread);
  const resolveHandle = useStore((state) => state.resolveHandle);

  const [quote, setQuote] = useState<AppBskyEmbedRecord.ViewRecord>();

  useEffect(() => {
    if (AppBskyFeedPost.isRecord(post?.record)) {
      const q = post ? { value: post.record, ...post } : undefined;
      setQuote(q);
    }
  }, [setQuote, post]);

  const fetchHandle = useCallback((url: string) => {
    const splited = _.split(url, "/");
    return _.findLast(splited, (str) => _.includes(str, "."));
  }, []);

  const fetchPostURI = useCallback((url: string) => {
    const splited = _.split(url, "/");
    return `app.bsky.feed.post/${_.last(splited)}`;
  }, []);

  const fetchQuote = useCallback(
    async (link: string) => {
      // 引用ポストだけを拾う
      if (quote || !link) return;
      const handle = fetchHandle(link);
      if (!handle) {
        return;
      }
      const actorURI = await resolveHandle(handle);
      const postURI = fetchPostURI(link);
      const thread = await getPostThread(`at://${actorURI}/${postURI}`);
      if (AppBskyFeedDefs.isThreadViewPost(thread)) {
        if (AppBskyFeedPost.isRecord(thread.post.record)) {
          const q = { value: thread.post.record, ...thread.post };
          setQuote(q);
        }
      }
    },
    [quote, setQuote, getPostThread, resolveHandle, fetchHandle, fetchPostURI]
  );

  const fetchEmbedQuote = useCallback(() => {
    const record = { uri: quote?.uri, cid: quote?.cid };
    return { record, $type: "app.bsky.embed.record" };
  }, [quote]);

  const onClearQuote = useCallback(() => {
    setQuote(undefined);
  }, [setQuote]);

  return { quote, fetchQuote, fetchEmbedQuote, onClearQuote };
};

export default useQuote;
