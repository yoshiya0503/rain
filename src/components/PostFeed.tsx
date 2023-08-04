import _ from "lodash";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import { grey, pink } from "@mui/material/colors";
import Linkify from "linkify-react";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  record: AppBskyFeedDefs.GeneratorView;
};

export const PostFeed = (props: Props) => {
  const onLink = () => {
    console.log("TODO実装中");
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onLink}>
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={props.record.avatar}
                src={props.record.avatar}
                variant="rounded"
              />
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
              <Linkify>{props.record.description}</Linkify>
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostFeed;
