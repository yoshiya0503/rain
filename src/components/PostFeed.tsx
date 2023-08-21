import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import { grey, pink } from "@mui/material/colors";
import Text from "@/components/Text";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  record: AppBskyFeedDefs.GeneratorView;
};

export const PostFeed = (props: Props) => {
  const navigate = useNavigate();

  const onViewFeedGenerator = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      const uri = _.chain(props.record.uri)
        .replace("at://", "/profile/")
        .replace("app.bsky.feed.generator", "feed")
        .value();
      navigate(uri);
    },
    [props, navigate]
  );

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onViewFeedGenerator}>
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                alt={props.record.avatar}
                src={props.record.avatar}
                variant="rounded"
              >
                <FeedRoundedIcon fontSize="inherit" />
              </Avatar>
              <Stack direction="column">
                <Typography variant="caption">{props.record.displayName}</Typography>
                <Typography color={grey[500]} variant="caption">
                  created by @{_.get(props.record.creator, "handle")}
                </Typography>
              </Stack>
              <FavoriteIcon sx={{ color: pink[400] }} />
              <Typography variant="body1">{props.record.likeCount} Likes</Typography>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
              <Text>{props.record.description}</Text>
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostFeed;
