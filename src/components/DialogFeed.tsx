import _ from "lodash";
import { useCallback } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import useFeedGenerator from "@/hooks/useFeedGenerator";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";

type Props = {
  feeds: AppBskyFeedDefs.GeneratorView[];
  preferences: AppBskyActorDefs.Preferences;
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

export const DialogFeed = (props: Props) => {
  const { isPinned, onToggleSave, onTogglePin } = useFeedGenerator();

  const onDelete = useCallback(
    (feed: AppBskyFeedDefs.GeneratorView) => async () => {
      onToggleSave(feed, props.preferences);
    },
    [props, onToggleSave]
  );

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={props.onClose}>
      <DialogTitle>Saved Feed</DialogTitle>
      <DialogContent>
        <List>
          {_.map(props.feeds, (feed) => (
            <ListItem
              key={feed.uri}
              divider
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePin(feed, props.preferences);
                    }}
                  >
                    {isPinned(feed, props.preferences) ? (
                      <PushPinRoundedIcon />
                    ) : (
                      <PushPinRoundedIcon color="disabled" />
                    )}
                  </IconButton>
                  <IconButton onClick={onDelete(feed)} color="error">
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar alt={feed.avatar} src={feed.avatar} variant="rounded" />
              </ListItemAvatar>
              <ListItemText primary={feed.displayName} secondary={`by @${feed.creator.handle}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button sx={{ width: "50%", borderRadius: 5, fontWeight: 600 }} variant="contained" onClick={props.onClose}>
          DONE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFeed;
