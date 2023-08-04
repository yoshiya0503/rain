import { ReactNode, Suspense } from "react";
import Container from "@mui/material/Container";
import SideMenu from "@/components/SideMenu";
import MenuTemplate from "@/templates/MenuTemplate";
import Paper from "@mui/material/Paper";

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  return (
    <Container sx={{ display: "flex", p: 2 }}>
      <Suspense fallback={<MenuTemplate />}>
        <Paper component="nav" variant="outlined" sx={{ minWidth: 210, height: 450, borderRadius: 3 }}>
          <SideMenu />
        </Paper>
      </Suspense>
      <Container component="main">{props.children}</Container>
    </Container>
  );
};

export default Layout;
