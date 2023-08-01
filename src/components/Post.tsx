import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOff";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import LoopIcon from "@mui/icons-material/Loop";
import { grey } from "@mui/material/colors";
import Linkify from "linkify-react";
import Avatar from "@mui/material/Avatar";
import DropDownMenu from "@/components/DropDownMenu";
import SocialActions from "@/components/SocialActions";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostQuote from "@/components/PostQuote";
import PostFeed from "@/components/PostFeed";
import usePost from "@/hooks/usePost";
import { PostView } from "@/stores/feed";
import {
  AppBskyFeedDefs,
  AppBskyFeedPost,
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from "@atproto/api";

type Props = {
  post: PostView;
  reason?: AppBskyFeedDefs.ReasonRepost | { [k: string]: unknown; $type: string };
  hasReply?: boolean;
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

  const dateLabel = formatDistanceToNowStrict(Date.parse(props.post.indexedAt), { locale: ja });

  const onViewProfile = () => {
    const uri = `/profile/${props.post.author.handle}`;
    navigate(uri);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Box>
          <Stack sx={{ height: "100%" }} alignItems="center">
            <Avatar
              sx={{ width: 42, height: 42 }}
              alt={props.post.author.displayName}
              src={props.post.author.avatar}
              onClick={onViewProfile}
            />
            {props.hasReply && (
              <Box sx={{ flexGrow: 1, pb: 2 }}>
                <Divider orientation="vertical" variant="middle" sx={{ borderRightWidth: 2 }}></Divider>
              </Box>
            )}
          </Stack>
        </Box>
        <Box sx={{ width: "100%" }}>
          {AppBskyFeedDefs.isReasonRepost(props.reason) && (
            <Stack sx={{ color: grey[400] }} direction="row" alignItems="center" spacing={0.5}>
              <LoopIcon sx={{ fontSize: 12 }} />
              <Typography variant="caption">Reposted by {props.reason.by.displayName}</Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" onClick={onViewProfile}>
            <Stack direction="column">
              <Typography variant="body2">{props.post.author.displayName}</Typography>
              <Typography color={grey[500]} variant="caption">
                @{props.post.author.handle}
              </Typography>
            </Stack>
            <Box>
              <Typography color={grey[500]} variant="caption">
                {dateLabel}
              </Typography>
              <DropDownMenu items={menuItems} size="tiny" />
            </Box>
          </Stack>
          <Stack sx={{ mt: 1, mb: 1 }} spacing={1}>
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
              variant="body2"
            >
              <Linkify>{AppBskyFeedPost.isRecord(props.post.record) && props.post.record.text}</Linkify>
            </Typography>
            {AppBskyEmbedImages.isView(props.post.embed) && <PostImages images={props.post.embed.images} />}
            {AppBskyEmbedExternal.isView(props.post.embed) && <PostArticle article={props.post.embed.external} />}
            {AppBskyEmbedRecord.isView(props.post.embed) &&
              AppBskyEmbedRecord.isViewRecord(props.post.embed.record) && (
                <PostQuote record={props.post.embed.record} />
              )}
            {AppBskyEmbedRecord.isView(props.post.embed) &&
              AppBskyFeedDefs.isGeneratorView(props.post.embed.record) && <PostFeed record={props.post.embed.record} />}
            {AppBskyEmbedRecordWithMedia.isView(props.post.embed) &&
              AppBskyEmbedImages.isView(props.post.embed.media) && (
                <PostImages images={props.post.embed.media.images} />
              )}
            {AppBskyEmbedRecordWithMedia.isView(props.post.embed) &&
              AppBskyEmbedExternal.isView(props.post.embed.media) && (
                <PostArticle article={props.post.embed.media.external} />
              )}
            {AppBskyEmbedRecordWithMedia.isView(props.post.embed) &&
              AppBskyEmbedRecord.isViewRecord(props.post.embed.record.record) && (
                <PostQuote record={props.post.embed.record.record} />
              )}
            <SocialActions post={props.post} />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Post;
