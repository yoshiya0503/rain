import { useCallback } from "react";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIconOutline from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderRounded";
import LoopIcon from "@mui/icons-material/LoopRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { pink, green, blue, teal } from "@mui/material/colors";
import { alpha } from "@mui/material";
import usePost from "@/hooks/usePost";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  post: AppBskyFeedDefs.PostView;
  onOpenPost?: (post: AppBskyFeedDefs.PostView, type: "reply" | "quote") => void;
};

export const PostActions = (props: Props) => {
  const { onLike, onDeleteLike, onRepost, onDeleteRepost } = usePost();

  const onReply = useCallback(() => {
    if (props.onOpenPost) {
      props.onOpenPost(props.post, "reply");
    }
  }, [props]);

  const onQuote = useCallback(() => {
    if (props.onOpenPost) {
      props.onOpenPost(props.post, "quote");
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
        sx={{ "&:hover": { color: pink["A200"], backgroundColor: alpha(pink["A200"], 0.1) } }}
        onClick={onToggleLike}
      >
        {props.post.viewer?.like ? (
          <Grow in={!!props.post.viewer?.like} {...(props.post.viewer?.like ? { timeout: 500 } : {})}>
            <FavoriteIcon sx={{ color: pink["A200"] }} fontSize="small" />
          </Grow>
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton
        sx={{ "&:hover": { color: green["A400"], backgroundColor: alpha(green["A400"], 0.1) } }}
        onClick={onToggleRePost}
      >
        {props.post.viewer?.repost ? (
          <Grow in={!!props.post.viewer?.repost} {...(props.post.viewer?.repost ? { timeout: 500 } : {})}>
            <LoopIcon fontSize="small" sx={{ color: green["A400"] }} />
          </Grow>
        ) : (
          <LoopIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton sx={{ "&:hover": { color: blue[400], backgroundColor: alpha(blue[400], 0.1) } }} onClick={onReply}>
        <ChatBubbleIconOutline fontSize="small" />
      </IconButton>
      <IconButton sx={{ "&:hover": { color: teal[400], backgroundColor: alpha(blue[400], 0.1) } }} onClick={onQuote}>
        <FormatQuoteRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default PostActions;
