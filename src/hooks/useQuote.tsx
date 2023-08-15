import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyEmbedRecord, AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export const useQuote = (post?: AppBskyFeedDefs.PostView) => {
  const getPostThread = useStore((state) => state.getPostThread);
  const resolveHandle = useStore((state) => state.resolveHandle);

  const [quote, setQuote] = useState<AppBskyEmbedRecord.ViewRecord>();

  const isInvalidURL = useCallback((url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const fetchHandle = useCallback((url: string) => {
    const splited = _.split(url, "/");
    return _.findLast(splited, (str) => _.includes(str, "."));
  }, []);

  const fetchPostURI = useCallback((url: string) => {
    const splited = _.split(url, "/");
    return `app.bsky.feed.post/${_.last(splited)}`;
  }, []);

  const fetchQuote = useCallback(
    async (text: string) => {
      const regexp_url = /((https|http)?:\/\/[\w/:%#$&?()~.=+-]+)/g;
      const url = _.first(text.match(regexp_url)) || "";
      if (!isInvalidURL(url) || quote) {
        return;
      }
      const handle = fetchHandle(url);
      if (!handle) {
        return;
      }
      const actorURI = await resolveHandle(handle);
      const postURI = fetchPostURI(url);
      const thread = await getPostThread(`at://${actorURI}/${postURI}`);
      if (AppBskyFeedDefs.isThreadViewPost(thread)) {
        if (AppBskyFeedPost.isRecord(thread.post.record)) {
          const q = { value: { text: thread.post.record.text }, ...thread.post };
          setQuote(q);
        }
      }
    },
    [quote, setQuote, getPostThread, resolveHandle, fetchHandle, fetchPostURI, isInvalidURL]
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
