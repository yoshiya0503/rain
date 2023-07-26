import _ from "lodash";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey, pink } from "@mui/material/colors";
import Linkify from "linkify-react";
import { AppBskyFeedGenerator } from "@atproto/api";

type Props = {
  record: AppBskyFeedGenerator.Record;
};

export const PostFeed = (props: Props) => {
  const onLink = () => {
    console.log("実装中");
  };

  // avatarの型が変な気がする
  const avatar = _.toString(props.record.avatar);
  const likeCount = _.toNumber(props.record.likeCount);

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onLink}>
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }} spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 32, height: 32 }} alt={avatar} src={avatar} variant="rounded" />
              <Stack direction="column">
                <Typography variant="caption">{props.record.displayName}</Typography>
                <Typography color={grey[500]} variant="caption">
                  created by @{_.get(props.record.creator, "handle")}
                </Typography>
              </Stack>
              <FavoriteIcon sx={{ color: pink[400] }} />
              <Typography variant="body1">{likeCount} Likes</Typography>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-wrap" }} variant="caption">
              <Linkify>{props.record.description}</Linkify>
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostFeed;
