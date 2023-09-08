import _ from "lodash";
import { useCallback, useState } from "react";
import { useStore } from "@/stores";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import useLocale from "@/hooks/useLocale";

type Props = {
  passwords: { name: string; createdAt: string }[];
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

export const DialogInviteCodes = (props: Props) => {
  const { locale } = useLocale();
  const [password, setPassword] = useState<string>("");
  const [created, setCreated] = useState<string>("");
  const createAppPassword = useStore((state) => state.createAppPassword);
  const deleteAppPassword = useStore((state) => state.deleteAppPassword);

  const onDelete = useCallback(
    (name: string) => async () => {
      deleteAppPassword(name);
    },
    [deleteAppPassword]
  );

  const onAddPassword = useCallback(async () => {
    const created = (await createAppPassword(password)) || "";
    setCreated(created);
  }, [password, createAppPassword, setCreated]);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword]
  );

  const onClear = useCallback(() => {
    props.onClose();
    setPassword("");
    setCreated("");
  }, [props, setPassword, setCreated]);

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={onClear}>
      <DialogTitle>App Passwords</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <DialogContentText variant="body2">
            Please enter a unique name for this App Password or use our randomly generated one.
          </DialogContentText>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <TextField sx={{ width: "80%" }} size="small" label="new password" onChange={onChangePassword} />
            <Button sx={{ borderRadius: 5, fontWeight: 600 }} variant="contained" onClick={onAddPassword}>
              Add
            </Button>
          </Stack>
          {created && (
            <Stack direction="row" spacing={1}>
              <KeyRoundedIcon color="primary" />
              <Typography sx={{ borderRadius: 5, fontWeight: 600 }} variant="body1" color="primary">
                {created}
              </Typography>
            </Stack>
          )}
        </Stack>
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
              <ListItemText primary={password.name} secondary={locale(password.createdAt)} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button sx={{ width: "50%", borderRadius: 5, fontWeight: 600 }} variant="contained" onClick={onClear}>
          DONE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInviteCodes;
