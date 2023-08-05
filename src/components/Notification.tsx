import _ from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOff";
import ShareIcon from "@mui/icons-material/Share";
import LoopIcon from "@mui/icons-material/Loop";
import { grey, green } from "@mui/material/colors";
import Linkify from "linkify-react";
import Avatar from "@mui/material/Avatar";
import AvatarBadge from "@/components/AvatarBadge";
import DropDownMenu from "@/components/DropDownMenu";
import SocialActions from "@/components/SocialActions";
import usePost from "@/hooks/usePost";
import { AppBskyFeedDefs, AppBskyFeedPost, AppBskyNotificationListNotifications } from "@atproto/api";

type Props = {
  notification: AppBskyNotificationListNotifications.Notification;
  onReply?: (post: AppBskyFeedDefs.PostView) => void;
  reason: "repost" | "like" | "follow" | "reply" | "quote";
};

export const Post = (props: Props) => {
  const navigate = useNavigate();
  const { onShare } = usePost();

  const dateLabel = formatDistanceToNowStrict(Date.parse(props.notification.indexedAt), { locale: ja });

  const onViewProfile = () => {
    const uri = `/profile/${props.notification.author.handle}`;
    navigate(uri);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={1}>
            <AvatarBadge type={props.reason}>
              <Avatar
                sx={{ width: 42, height: 42 }}
                alt={props.notification.author.displayName}
                src={props.notification.author.avatar}
                onClick={onViewProfile}
              />
            </AvatarBadge>
            <Stack direction="column" onClick={onViewProfile}>
              <Typography variant="body2">{props.notification.author.displayName}</Typography>
              <Typography color={grey[500]} variant="caption">
                @{props.notification.author.handle}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography color={grey[500]} variant="caption" noWrap>
              {dateLabel}
            </Typography>
            <DropDownMenu items={[]} size="tiny" />
          </Stack>
        </Stack>
        <Stack sx={{ pt: 1, pb: 1 }} spacing={1}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
            <Linkify>{AppBskyFeedPost.isRecord(props.notification.record) && props.notification.record.text}</Linkify>
          </Typography>
        </Stack>
        <Box sx={{ mb: 1 }}>
          <SocialActions post={props.notification} onReply={props.onReply} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Post;
