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
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  post: AppBskyFeedDefs.FeedViewPost;
};

export const Post = (props: Props) => {
  return (
    <Card sx={{ m: 1, maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={props.post.reply?.root?.author.avatar} />}
        title={props.post.reply?.root?.author.displayName}
        subheader={props.post.reply?.root?.author.handle}
      />
      <CardContent>{props.post.reply?.root?.record.text}</CardContent>
      <CardActions>
        <ChatBubbleIcon />
        <LoopIcon />
        <FavoriteIcon />
      </CardActions>
    </Card>
  );
  return <div>{props.post.reply?.parent?.author.displayName}</div>;
  //return <div>{props.post.post?.author.displayName}</div>;
  //return <div>{props.post.reply?.root?.author.displayName}</div>;
};

export default Post;
