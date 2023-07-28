import _ from "lodash";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LabelProgress from "@/components/LabelProgress";
import ProfileInline from "@/components/ProfileInline";
import PostArticle from "@/components/PostArticle";
import { PostView } from "@/stores/feed";
import usePost from "@/hooks/usePost";
import useOGP from "@/hooks/useOGP";
import useMe from "@/hooks/useMe";
import Linkify from "linkify-react";
/*
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostQuote from "@/components/PostQuote";
import { AppBskyEmbedImages, AppBskyEmbedExternal, AppBskyEmbedRecord } from "@atproto/api";
*/

type Props = {
  title: string;
  post?: PostView;
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

// TODO
// すべてのpostのdomに入ってしまっている気がするが
// 実際は一回しか描画はされていない。計算はされている
export const PostDialog = (props: Props) => {
  const me = useMe();
  const { onPost } = usePost();
  const { article, fetchOGP, fetchEmbed } = useOGP();
  const [text, setText] = useState<string>("");

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onKeyboard = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      fetchOGP(text);
    }
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const result = await e.target.files[0].text();
      // onUploadBlob(result);
    }
  };

  const onSend = async () => {
    const root = { cid: props.post?.cid || "", uri: props.post?.uri || "" };
    const parent = { cid: props.post?.cid || "", uri: props.post?.uri || "" };
    const reply = props.post && { root, parent };
    const embed = await fetchEmbed();
    onPost({ text, reply, embed });
    if (props.onSend) {
      props.onSend();
    }
    props.onClose();
  };

  const MAX_TEXT_LENGTH = 300;
  const isNotPostable = MAX_TEXT_LENGTH < text.length;
  /* TODO 入れるか入れないかは一考
  const images = props.post?.embed?.images as AppBskyEmbedImages.ViewImage[];
  const article = props.post?.embed?.external as AppBskyEmbedExternal.ViewExternal;
  const record = props.post?.embed?.record as AppBskyEmbedRecord.ViewRecord;
            {images ? <PostImages images={images} /> : null}
            {article ? <PostArticle article={article} /> : null}
            {record ? <PostQuote record={record} /> : null}
  */

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <DialogTitle>
        <IconButton color="primary" component="label">
          <AddPhotoAlternateIcon />
          <input type="file" accept="image/*" hidden onChange={onUpload} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {props.post && (
          <DialogContentText sx={{ mt: 1, mb: 1 }}>
            <ProfileInline profile={props.post.author} size="small" />
            <Typography sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }} variant="caption">
              <Linkify>{props.post.record.text}</Linkify>
            </Typography>
          </DialogContentText>
        )}
        <Box sx={{ mt: 1, mb: 1 }}>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Whats Your Hot Topic?"
            autoFocus
            value={text}
            onChange={onChange}
            onKeyUp={onKeyboard}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Stack alignSelf="flex-end">
                    <Avatar sx={{ width: 48, height: 48 }} src={me.avatar} />
                  </Stack>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {article && <PostArticle article={article} />}
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
