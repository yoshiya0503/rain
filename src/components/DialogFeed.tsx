import _ from "lodash";
import { useCallback } from "react";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import useFeedGenerator from "@/hooks/useFeedGenerator";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";

type Props = {
  preferences: AppBskyActorDefs.Preferences;
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

export const DialogFeed = (props: Props) => {
  const feedPref = _.find(props.preferences, (p) => AppBskyActorDefs.isSavedFeedsPref(p));

  const onDelete = useCallback((name: string) => async () => {}, []);

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={props.onClose}>
      <DialogTitle>Saved Feed</DialogTitle>
      <DialogContent>
        <List>
          {AppBskyActorDefs.isSavedFeedsPref(feedPref) &&
            _.map(feedPref?.saved, (feed) => (
              <ListItem key={feed}>
                <ListItemText>{feed}</ListItemText>
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
