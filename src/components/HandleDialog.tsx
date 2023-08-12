import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import useBackdrop from "@/hooks/useBackdrop";
import useHandle from "@/hooks/useHandle";
import useMe from "@/hooks/useMe";

type Props = {
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

export const HandleDialog = (props: Props) => {
  const me = useMe();
  const { open, withBackdrop } = useBackdrop();
  const { handle, onChangeHandle, onUpdateHandle } = useHandle();
  const disabled = false;

  const onSend = async () => {
    withBackdrop(async () => {
      onUpdateHandle();
      props.onClose();
    });
  };

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
      <DialogTitle>Change Handle</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Stack direction="row" sx={{ mb: 2 }} alignItems="center" spacing={1}>
            <Typography variant="body2">@{me.handle} →</Typography>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              @{handle}.bsky.social
            </Typography>
          </Stack>
        </DialogContentText>
        <TextField
          label="Handle"
          value={handle}
          onChange={onChangeHandle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Box>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={onSend} disabled={disabled}>
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default HandleDialog;
