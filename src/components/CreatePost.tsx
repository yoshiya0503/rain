import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type Props = {
  title: string;
  open: boolean;
  onClose?: () => void;
  onPost?: () => void;
};

export const CreatePost = (props: Props) => {
  return (
    <Dialog open={props.open} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogTitle>
      <DialogContent>
        <TextField multiline rows={4} fullWidth placeholder="Whats Your Hot Topic?" />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Post</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
