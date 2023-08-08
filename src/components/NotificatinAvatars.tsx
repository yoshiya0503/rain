import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import AvatarBadge from "@/components/AvatarBadge";
import { AppBskyActorDefs, AppBskyNotificationListNotifications } from "@atproto/api";

type Props = {
  notification: AppBskyNotificationListNotifications.Notification;
  otherAuthors: AppBskyActorDefs.ProfileView[];
  reason: "repost" | "like" | "follow" | "reply" | "quote";
};

export const NotificationAvatars = (props: Props) => {
  const navigate = useNavigate();

  const onViewProfile = useCallback(() => {
    const uri = `/profile/${props.notification.author.handle}`;
    navigate(uri);
  }, [navigate, props]);

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
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
    </Stack>
  );
};

export default NotificationAvatars;
