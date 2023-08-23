import { ReactNode, Suspense } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import SideMenu from "@/components/SideMenu";
import MenuTemplate from "@/templates/MenuTemplate";
import Paper from "@mui/material/Paper";
import Message from "@/components/Message";

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  return (
    <Container sx={{ p: 2 }}>
      <Grid container spacing={4}>
        <Grid>
          <Suspense fallback={<MenuTemplate />}>
            <Paper
              component="nav"
              variant="outlined"
              sx={{ minWidth: 210, maxWidth: 240, height: 450, borderRadius: 3 }}
            >
              <SideMenu />
            </Paper>
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

export default Layout;
