import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuteIcon from "@mui/icons-material/VolumeOff";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import LoopIcon from "@mui/icons-material/Loop";
import ReportIcon from "@mui/icons-material/ReportRounded";
import { grey, green } from "@mui/material/colors";
import AvatarThread from "@/components/AvatarThread";
import ProfileHeader from "@/components/ProfileHeader";
import DropDownMenu from "@/components/DropDownMenu";
import PostActions from "@/components/PostActions";
import PostStats from "@/components/PostStats";
import Text from "@/components/Text";
import Attachments from "@/components/Attachments";
import usePost from "@/hooks/usePost";
import useLocale from "@/hooks/useLocale";
import { AppBskyFeedDefs, AppBskyFeedPost, AppBskyEmbedImages, AppBskyActorDefs } from "@atproto/api";

type Props = {
  me?: AppBskyActorDefs.ProfileView;
  post: AppBskyFeedDefs.PostView;
  onOpenPost?: (post: AppBskyFeedDefs.PostView, type: "reply" | "quote") => void;
  onOpenImage?: (images: AppBskyEmbedImages.ViewImage[]) => void;
  onOpenReport?: (post: AppBskyFeedDefs.PostView) => void;
  reason?: AppBskyFeedDefs.ReasonRepost | { [k: string]: unknown; $type: string };
  hasReply?: boolean;
  showStats?: boolean;
};

// TODO mute threads
export const Post = (props: Props) => {
  const { onDeletePost, onShare, onViewThread } = usePost();
  const { fromNow } = useLocale();

  const isMe = props.me?.did === props.post.author.did;
  const menuItems = isMe
    ? [
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
          name: "report",
          icon: <ReportIcon />,
          label: "Report",
          action: () => {
            props.onOpenReport && props.onOpenReport(props.post);
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
      ]
    : [
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
          name: "report",
          icon: <ReportIcon />,
          label: "Report",
          action: () => {
            props.onOpenReport && props.onOpenReport(props.post);
          },
        },
      ];

  return (
    <Stack sx={{ pr: 1, pl: 1 }} direction="row" spacing={1} onClick={onViewThread(props.post)}>
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
              {fromNow(props.post.indexedAt)}
            </Typography>
            <DropDownMenu items={menuItems} />
          </Stack>
        </Stack>
        <Stack sx={{ pt: 1, pb: 1 }} spacing={1}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="body2">
            <Text>{AppBskyFeedPost.isRecord(props.post.record) && props.post.record.text}</Text>
          </Typography>
          <Attachments embed={props.post.embed} onOpenImage={props.onOpenImage} />
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
