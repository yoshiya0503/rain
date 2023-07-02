import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import LabelProgress from "@/components/LabelProgress";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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

  const isNotPostable = 300 < text.length;

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm">
      <DialogTitle>
        <IconButton color="primary" onClick={props.onClose}>
          <AddPhotoAlternateIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField multiline rows={4} fullWidth placeholder="Whats Your Hot Topic?" value={text} onChange={onChange} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ ml: 2 }}>
          <LabelProgress
            variant="determinate"
            color={isNotPostable ? "error" : "primary"}
            value={Math.min((text.length / 300) * 100, 100)}
            label={(300 - text.length).toString()}
          />
        </Box>
        <Box>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={onPost} disabled={isNotPostable}>
            Post
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
