import _ from "lodash";
import { useEffect } from "react";
import { useStore } from "@/stores";
import SideMenu from "@/components/SideMenu";
import Post from "@/components/Post";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const TimeLine = () => {
  const actor = useStore((state) => state.actor);
  const feed = useStore((state) => state.feed);
  const session = useStore((state) => state.session);
  const getProfile = useStore((state) => state.getProfile);
  const getTimeline = useStore((state) => state.getTimeline);

  useEffect(() => {
    getProfile(session.did);
    getTimeline();
  }, [getProfile, getTimeline, session]);

  console.log(feed);

  return (
    <Container sx={{ display: "flex", p: 2 }}>
      <SideMenu
        profile={actor}
        onClickNewPost={() => {
          return;
        }}
      />
      <main>
        <Container>
          {_.map(feed, (post, key) => (
            <Post key={key} post={post} />
          ))}
        </Container>
      </main>
    </Container>
  );
};

export default TimeLine;
