import { ReactNode, Suspense } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
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
    <Container sx={{ display: "flex", p: 2 }}>
      <Grid container spacing={4}>
        <Grid>
          <Suspense fallback={<MenuTemplate />}>
            <Paper component="nav" variant="outlined" sx={{ minWidth: 210, height: 450, borderRadius: 3 }}>
              <SideMenu />
            </Paper>
          </Suspense>
        </Grid>
        <Grid>
          <Box sx={{ height: "95vh", overflow: "hidden", width: 480 }} component="main">
            {props.children}
          </Box>
        </Grid>
      </Grid>
      <Message />
    </Container>
  );
};

export default Layout;
