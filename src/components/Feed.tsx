import _ from "lodash";
import { useCallback } from "react";
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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Text from "@/components/Text";
import Post from "@/components/Post";
import FeedBrief from "@/components/FeedBrief";
import { AppBskyFeedDefs } from "@atproto/api";

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
  onChangeFeed: (feed: AppBskyFeedDefs.GeneratorView) => void;
  expanded?: boolean;
};

export const Feed = (props: Props) => {
  const onChangeFeed = useCallback(() => {
    props.onChangeFeed(props.feed);
  }, [props]);

  return (
    <FeedAccordion sx={{ borderRadius: 3 }} onChange={onChangeFeed} expanded={props.expanded}>
      <AccordionSummary>
        <Stack sx={{ width: "100%" }} direction="column" spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1}>
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
            <Box>
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("test");
                }}
              >
                <AddRoundedIcon />
              </IconButton>
            </Box>
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
            <Box key={index} sx={{ pt: 1, pb: 1 }}>
              <FeedBrief brief={f.post} />
              <Divider />
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
