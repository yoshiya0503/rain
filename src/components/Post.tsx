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
import MuteIcon from "@mui/icons-material/VolumeOff";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import { pink, green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Linkify from "linkify-react";
import DropDownMenu from "@/components/DropDownMenu";
import usePost from "@/hooks/usePost";
import { PostView } from "@/stores/feed";

type Props = {
  post: PostView;
};

export const Post = (props: Props) => {
  const navigate = useNavigate();
  const { onDeletePost, onLike, onDeleteLike, onRepost, onDeleteRepost, onShare } = usePost();
  const menuItems = [
    {
      name: "share",
      label: "Share",
      icon: <ShareIcon />,
      action: () => {
        onShare(props.post);
      },
    },
    {
      name: "mute",
      label: props.post?.viewer?.muted ? "Unmute" : "Mute",
      icon: <MuteIcon />,
      action: () => {
        console.log("mute");
      },
    },
    {
      name: "delete",
      label: "Delete Post",
      icon: <DeleteIcon />,
      action: () => {
        onDeletePost(props.post);
      },
    },
  ];

  const onToggleLike = () => {
    return props.post.viewer?.like ? onDeleteLike(props.post) : onLike(props.post);
  };

  const onToggleRePost = () => {
    return props.post.viewer?.repost ? onDeleteRepost(props.post) : onRepost(props.post);
  };

  const onReply = () => {
    console.log("reply");
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
        action={<DropDownMenu items={menuItems} />}
        onClick={onViewProfile(`/profile/${props.post.author.handle}`)}
      />
      <CardContent>
        <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
          <Linkify>{props.post.record.text}</Linkify>
        </Typography>
      </CardContent>
      <CardActions>
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
      </CardActions>
      <Divider />
    </Box>
  );
};

export default Post;
