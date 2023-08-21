import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { grey, pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import ShareIcon from "@mui/icons-material/ShareRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import Text from "@/components/Text";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";

type Props = {
  feed: AppBskyFeedDefs.GeneratorView;
  preferences: AppBskyActorDefs.Preferences;
  updatePreferences: (Preferences: AppBskyActorDefs.Preferences) => void;
};

export const FeedGenerator = (props: Props) => {
  const navigate = useNavigate();

  const onViewCreator = useCallback(() => {
    const uri = `/profile/${props.feed.creator.handle}`;
    navigate(uri);
  }, [props, navigate]);

  const feedPref = _.find(props.preferences, (p) => AppBskyActorDefs.isSavedFeedsPref(p));
  const isSaved =
    AppBskyActorDefs.isSavedFeedsPref(feedPref) && _.find(feedPref.saved, (uri) => props.feed.uri === uri);
  const isPinned =
    AppBskyActorDefs.isSavedFeedsPref(feedPref) && _.find(feedPref.pinned, (uri) => props.feed.uri === uri);

  const onToggleSave = useCallback(() => {
    if (!AppBskyActorDefs.isSavedFeedsPref(feedPref)) return;
    const preferences = _.map(props.preferences, (p) => {
      if (!AppBskyActorDefs.isSavedFeedsPref(p)) return p;
      if (isSaved) return { ...p, saved: _.reject(feedPref.saved, (uri) => uri === props.feed.uri) };
      return { ...p, saved: _.concat(feedPref.saved, props.feed.uri) };
    });
    props.updatePreferences(preferences);
  }, [props, feedPref, isSaved]);

  const onTogglePin = useCallback(() => {
    if (!AppBskyActorDefs.isSavedFeedsPref(feedPref)) return;
    const preferences = _.map(props.preferences, (p) => {
      if (!AppBskyActorDefs.isSavedFeedsPref(p)) return p;
      if (isPinned) return { ...p, pinned: _.reject(feedPref.pinned, (uri) => uri === props.feed.uri) };
      return { ...p, pinned: _.concat(feedPref.pinned, props.feed.uri) };
    });
    props.updatePreferences(preferences);
  }, [props, feedPref, isPinned]);

  const onClickShare = useCallback(() => {
    const url = _.chain(props.feed.uri)
      .replace("at://", "https://bsky.app/profile/")
      .replace("/app.bsky.feed.generator/", "/feed/")
      .value();
    navigator.clipboard.writeText(url);
  }, [props]);

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
                  onClickShare();
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
