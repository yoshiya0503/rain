import _ from "lodash";
import { useCallback } from "react";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
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
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

type Props = {
  passwords: { name: string; createdAt: string }[];
  open: boolean;
  onAddPassword?: (name: string) => void;
  onDeletePassword?: (mame: string) => void;
  onClose: () => void;
  onSend?: () => void;
};

export const DialogInviteCodes = (props: Props) => {
  const onDelete = useCallback(
    (name: string) => () => {
      props.onDeletePassword(name);
    },
    [props]
  );
  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <DialogTitle>App Passwords</DialogTitle>
      <DialogContent>
        <List>
          {_.map(props.passwords, (password) => (
            <ListItem
              key={password.createdAt}
              divider
              secondaryAction={
                <IconButton onClick={onDelete(password.name)} color="error">
                  <DeleteForeverRoundedIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={<Typography sx={{ fontWeight: 600 }}>{password.name}</Typography>}
                secondary={
                  <Typography variant="caption" color={grey[400]}>
                    {password.createdAt}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ alignItems: "center", justifyContent: "flex-end" }}>
        <Button sx={{ borderRadius: 5, fontWeight: 600 }} variant="contained" onClick={props.onClose}>
          Add New Password
        </Button>
        <Button sx={{ borderRadius: 5, fontWeight: 600 }} variant="contained" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInviteCodes;
