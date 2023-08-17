import _ from "lodash";
import { RichText } from "@atproto/api";
import { useState, useCallback } from "react";
import agent from "@/agent";

export const useRichText = () => {
  const [text, setText] = useState<string>("");
  const [rt, setRT] = useState<RichText>();

  const fetchFacets = useCallback(async () => {
    await rt?.detectFacets(agent);
    setRT(rt);
    /*
    for (const seg of rt.segments()) {
      console.log(seg);
    }
    */
  }, [rt, setRT]);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const rt = new RichText({ text: e.currentTarget.value });
      setText(rt.text);
      setRT(rt);
    },
    [setText, setRT]
  );

  const link = useCallback(
    (type: "ogp" | "quote") => {
      for (const f of rt?.facets || []) {
        if (f.features[0].uri) {
          if (type === "ogp" && !_.includes(f.features[0].uri.toString(), "https://bsky.app/profile/")) {
            return f.features[0].uri.toString();
          }
          if (type === "quote" && _.includes(f.features[0].uri.toString(), "https://bsky.app/profile/")) {
            return f.features[0].uri.toString();
          }
        }
      }
      return "";
    },
    [rt]
  );

  const mention = useCallback(() => {
    for (const f of rt?.facets || []) {
      if (f.features[0].did) return f.features[0].did.toString();
    }
    return "";
  }, [rt]);

  const facets = useCallback(() => {
    return rt?.facets;
  }, [rt]);

  const onClearText = useCallback(() => {
    setRT(undefined);
    setText("");
  }, [setRT, setText]);

  return { text, facets, fetchFacets, mention, link, onChange, onClearText };
};

export default useRichText;
