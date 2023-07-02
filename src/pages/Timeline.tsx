import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import SideMenu from "@/components/SideMenu";
import Post from "@/components/Post";
import Container from "@mui/material/Container";
import ScrollLayout from "@/components/ScrollLayout";
import CreatePost from "@/components/CreatePost";
import useDialog from "@/hooks/useDialog";

export const TimeLine = () => {
  const actor = useStore((state) => state.actor);
  const feed = useStore((state) => state.feed);
  const session = useStore((state) => state.session);
  const getProfile = useStore((state) => state.getProfile);
  const getTimeline = useStore((state) => state.getTimeline);
  const post = useStore((state) => state.post);

  const [isCreateOpen, openCreateDialog, closeCreateDialog] = useDialog();

  useEffect(() => {
    getProfile(session.did);
    getTimeline();
  }, [getProfile, getTimeline, session]);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <Container sx={{ display: "flex", p: 2 }}>
      <SideMenu
        profile={actor}
        onClickNewPost={() => {
          openCreateDialog();
        }}
      />
      <main>
        <ScrollLayout onScrollLimit={onScrollLimit}>
          {_.map(feed, (item, key) => {
            if (item.reply) {
              return <Post key={key} post={item.reply.root} />;
            }
            return <Post key={key} post={item.post} />;
          })}
        </ScrollLayout>
      </main>
      <CreatePost title="send post" open={isCreateOpen} onClose={closeCreateDialog} onPost={post} />
    </Container>
  );
};

export default TimeLine;
