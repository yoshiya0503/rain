import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyEmbedExternal } from "@atproto/api";

export const useOGP = () => {
  const onUploadBlob = useStore((state) => state.uploadBlob);
  const [article, setArticle] = useState<AppBskyEmbedExternal.ViewExternal>();

  const isInvalidURL = useCallback((url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const fetchOGP = useCallback(
    async (text: string) => {
      const regexp_url = /((https|http)?:\/\/[\w/:%#$&?()~.=+-]+)/g;
      // bsky内部は引用として扱う
      const urls = _.reject(
        text.match(regexp_url),
        (url) => !isInvalidURL(url) || _.includes(url, "https://bsky.app/profile/")
      );
      const url = _.first(urls);
      if (article || !url) return;
      const res = await fetch(`https://cardyb.bsky.app/v1/extract?url=${url.toString()}`);
      const result = await res.json();
      if (!result.error) {
        const article = {
          title: result.title,
          uri: result.url,
          description: result.description,
          thumb: result.image,
        };
        setArticle(article);
      }
    },
    [article, setArticle, isInvalidURL]
  );

  const fetchEmbedExternal = async () => {
    if (!article) {
      return;
    }
    if (!article?.thumb) {
      return { external: { ..._.omit(article, "thumb") }, $type: "app.bsky.embed.external" };
    }
    const res = await fetch(article?.thumb || "");
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const result = await onUploadBlob(new Uint8Array(arrayBuffer));
    const convertArticle = { ...article, thumb: result?.blob };
    return { external: { ...convertArticle }, $type: "app.bsky.embed.external" };
  };

  const onClearArticle = useCallback(() => {
    setArticle(undefined);
  }, [setArticle]);

  return { article, fetchOGP, fetchEmbedExternal, onClearArticle };
};

export default useOGP;
