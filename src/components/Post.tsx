import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOffRounded";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import ShareIcon from "@mui/icons-material/ShareRounded";
import LoopIcon from "@mui/icons-material/LoopRounded";
import { grey } from "@mui/material/colors";
import Linkify from "linkify-react";
import ProfileInline from "@/components/ProfileInline";
import DropDownMenu from "@/components/DropDownMenu";
import SocialActions from "@/components/SocialActions";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostQuote from "@/components/PostQuote";
import PostFeed from "@/components/PostFeed";
import usePost from "@/hooks/usePost";
import { PostView, ReasonView } from "@/stores/feed";
import {
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyFeedGenerator,
  AppBskyActorDefs,
} from "@atproto/api";

type Props = {
  post: PostView;
  reason?: ReasonView;
};

export const Post = (props: Props) => {
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
  const images = props.post.embed?.images as AppBskyEmbedImages.ViewImage[];
  const article = props.post.embed?.external as AppBskyEmbedExternal.ViewExternal;
  const record = props.post.embed?.record as AppBskyEmbedRecord.ViewRecord;
  const feedRecord = props.post.embed?.record as AppBskyFeedGenerator.Record;
  const media = props.post.embed?.media as AppBskyEmbedRecordWithMedia.Main;
  const repostedBy = props.reason?.by as AppBskyActorDefs.ProfileView;

  return (
    <>
      {props.reason && (
        <Stack sx={{ color: grey[400] }} direction="row" alignItems="center" spacing={0.5}>
          <LoopIcon sx={{ fontSize: 12 }} />
          <Typography variant="caption">Reposted by {repostedBy.displayName}</Typography>
        </Stack>
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <ProfileInline profile={props.post.author} />
        <Box>
          <Typography color={grey[500]} variant="caption">
            {dateLabel}
          </Typography>
          <DropDownMenu items={menuItems} size="tiny" />
        </Box>
      </Stack>
      <Stack sx={{ mt: 1, mb: 1 }} spacing={2}>
        <Typography sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }} variant="body2">
          <Linkify>{props.post.record.text}</Linkify>
        </Typography>
        {!media && images ? <PostImages images={images} /> : null}
        {!media && article ? <PostArticle article={article} /> : null}
        {!media && record?.author ? <PostQuote record={record} /> : null}
        {!media && record?.creator ? <PostFeed record={feedRecord} /> : null}
        {media?.images ? <PostImages images={media.images as AppBskyEmbedImages.ViewImage[]} /> : null}
        {media?.external ? <PostArticle article={media.external as AppBskyEmbedExternal.ViewExternal} /> : null}
        {media ? <PostQuote record={record.record as AppBskyEmbedRecord.ViewRecord} /> : null}
        <SocialActions post={props.post} />
      </Stack>
    </>
  );
};

export default Post;
