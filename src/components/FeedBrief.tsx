import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import ProfileHeader from "@/components/ProfileHeader";
import Text from "@/components/Text";
import Attachments from "@/components/Attachments";
import useLocale from "@/hooks/useLocale";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

type Props = {
  brief: AppBskyFeedDefs.PostView;
};

export const FeedBrief = (props: Props) => {
  const { fromNow } = useLocale();
  return (
    <Stack sx={{ mt: 1, mb: 1 }} spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <ProfileHeader profile={props.brief.author} size="small" />
        <Typography color={grey[500]} variant="caption">
          {fromNow(props.brief.indexedAt)}
        </Typography>
      </Stack>
      <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
        <Text>{AppBskyFeedPost.isRecord(props.brief.record) && props.brief.record.text}</Text>
      </Typography>
      <Attachments embed={props.brief.embed} />
    </Stack>
  );
};

export default FeedBrief;
