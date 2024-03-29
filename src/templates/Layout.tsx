import _ from "lodash";
import { ReactNode, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import BottomMenu from "@/components/BottomMenu";
import SideMenu from "@/components/SideMenu";
import SideBar from "@/components/SideBar";
import Message from "@/components/Message";
import MenuTemplate from "@/templates/MenuTemplate";
import SideBarTemplate from "@/templates/SideBarTemplate";
import HeaderMenu from "@/components/HeaderMenu";
import NotificationsContainer from "@/containers/NotificationsContainer";
import FeedsContainer from "@/containers/FeedsContainer";
import useQuery from "@/hooks/useQuery";

type Props = {
  children: ReactNode;
};

/*
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
*/

export const Layout = (props: Props) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const isHistory = _.includes(location.pathname, "profile/");
  const isSearch = location.pathname === "/search" || location.pathname === "/feeds";

  if (isPhone) {
    return (
      <Box>
        <HeaderMenu menu={!isHistory} history={isHistory} search={isSearch} />
        <Stack sx={{ maxWidth: 480, height: "100vh" }} component="main">
          {props.children}
        </Stack>
        <BottomMenu />
      </Box>
    );
  }

  // TODO search 履歴を含めたヘッダ
  return (
    <Container sx={{ p: 2 }}>
      <Grid container spacing={4}>
        <Grid>
          <Suspense fallback={<MenuTemplate />}>
            <SideMenu type="paper" />
          </Suspense>
        </Grid>
        <Grid>
          <Stack sx={{ maxWidth: 480, width: "100vw", height: "95vh" }} component="main">
            {props.children}
          </Stack>
        </Grid>
        <Grid>
          <Suspense fallback={<SideBarTemplate />}>
            <SideBar />
          </Suspense>
        </Grid>
      </Grid>
      <Message />
    </Container>
  );
};

export default Layout;
