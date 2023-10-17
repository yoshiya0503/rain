import { ReactNode } from "react";
import HeaderMenu from "@/components/HeaderMenu";

type Props = {
  children: ReactNode;
  search?: boolean;
  history?: boolean;
  menu?: boolean;
};

export const HeaderLayout = (props: Props) => {
  return (
    <>
      <HeaderMenu menu={props.menu || false} search={props.search || false} history={props.history || false} />
      {props.children}
    </>
  );
};

export default HeaderLayout;
