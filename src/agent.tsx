import { BskyAgent } from "@atproto/api";

// TODO 画面のチラつきが起きる
// セッションの管理の仕方が微妙
export const agent = new BskyAgent({
  service: "https://bsky.social",
});

const session = {
  refreshJwt: localStorage.getItem("X-SKYLINE-REFRESHJWT") || "",
  accessJwt: localStorage.getItem("X-SKYLINE-ACCESSJWT") || "",
  did: localStorage.getItem("X-SKYLINE-DID") || "",
  email: localStorage.getItem("X-SKYLINE-EMAIL") || "",
  handle: localStorage.getItem("X-SKYLINE-HANDLE") || "",
};

if (session.accessJwt && session.refreshJwt) {
  try {
    await agent.resumeSession(session);
  } catch (e) {
    localStorage.removeItem("X-SKYLINE-ACCESSJWT");
    localStorage.removeItem("X-SKYLINE-REFRESHJWT");
  }
}

export default agent;
