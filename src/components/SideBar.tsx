import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Search from "@mui/icons-material/SearchRounded";
import useSuggestion from "@/hooks/useSuggestion";
import usePreference from "@/hooks/usePreference";
import { AppBskyActorDefs, AppBskyFeedDefs } from "@atproto/api";
// TODO フォローボタン
// TODO pinが更新されたときに、feedの表示を変えたい

export const SideBar = () => {
  const navigate = useNavigate();
  const suggestions = useSuggestion();
  const { pinnedFeeds } = usePreference();

  const onViewFeedGenerator = useCallback(
    (feed: AppBskyFeedDefs.GeneratorView) => () => {
      const uri = _.chain(feed.uri).replace("at://", "/profile/").replace("app.bsky.feed.generator", "feed").value();
      navigate(uri);
    },
    [navigate]
  );

  const onViewProfile = useCallback(
    (actor: AppBskyActorDefs.ProfileView) => () => {
      const uri = `/profile/${actor.handle}`;
      if (location.pathname !== uri) {
        navigate(uri);
      }
    },
    [navigate]
  );

  const actors = _.take(suggestions, 3);

  return (
    <Stack spacing={2}>
      <Paper component="nav" variant="outlined" sx={{ width: 360, maxheight: 300, borderRadius: 3 }}>
        <List>
          <ListItem>
            <Typography sx={{ fontWeight: 600 }}>Feeds</Typography>
          </ListItem>
          <Divider />
          {_.map(pinnedFeeds, (feed, key) => (
            <ListItem key={key} disablePadding>
              <ListItemButton sx={{ borderRadius: 6 }} onClick={onViewFeedGenerator(feed)}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 32, height: 32 }} alt={feed.avatar} src={feed.avatar} variant="rounded" />
                </ListItemAvatar>
                <ListItemText primary={feed.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper component="nav" variant="outlined" sx={{ width: 360, height: 280, borderRadius: 3 }}>
        <List>
          <ListItem>
            <Typography sx={{ fontWeight: 600 }}>Suggested Follows</Typography>
          </ListItem>
          <Divider />
          {_.map(actors, (actor, key) => (
            <ListItem
              key={key}
              secondaryAction={
                <Button sx={{ width: "100%", borderRadius: 6, fontWeight: 600 }} variant="contained">
                  Follow
                </Button>
              }
              disablePadding
            >
              <ListItemButton sx={{ borderRadius: 6 }} onClick={onViewProfile(actor)}>
                <ListItemAvatar>
                  <Avatar src={actor.avatar} alt={actor.displayName} />
                </ListItemAvatar>
                <ListItemText primary={actor.displayName} secondary={actor.handle} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default SideBar;
