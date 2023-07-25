import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIconOutline from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoopIcon from "@mui/icons-material/Loop";
import { pink, green } from "@mui/material/colors";
import usePost from "@/hooks/usePost";
import { PostView } from "@/stores/feed";

type Props = {
  post: PostView;
};

export const SocialActions = (props: Props) => {
  const { onLike, onDeleteLike, onRepost, onDeleteRepost } = usePost();

  const onReply = () => {
    console.log("reply");
  };

  const onToggleLike = () => {
    return props.post.viewer?.like ? onDeleteLike(props.post) : onLike(props.post);
  };

  const onToggleRePost = () => {
    return props.post.viewer?.repost ? onDeleteRepost(props.post) : onRepost(props.post);
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton onClick={onToggleLike}>
        {props.post.viewer?.like ? (
          <Grow in={!!props.post.viewer?.like} {...(props.post.viewer?.like ? { timeout: 1000 } : {})}>
            <FavoriteIcon sx={{ color: pink[400] }} fontSize="small" />
          </Grow>
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton onClick={onToggleRePost}>
        {props.post.viewer?.repost ? (
          <Grow in={!!props.post.viewer?.repost} {...(props.post.viewer?.repost ? { timeout: 1000 } : {})}>
            <LoopIcon fontSize="small" sx={{ color: green[400] }} />
          </Grow>
        ) : (
          <LoopIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton onClick={onReply}>
        <ChatBubbleIconOutline fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SocialActions;
