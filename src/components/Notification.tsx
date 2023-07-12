import _ from "lodash";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import { AppBskyNotificationListNotifications } from "@atproto/api";

type Props = {
  notification: AppBskyNotificationListNotifications.Notification;
};

export const Post = (props: Props) => {
  return (
    <Card sx={{ m: 1, maxWidth: 480 }}>
      <CardHeader
        avatar={<Avatar src={props.notification.author.avatar} />}
        title={props.notification.author.displayName}
        subheader={props.notification.author.handle}
      />
      <CardContent>
        <Typography variant="body2">{props.notification.record.text}</Typography>
      </CardContent>
      <CardActions>
        <ChatBubbleIcon />
        <LoopIcon />
        <FavoriteIcon />
      </CardActions>
    </Card>
  );
};

export default Post;
