import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AppBskyFeedPost } from "@atproto/api";

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  onPost: (record: AppBskyFeedPost.Record) => void;
};

export const CreatePost = (props: Props) => {
  const [text, setText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onPost = () => {
    props.onPost({ text, createdAt: Date().toString() });
    props.onClose();
  };

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogTitle>
      <DialogContent>
        <TextField multiline rows={4} fullWidth placeholder="Whats Your Hot Topic?" value={text} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onPost}>Post</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
