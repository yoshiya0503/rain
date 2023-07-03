import { ReactNode } from "react";
import Container from "@mui/material/Container";
import { AppBskyFeedPost } from "@atproto/api";
import CreatePost from "@/components/CreatePost";
import SideMenu from "@/components/SideMenu";
import { useStore } from "@/stores";
import useDialog from "@/hooks/useDialog";

type Props = {
  children: ReactNode;
  onPost: (record: AppBskyFeedPost.Record) => void;
};

export const Layout = (props: Props) => {
  const actor = useStore((state) => state.actor);
  const [isCreateOpen, openCreateDialog, closeCreateDialog] = useDialog();

  return (
    <Container sx={{ display: "flex", p: 2 }}>
      <SideMenu
        profile={actor}
        onClickNewPost={() => {
          openCreateDialog();
        }}
      />
      <main>{props.children}</main>
      <CreatePost title="send post" open={isCreateOpen} onClose={closeCreateDialog} onPost={props.onPost} />
    </Container>
  );
};

export default Layout;
