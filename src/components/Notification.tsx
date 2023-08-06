import _ from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOff";
import ShareIcon from "@mui/icons-material/Share";
import { grey } from "@mui/material/colors";
import Linkify from "linkify-react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import AvatarBadge from "@/components/AvatarBadge";
import DropDownMenu from "@/components/DropDownMenu";
import SocialActions from "@/components/SocialActions";
import usePost from "@/hooks/usePost";
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyFeedPost, AppBskyNotificationListNotifications } from "@atproto/api";

type Props = {
  notification: AppBskyNotificationListNotifications.Notification;
  otherAuthors: AppBskyActorDefs.ProfileView[];
  reason: "repost" | "like" | "follow" | "reply" | "quote";
  onReply?: (post: AppBskyFeedDefs.PostView) => void;
  reasonSubject?: AppBskyFeedDefs.PostView;
  reasonReply?: AppBskyFeedDefs.PostView;
};

export const Post = (props: Props) => {
  const navigate = useNavigate();
  const { onShare } = usePost();

  const dateLabel = formatDistanceToNowStrict(Date.parse(props.notification.indexedAt), { locale: ja });

  const onViewProfile = () => {
    const uri = `/profile/${props.notification.author.handle}`;
    navigate(uri);
  };

  const multiAuthorMessage = 1 <= _.size(props.otherAuthors) ? `他${_.size(props.otherAuthors)}人 ` : "";
  const message = `${props.notification.author.handle} ${multiAuthorMessage}が${props.reason}しました`;

  return (
    <Stack direction="row" spacing={1}>
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={1}>
            <AvatarBadge type={props.reason}>
              <Avatar
                sx={{ width: 42, height: 42 }}
                alt={props.notification.author.displayName}
                src={props.notification.author.avatar}
                onClick={onViewProfile}
              />
            </AvatarBadge>
            <Stack alignSelf="flex-end">
              <AvatarGroup max={5}>
                {_.map(props.otherAuthors, (author, key) => (
                  <Avatar key={key} alt={author.displayName} src={author.avatar} sx={{ width: 24, height: 24 }} />
                ))}
              </AvatarGroup>
            </Stack>
            {AppBskyFeedPost.isRecord(props.notification.record) && (
              <Stack direction="column" onClick={onViewProfile}>
                <Typography variant="body2">{props.notification.author.displayName}</Typography>
                <Typography color={grey[500]} variant="caption">
                  @{props.notification.author.handle}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography color={grey[500]} variant="caption" noWrap>
              {dateLabel}
            </Typography>
            {(props.reason === "reply" || props.reason === "quote") && <DropDownMenu items={[]} size="tiny" />}
          </Stack>
        </Stack>
        {props.reason !== "reply" && props.reason !== "quote" && (
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
            {message}
          </Typography>
        )}
        <Stack sx={{ pt: 1, pb: 1 }} spacing={1}>
          {AppBskyFeedPost.isRecord(props.notification.record) ? (
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
              <Linkify>{AppBskyFeedPost.isRecord(props.notification.record) && props.notification.record.text}</Linkify>
            </Typography>
          ) : (
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption" color={grey[400]}>
              <Linkify>
                {AppBskyFeedPost.isRecord(props.reasonSubject?.record) && props.reasonSubject?.record.text}
              </Linkify>
            </Typography>
          )}
        </Stack>
        {(props.reason === "reply" || props.reason === "quote") && props.reasonReply && (
          <Box sx={{ mb: 1 }}>
            <SocialActions post={props.reasonReply} onReply={props.onReply} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Post;
