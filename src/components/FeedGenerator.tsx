import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { grey, pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ShareIcon from "@mui/icons-material/ShareRounded";
import Text from "@/components/Text";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  feed: AppBskyFeedDefs.GeneratorView;
};

export const FeedGenerator = (props: Props) => {
  const navigate = useNavigate();

  const onViewCreator = useCallback(() => {
    const uri = `/profile/${props.feed.creator.handle}`;
    navigate(uri);
  }, [props, navigate]);

  // TODO add preferences
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Avatar
              sx={{ width: 64, height: 64, bgcolor: "primary.main" }}
              src={props.feed.avatar}
              alt={props.feed.avatar}
              variant="rounded"
            >
              <FeedRoundedIcon fontSize="large" />
            </Avatar>
            <Stack>
              <Typography variant="h6">{props.feed.displayName}</Typography>
              <Typography variant="caption" color={grey[500]} onClick={onViewCreator}>
                by @{props.feed.creator.handle}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteIcon sx={{ color: pink[400] }} />
            <Typography variant="body1">{props.feed.likeCount} Likes</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <AddRoundedIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography variant="caption">
            <Text>{props.feed.description}</Text>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FeedGenerator;
