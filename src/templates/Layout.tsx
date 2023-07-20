import { ReactNode, useEffect } from "react";
import Container from "@mui/material/Container";
import { AppBskyFeedPost } from "@atproto/api";
import CreatePost from "@/components/CreatePost";
import SideMenu from "@/components/SideMenu";
import SkeletonUI from "@/components/SkeletonUI";
import { useStore } from "@/stores";
import useDialog from "@/hooks/useDialog";

type Props = {
  children: ReactNode;
  onPost: (record: AppBskyFeedPost.Record) => void;
};

export const Layout = (props: Props) => {
  const me = useStore((state) => state.me);
  const getMe = useStore((state) => state.getMe);
  const [isCreateOpen, openCreateDialog, closeCreateDialog] = useDialog();

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <Container sx={{ display: "flex", p: 2 }}>
      {me ? (
        <SideMenu
          profile={me}
          onClickNewPost={() => {
            openCreateDialog();
          }}
        />
      ) : (
        <SkeletonUI type="menu" />
      )}
      <Container component="main">{props.children}</Container>
      <CreatePost title="send post" open={isCreateOpen} onClose={closeCreateDialog} onPost={props.onPost} />
    </Container>
  );
};

export default Layout;
