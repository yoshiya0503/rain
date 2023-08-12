import _ from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuteIcon from "@mui/icons-material/VolumeOff";
import ShareIcon from "@mui/icons-material/Share";
import { grey } from "@mui/material/colors";
import Linkify from "linkify-react";
import NotificationAvatars from "@/components/NotificationAvatars";
import NotificationImages from "@/components/NotificationImages";
import ProfileHeader from "@/components/ProfileHeader";
import DropDownMenu from "@/components/DropDownMenu";
import PostActions from "@/components/PostActions";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostQuote from "@/components/PostQuote";
import PostFeed from "@/components/PostFeed";
import usePost from "@/hooks/usePost";
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyFeedPost, AppBskyNotificationListNotifications } from "@atproto/api";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  notification: AppBskyNotificationListNotifications.Notification;
  otherAuthors: AppBskyActorDefs.ProfileView[];
  reason: "repost" | "like" | "follow" | "reply" | "quote" | "mention";
  onReply?: (post: AppBskyFeedDefs.PostView) => void;
  reasonSubject?: AppBskyFeedDefs.PostView;
  reasonReply?: AppBskyFeedDefs.PostView;
};

export const Post = (props: Props) => {
  const { onShare } = usePost();

  const menuItems = [
    {
      name: "share",
      label: "Share",
      icon: <ShareIcon />,
      action: () => {
        onShare(props.notification);
      },
    },
    {
      name: "mute",
      label: "Mute Thread",
      icon: <MuteIcon />,
      action: () => {
        console.log("mute");
      },
    },
  ];

  const dateLabel = formatDistanceToNowStrict(Date.parse(props.notification.indexedAt), { locale: ja });
  const multiAuthorMessage = 1 <= _.size(props.otherAuthors) ? `他${_.size(props.otherAuthors)}人 ` : "";
  const message = `${props.notification.author.handle} ${multiAuthorMessage}が${props.reason}しました`;

  return (
    <Stack direction="row" spacing={1}>
      <Divider
        sx={{ bgcolor: "primary.main", borderRightWidth: 1.5, mb: 2 }}
        orientation="vertical"
        flexItem
        hidden={props.notification.isRead}
      />
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <NotificationAvatars
              notification={props.notification}
              otherAuthors={props.otherAuthors}
              reason={props.reason}
            />
            {AppBskyFeedPost.isRecord(props.notification.record) && (
              <ProfileHeader profile={props.notification.author} disableAvatar />
            )}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography color={grey[500]} variant="caption" noWrap>
              {dateLabel}
            </Typography>
            {(props.reason === "reply" || props.reason === "quote") && <DropDownMenu items={menuItems} size="tiny" />}
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
              {AppBskyEmbedImages.isView(props.reasonSubject?.embed) && (
                <NotificationImages images={props.reasonSubject?.embed?.images || []} />
              )}
            </Typography>
          )}
        </Stack>
        {(props.reason === "reply" || props.reason === "quote") && props.reasonReply && (
          <Box sx={{ mb: 1 }}>
            <PostActions post={props.reasonReply} onReply={props.onReply} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Post;
