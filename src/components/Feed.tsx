import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { grey, pink } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import Text from "@/components/Text";
import FeedBrief from "@/components/FeedBrief";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";

const FeedAccordion = styled((props: AccordionProps) => <Accordion disableGutters elevation={0} square {...props} />)(
  ({ theme, expanded }) => ({
    background: "none",
    border: `1px solid ${theme.palette.divider}`,
    "&:before": {
      display: "none",
    },
    borderColor: expanded ? theme.palette.primary.main : theme.palette.divider,
  })
);

type Props = {
  feed: AppBskyFeedDefs.GeneratorView;
  feedBrief: AppBskyFeedDefs.FeedViewPost[];
  preferences: AppBskyActorDefs.Preferences;
  onChangeFeed: (feed: AppBskyFeedDefs.GeneratorView) => void;
  updatePreferences: (Preferences: AppBskyActorDefs.Preferences) => void;
  expanded?: boolean;
};

export const Feed = (props: Props) => {
  const navigate = useNavigate();
  const onChangeFeed = useCallback(() => {
    props.onChangeFeed(props.feed);
  }, [props]);

  const onViewFeedGenerator = useCallback(() => {
    const uri = _.chain(props.feed.uri)
      .replace("at://", "/profile/")
      .replace("app.bsky.feed.generator", "feed")
      .value();
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

  return (
    <FeedAccordion sx={{ borderRadius: 3 }} onChange={onChangeFeed} expanded={props.expanded}>
      <AccordionSummary>
        <Stack sx={{ width: "100%" }} direction="column" spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="row"
              spacing={1}
              onClick={(e) => {
                e.stopPropagation();
                onViewFeedGenerator();
              }}
            >
              <Avatar
                sx={{ width: 42, height: 42 }}
                alt={props.feed.avatar}
                src={props.feed.avatar}
                variant="rounded"
              />
              <Stack direction="column">
                <Typography variant="body2">{props.feed.displayName}</Typography>
                <Typography color={grey[500]} variant="caption">
                  by @{props.feed.creator.handle}
                </Typography>
              </Stack>
            </Stack>
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
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteIcon fontSize="small" sx={{ color: pink[400] }} />
            <Typography variant="body2">{props.feed.likeCount}</Typography>
          </Stack>
          <Typography variant="caption">
            <Text>{props.feed.description}</Text>
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {!_.isEmpty(props.feedBrief) ? (
          _.map(props.feedBrief, (f, index) => (
            <Box key={index} sx={{ pb: 1 }}>
              <Divider />
              <FeedBrief brief={f.post} />
            </Box>
          ))
        ) : (
          <LinearProgress />
        )}
      </AccordionDetails>
    </FeedAccordion>
  );
};

export default Feed;
