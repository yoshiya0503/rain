import { BskyAgent, AtpSessionEvent, AtpSessionData } from "@atproto/api";

export const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (_?: AtpSessionEvent, session?: AtpSessionData) => {
    localStorage.setItem("X-SKYLINE-REFRESHJWT", session?.refreshJwt || "");
    localStorage.setItem("X-SKYLINE-ACCESSJWT", session?.accessJwt || "");
  },
});

export default agent;
