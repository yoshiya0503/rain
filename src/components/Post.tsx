import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOff";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import LoopIcon from "@mui/icons-material/Loop";
import { grey, green } from "@mui/material/colors";
import Linkify from "linkify-react";
import AvatarThread from "@/components/AvatarThread";
import ProfileHeader from "@/components/ProfileHeader";
import DropDownMenu from "@/components/DropDownMenu";
import PostActions from "@/components/PostActions";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostQuote from "@/components/PostQuote";
import PostFeed from "@/components/PostFeed";
import PostStats from "@/components/PostStats";
import usePost from "@/hooks/usePost";
import {
  AppBskyFeedDefs,
  AppBskyFeedPost,
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from "@atproto/api";

type Props = {
  post: AppBskyFeedDefs.PostView;
  onOpenPost?: (post: AppBskyFeedDefs.PostView, type: "reply" | "quote") => void;
  reason?: AppBskyFeedDefs.ReasonRepost | { [k: string]: unknown; $type: string };
  hasReply?: boolean;
  showStats?: boolean;
};

export const Post = (props: Props) => {
  const { onDeletePost, onShare, onViewThread } = usePost();
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
    // TODO 自分の投稿と挙動が違う
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

  return (
    <Stack direction="row" spacing={1} onClick={onViewThread(props.post)}>
      <AvatarThread profile={props.post.author} hasReply={props.hasReply} />
      <Box sx={{ width: "100%" }}>
        {AppBskyFeedDefs.isReasonRepost(props.reason) && (
          <Stack sx={{ color: grey[400] }} direction="row" alignItems="center" spacing={0.5}>
            <LoopIcon sx={{ fontSize: 16, color: green["A400"] }} />
            <Typography variant="caption">Reposted by {props.reason.by.displayName}</Typography>
          </Stack>
        )}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <ProfileHeader profile={props.post.author} disableAvatar />
          <Stack direction="row" alignItems="center">
            <Typography color={grey[500]} variant="caption" noWrap>
              {dateLabel}
            </Typography>
            <DropDownMenu items={menuItems} size="tiny" />
          </Stack>
        </Stack>
        <Stack sx={{ pt: 1, pb: 1 }} spacing={1}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="body2">
            <Linkify>{AppBskyFeedPost.isRecord(props.post.record) && props.post.record.text}</Linkify>
          </Typography>
          {AppBskyEmbedImages.isView(props.post.embed) && <PostImages images={props.post.embed.images} />}
          {AppBskyEmbedExternal.isView(props.post.embed) && <PostArticle article={props.post.embed.external} />}
          {AppBskyEmbedRecord.isView(props.post.embed) && AppBskyEmbedRecord.isViewRecord(props.post.embed.record) && (
            <PostQuote record={props.post.embed.record} />
          )}
          {AppBskyEmbedRecord.isView(props.post.embed) && AppBskyFeedDefs.isGeneratorView(props.post.embed.record) && (
            <PostFeed record={props.post.embed.record} />
          )}
          {AppBskyEmbedRecordWithMedia.isView(props.post.embed) &&
            AppBskyEmbedImages.isView(props.post.embed.media) && <PostImages images={props.post.embed.media.images} />}
          {AppBskyEmbedRecordWithMedia.isView(props.post.embed) &&
            AppBskyEmbedExternal.isView(props.post.embed.media) && (
              <PostArticle article={props.post.embed.media.external} />
            )}
          {AppBskyEmbedRecordWithMedia.isView(props.post.embed) &&
            AppBskyEmbedRecord.isViewRecord(props.post.embed.record.record) && (
              <PostQuote record={props.post.embed.record.record} />
            )}
        </Stack>
        <Box
          sx={{ ml: -1, mb: 1 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PostActions post={props.post} onOpenPost={props.onOpenPost} />
        </Box>
        {props.showStats && (
          <Box sx={{ mb: 1 }}>
            <PostStats post={props.post} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Post;
