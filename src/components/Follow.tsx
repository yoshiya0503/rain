import _ from "lodash";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProfileHeader from "@/components/ProfileHeader";
import useSocial from "@/hooks/useSocial";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  profile: AppBskyActorDefs.ProfileView;
};

export const Follow = (props: Props) => {
  const bio = _.chain(props.profile.description).split("\n").take(2).join(" ").value();
  return (
    <Stack spacing={1}>
      <ProfileHeader profile={props.profile} />
      <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
        {_.truncate(bio, { length: 100 })}
      </Typography>
    </Stack>
  );
};

export default Follow;
