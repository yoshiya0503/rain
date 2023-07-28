import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyEmbedExternal } from "@atproto/api";

export const useOGP = () => {
  const onUploadBlob = useStore((state) => state.uploadBlob);
  const [article, setArticle] = useState<AppBskyEmbedExternal.ViewExternal>();

  const fetchOGP = useCallback(
    async (text: string) => {
      const regexp_url = /((https|http)?:\/\/[\w/:%#$&?()~.=+-]+)/g;
      const urls = text.match(regexp_url);
      const url = new URL(_.first(urls) || "");
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
    [setArticle]
  );

  const fetchEmbed = async () => {
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

  return { article, fetchOGP, fetchEmbed };
};

export default useOGP;
