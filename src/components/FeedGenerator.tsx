import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { grey, pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShareIcon from "@mui/icons-material/ShareRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import Text from "@/components/Text";
import useFeedGenerator from "@/hooks/useFeedGenerator";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";

type Props = {
  feed: AppBskyFeedDefs.GeneratorView;
  preferences: AppBskyActorDefs.Preferences;
  updatePreferences: (Preferences: AppBskyActorDefs.Preferences) => void;
};

export const FeedGenerator = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onViewCreator = useCallback(() => {
    const uri = `/profile/${props.feed.creator.handle}`;
    if (location.pathname !== uri) {
      navigate(uri);
    }
  }, [props, navigate, location]);

  const { isSaved, isPinned, onToggleLike, onToggleSave, onTogglePin, onShare } = useFeedGenerator(
    props.feed,
    props.preferences
  );

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
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(props.feed);
              }}
            >
              {props.feed.viewer?.like ? (
                <FavoriteIcon sx={{ color: pink[400] }} />
              ) : (
                <FavoriteBorderRoundedIcon sx={{ color: pink[400] }} />
              )}
            </IconButton>
            <Typography variant="body1">{props.feed.likeCount} Likes</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave();
                }}
              >
                {isSaved ? <RssFeedRoundedIcon /> : <RssFeedRoundedIcon color="disabled" />}
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin();
                }}
              >
                {isPinned ? <PushPinRoundedIcon /> : <PushPinRoundedIcon color="disabled" />}
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(props.feed);
                }}
              >
                <ShareIcon />
              </IconButton>
            </Stack>
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
