import { ReactNode, Suspense } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import SideMenu from "@/components/SideMenu";
import MenuTemplate from "@/templates/MenuTemplate";
import Message from "@/components/Message";
import NotificationsContainer from "@/containers/NotificationsContainer";
import FeedsContainer from "@/containers/FeedsContainer";
import useQuery from "@/hooks/useQuery";

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  const query = useQuery();
  const keyword = query.get("q") || "";

  return (
    <Container sx={{ p: 2 }} maxWidth={false}>
      <Grid container spacing={4}>
        <Grid>
          <Suspense fallback={<MenuTemplate />}>
            <SideMenu type="drawer" />
          </Suspense>
        </Grid>
        <Grid>
          <Stack sx={{ width: 420, minWidth: 420, height: "95vh" }} component="main">
            {props.children}
          </Stack>
        </Grid>
        <Grid>
          <Stack sx={{ width: 420, minWidth: 420, height: "95vh" }} component="main">
            <FeedsContainer keyword={keyword} />
          </Stack>
        </Grid>
        <Grid>
          <Stack sx={{ width: 420, minWidth: 420, height: "95vh" }} component="main">
            <NotificationsContainer />
          </Stack>
        </Grid>
      </Grid>
      <Message />
    </Container>
  );
};

/*
export const Layout = (props: Props) => {
  return (
    <Container sx={{ p: 2 }}>
      <Grid container spacing={4}>
        <Grid>
          <Suspense fallback={<MenuTemplate />}>
            <SideMenu type="paper" />
          </Suspense>
        </Grid>
        <Grid>
          <Stack sx={{ width: 480, minWidth: 480, height: "95vh" }} component="main">
            {props.children}
          </Stack>
        </Grid>
      </Grid>
      <Message />
    </Container>
  );
};
*/

export default Layout;
