import _ from "lodash";
import { AppBskyActorDefs } from "@atproto/api";
import SideMenu from "@/components/SideMenu";
import Container from "@mui/material/Container";
//import Box from "@mui/material/Box";
//import Typography from "@mui/material/Typography";

type Props = {
  feed: string[];
  actor?: AppBskyActorDefs.ProfileViewDetailed;
};

export const TimeLine = (props: Props) => {
  return (
    <Container sx={{ display: "flex", p: 2 }}>
      <SideMenu
        profile={props.actor}
        onClickNewPost={() => {
          return;
        }}
      />
      <main>
        <Container>
          {_.map(props.feed, (_, key) => (
            <div key={key}>post</div>
          ))}
        </Container>
      </main>
    </Container>
  );
};

export default TimeLine;
