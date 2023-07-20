import _ from "lodash";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatBubbleIconOutline from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
    <Box sx={{ maxWidth: 480 }}>
      <CardHeader
        avatar={<Avatar src={props.post.author.avatar} />}
        title={props.post.author.displayName}
        subheader={props.post.author.handle}
      />
      <CardContent>
        <Typography variant="body2">{props.post.record.text}</Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <FavoriteBorderIcon fontSize="small" />
          <LoopIcon fontSize="small" />
          <ChatBubbleIconOutline fontSize="small" />
        </Stack>
      </CardActions>
      <Divider />
    </Box>
  );
};

export default Post;
