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
import DialogContentText from "@mui/material/DialogContentText";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

type Props = {
  inviteCodes: { used: boolean; code: string }[] | null;
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

export const DialogInviteCodes = (props: Props) => {
  const onCopy = useCallback(
    (code: string) => () => {
      navigator.clipboard.writeText(code);
    },
    []
  );
  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={props.onClose}>
      <DialogTitle>Invite Your Friends</DialogTitle>
      {_.isEmpty(props.inviteCodes) && (
        <DialogContent>
          <DialogContentText>No invite codes available...</DialogContentText>
          <DialogContentText>If you want to check invite codes, you can not use app password.</DialogContentText>
        </DialogContent>
      )}
      <DialogContent>
        <List>
          {_.map(props.inviteCodes, (code) => (
            <ListItem
              key={code.code}
              divider
              secondaryAction={
                !code.used ? (
                  <Button size="small" startIcon={<ContentCopyRoundedIcon />} onClick={onCopy(code.code)}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption">
                      copy
                    </Typography>
                  </Button>
                ) : null
              }
            >
              {code.used ? (
                <ListItemText
                  key={code.code}
                  primary={
                    <Typography sx={{ textDecoration: "line-through", color: grey[600] }} variant="body2">
                      {code.code}
                    </Typography>
                  }
                />
              ) : (
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 600 }} variant="body2" color="primary">
                      {code.code}
                    </Typography>
                  }
                />
              )}
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

export default DialogInviteCodes;
