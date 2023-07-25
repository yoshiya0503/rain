import { ReactNode, Suspense } from "react";
import Container from "@mui/material/Container";
import SideMenu from "@/components/SideMenu";
import MenuSkeleton from "@/templates/MenuSkeleton";

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  return (
    <Container sx={{ display: "flex", p: 2 }}>
      <Suspense fallback={<MenuSkeleton />}>
        <SideMenu />
      </Suspense>
      <Container component="main">{props.children}</Container>
    </Container>
  );
};

export default Layout;
