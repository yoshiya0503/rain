import _ from "lodash";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  unread: AppBskyFeedDefs.FeedViewPost[];
  onClick?: () => void;
};

export const UnreadPosts = (props: Props) => {
  const authors = _.chain(props.unread)
    .map((item) => item.post.author)
    .uniqBy((item) => item.handle)
    .value();
  if (!props.onClick) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <AvatarGroup
          max={5}
          sx={{
            "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 11 },
          }}
        >
          {_.map(authors, (author, key) => (
            <Avatar key={key} alt={author.displayName} src={author.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption"> about {_.size(props.unread)} new posts</Typography>
      </Stack>
    );
  }

  return (
    <Stack alignItems="center" justifyContent="center">
      <Button sx={{ borderRadius: 10, textTransform: "none" }} size="small" onClick={props.onClick}>
        <AvatarGroup
          max={5}
          sx={{
            "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 11 },
          }}
        >
          {_.map(authors, (author, key) => (
            <Avatar key={key} alt={author.displayName} src={author.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption"> about {_.size(props.unread)} new posts</Typography>
      </Button>
    </Stack>
  );
};

export default UnreadPosts;
