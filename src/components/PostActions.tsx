import { useCallback } from "react";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIconOutline from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderRounded";
import LoopIcon from "@mui/icons-material/LoopRounded";
import { pink, green, blue } from "@mui/material/colors";
import { alpha } from "@mui/material";
import usePost from "@/hooks/usePost";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  post: AppBskyFeedDefs.PostView;
  onReply?: (post: AppBskyFeedDefs.PostView) => void;
};

export const PostActions = (props: Props) => {
  const { onLike, onDeleteLike, onRepost, onDeleteRepost } = usePost();

  const onReply = useCallback(() => {
    if (props.onReply) {
      props.onReply(props.post);
    }
  }, [props]);

  const onToggleLike = useCallback(() => {
    return props.post.viewer?.like ? onDeleteLike(props.post) : onLike(props.post);
  }, [props.post, onDeleteLike, onLike]);

  const onToggleRePost = useCallback(() => {
    return props.post.viewer?.repost ? onDeleteRepost(props.post) : onRepost(props.post);
  }, [props.post, onDeleteRepost, onRepost]);

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        sx={{ "&:hover": { color: pink[400], backgroundColor: alpha(pink[400], 0.1) } }}
        onClick={onToggleLike}
      >
        {props.post.viewer?.like ? (
          <Grow in={!!props.post.viewer?.like} {...(props.post.viewer?.like ? { timeout: 1000 } : {})}>
            <FavoriteIcon sx={{ color: pink[400] }} fontSize="small" />
          </Grow>
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton
        sx={{ "&:hover": { color: green[400], backgroundColor: alpha(green[400], 0.1) } }}
        onClick={onToggleRePost}
      >
        {props.post.viewer?.repost ? (
          <Grow in={!!props.post.viewer?.repost} {...(props.post.viewer?.repost ? { timeout: 1000 } : {})}>
            <LoopIcon fontSize="small" sx={{ color: green[400] }} />
          </Grow>
        ) : (
          <LoopIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton sx={{ "&:hover": { color: blue[400], backgroundColor: alpha(blue[400], 0.1) } }} onClick={onReply}>
        <ChatBubbleIconOutline fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default PostActions;
