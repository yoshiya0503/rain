import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LabelProgress from "@/components/LabelProgress";
import ProfileInline from "@/components/ProfileInline";
import { PostView } from "@/stores/feed";
import usePost from "@/hooks/usePost";

type Props = {
  title: string;
  post?: PostView;
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

export const PostDialog = (props: Props) => {
  const { onPost } = usePost();
  const [text, setText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onSend = () => {
    onPost({ text, createdAt: Date().toString() });
    if (props.onSend) {
      props.onSend();
    }
    props.onClose();
  };

  const MAX_TEXT_LENGTH = 300;
  const isNotPostable = MAX_TEXT_LENGTH < text.length;

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <DialogTitle>
        <IconButton color="primary" onClick={props.onClose}>
          <AddPhotoAlternateIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {props.post && (
          <DialogContentText sx={{ mt: 1, mb: 1 }}>
            <ProfileInline profile={props.post.author} />
          </DialogContentText>
        )}
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Whats Your Hot Topic?"
          autoFocus
          value={text}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ ml: 2 }}>
          <LabelProgress
            variant="determinate"
            color={isNotPostable ? "error" : "primary"}
            value={Math.min((text.length / MAX_TEXT_LENGTH) * 100, 100)}
            label={(MAX_TEXT_LENGTH - text.length).toString()}
          />
        </Box>
        <Box>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={onSend} disabled={isNotPostable}>
            {props.title}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
