import _ from "lodash";
import { useCallback, memo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuteIcon from "@mui/icons-material/VolumeOff";
import ShareIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/ReportRounded";
import { grey } from "@mui/material/colors";
import NotificationAvatars from "@/components/NotificationAvatars";
import NotificationImages from "@/components/NotificationImages";
import ProfileHeader from "@/components/ProfileHeader";
import DropDownMenu from "@/components/DropDownMenu";
import PostActions from "@/components/PostActions";
import Attachments from "@/components/Attachments";
import Text from "@/components/Text";
import usePost from "@/hooks/usePost";
import useLocale from "@/hooks/useLocale";
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyFeedPost, AppBskyNotificationListNotifications } from "@atproto/api";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  notification: AppBskyNotificationListNotifications.Notification;
  otherAuthors: AppBskyActorDefs.ProfileView[];
  onOpenPost?: (post: AppBskyFeedDefs.PostView, type: "reply" | "quote") => void;
  onOpenImage?: (images: AppBskyEmbedImages.ViewImage[]) => void;
  onOpenReport?: (post: AppBskyFeedDefs.PostView) => void;
  reasonSubject?: AppBskyFeedDefs.PostView;
  reasonReply?: AppBskyFeedDefs.PostView;
};

export const Notification = memo((props: Props) => {
  const { onShare, onViewThread } = usePost();
  const { fromNow } = useLocale();
  // TODO フォローしてきた人のミニアバターを詳細にして出すとかいいかもしれない

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
    {
      name: "report",
      icon: <ReportIcon />,
      label: "Report",
      action: () => {
        props.onOpenReport && props.reasonReply && props.onOpenReport(props.reasonReply);
      },
    },
  ];

  const multiAuthorMessage = 1 <= _.size(props.otherAuthors) ? `他${_.size(props.otherAuthors)}人 ` : "";
  const message = `${props.notification.author.handle} ${multiAuthorMessage}が${props.notification.reason}しました`;

  const onViewReason = useCallback(() => {
    if (props.reasonReply) return onViewThread(props.reasonReply)();
    if (props.reasonSubject) return onViewThread(props.reasonSubject)();
  }, [onViewThread, props.reasonSubject, props.reasonReply]);

  return (
    <Stack sx={{ pr: 1, pl: 1 }} direction="row" spacing={1} onClick={onViewReason}>
      <Divider
        sx={{ bgcolor: "primary.main", borderRightWidth: 1.5, mb: 2 }}
        orientation="vertical"
        flexItem
        hidden={props.notification.isRead}
      />
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <NotificationAvatars notification={props.notification} otherAuthors={props.otherAuthors} />
            {AppBskyFeedPost.isRecord(props.notification.record) && (
              <ProfileHeader profile={props.notification.author} disableAvatar />
            )}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography color={grey[500]} variant="caption" noWrap>
              {fromNow(props.notification.indexedAt)}
            </Typography>
            {_.includes(["reply", "quote", "mention"], props.notification.reason) && <DropDownMenu items={menuItems} />}
          </Stack>
        </Stack>
        {!_.includes(["reply", "quote", "mention"], props.notification.reason) && (
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
            {message}
          </Typography>
        )}
        <Stack sx={{ pt: 1, pb: 1 }} spacing={1}>
          {props.reasonReply ? (
            <>
              <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
                <Text>{AppBskyFeedPost.isRecord(props.reasonReply?.record) && props.reasonReply?.record.text}</Text>
              </Typography>
              <Attachments embed={props.reasonReply.embed} onOpenImage={props.onOpenImage} />
            </>
          ) : (
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption" color={grey[400]}>
              <Text>{AppBskyFeedPost.isRecord(props.reasonSubject?.record) && props.reasonSubject?.record.text}</Text>
              {AppBskyEmbedImages.isView(props.reasonSubject?.embed) && props.reasonSubject?.embed?.images && (
                <NotificationImages images={props.reasonSubject?.embed?.images} />
              )}
            </Typography>
          )}
        </Stack>
        {_.includes(["reply", "mention", "quote"], props.notification.reason) && props.reasonReply && (
          <Box
            sx={{ mb: 1 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <PostActions post={props.reasonReply} onOpenPost={props.onOpenPost} />
          </Box>
        )}
      </Box>
    </Stack>
  );
});

export default Notification;
