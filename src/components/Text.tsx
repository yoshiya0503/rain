import _ from "lodash";
import { ReactNode, Attributes } from "react";
import Linkify from "linkify-react";
import Link from "@mui/material/Link";

type Props = {
  children: ReactNode;
};

type RenderProps = {
  attributes: Attributes;
  content: ReactNode;
};

export const Text = (props: Props) => {
  const render = ({ attributes, content }: RenderProps) => {
    return (
      <Link underline="hover" href={_.get(attributes, "href")} {...attributes}>
        {content}
      </Link>
    );
  };
  return <Linkify options={{ render }}>{props.children}</Linkify>;
};

export default Text;
