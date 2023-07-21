import Grow from "@mui/material/Grow";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatBubbleIconOutline from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoopIcon from "@mui/icons-material/Loop";
import { pink, green, blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Linkify from "linkify-react";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

type Post = AppBskyFeedDefs.PostView & {
  record?: AppBskyFeedPost.Record;
};

type Props = {
  post: Post;
  onLike?: (post: Post) => void;
  onDeleteLike?: (post: Post) => void;
  onRepost?: (post: Post) => void;
  onDeleteRepost?: (post: Post) => void;
};

export const Post = (props: Props) => {
  const navigate = useNavigate();

  const onRepost = () => {
    if (props.onRepost) {
      props.onRepost(props.post);
    }
  };

  const onDeleteRepost = () => {
    if (props.onDeleteRepost) {
      props.onDeleteRepost(props.post);
    }
  };

  const onLike = () => {
    if (props.onLike) {
      props.onLike(props.post);
    }
  };

  const onDeleteLike = () => {
    if (props.onDeleteLike) {
      props.onDeleteLike(props.post);
    }
  };

  const onViewProfile = (href: string) => () => {
    navigate(href);
  };

  return (
    <Box sx={{ maxWidth: 480 }}>
      <CardHeader
        avatar={<Avatar src={props.post.author.avatar} />}
        title={props.post.author.displayName}
        subheader={props.post.author.handle}
        onClick={onViewProfile(`/profile/${props.post.author.handle}`)}
      />
      <CardContent>
        <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
          <Linkify>{props.post.record.text}</Linkify>
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={props.post.viewer?.like ? onDeleteLike : onLike}>
            {props.post.viewer?.like ? (
              <Grow in={!!props.post.viewer?.like} {...(props.post.viewer?.like ? { timeout: 1000 } : {})}>
                <FavoriteIcon sx={{ color: pink[400] }} fontSize="small" />
              </Grow>
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton onClick={props.post.viewer?.repost ? onDeleteRepost : onRepost}>
            {props.post.viewer?.repost ? (
              <Grow in={!!props.post.viewer?.repost} {...(props.post.viewer?.repost ? { timeout: 1000 } : {})}>
                <LoopIcon fontSize="small" sx={{ color: green[400] }} />
              </Grow>
            ) : (
              <LoopIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton onClick={props.post.viewer?.like ? onDeleteLike : onLike}>
            <ChatBubbleIconOutline fontSize="small" />
          </IconButton>
        </Stack>
      </CardActions>
      <Divider />
    </Box>
  );
};

export default Post;
