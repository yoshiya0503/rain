import _ from "lodash";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

type Post = AppBskyFeedDefs.PostView & {
  record?: AppBskyFeedPost.Record;
};

type Props = {
  post: Post;
};

export const Post = (props: Props) => {
  return (
    <Card sx={{ m: 1, maxWidth: 480 }}>
      <CardHeader
        avatar={<Avatar src={props.post.author.avatar} />}
        title={props.post.author.displayName}
        subheader={props.post.author.handle}
      />
      <CardContent>{props.post.record.text}</CardContent>
      <CardActions>
        <ChatBubbleIcon />
        <LoopIcon />
        <FavoriteIcon />
      </CardActions>
    </Card>
  );
};

export default Post;
