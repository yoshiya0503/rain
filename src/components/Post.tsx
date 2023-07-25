import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOff";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import Linkify from "linkify-react";
import DropDownMenu from "@/components/DropDownMenu";
import SocialActions from "@/components/SocialActions";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import usePost from "@/hooks/usePost";
import { PostView } from "@/stores/feed";

type Props = {
  post: PostView;
};

export const Post = (props: Props) => {
  const navigate = useNavigate();
  const { onDeletePost, onShare } = usePost();
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
      {props.post.embed?.images ? <PostImages images={props.post.embed?.images} /> : null}
      {props.post.embed?.external ? <PostArticle article={props.post.embed?.external} /> : null}
      <CardActions>
        <SocialActions post={props.post} />
      </CardActions>
      <Divider />
    </Box>
  );
};

export default Post;
