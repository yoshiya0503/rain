import _ from "lodash";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CardMedia from "@mui/material/CardMedia";
import LabelProgress from "@/components/LabelProgress";
import ProfileHeader from "@/components/ProfileHeader";
import PostArticle from "@/components/PostArticle";
import PostQuote from "@/components/PostQuote";
import useMe from "@/hooks/useMe";
import usePost from "@/hooks/usePost";
import useQuote from "@/hooks/useQuote";
import useOGP from "@/hooks/useOGP";
import useImage from "@/hooks/useImage";
import useBackdrop from "@/hooks/useBackdrop";
import useRichText from "@/hooks/useRichText";
import Linkify from "linkify-react";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

type Props = {
  title: string;
  post?: AppBskyFeedDefs.PostView;
  type?: "reply" | "quote";
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

const MAX_TEXT_LENGTH = 300;

export const PostDialog = (props: Props) => {
  const me = useMe();
  const { onPost } = usePost();
  const { article, fetchOGP, fetchEmbedExternal, onClearArticle } = useOGP();
  const { images, onUpload, onRemove, fetchEmbedImages, onClearImages } = useImage();
  const { quote, fetchQuote, fetchEmbedQuote } = useQuote(props.post);
  const { open, withBackdrop } = useBackdrop();
  const { text, facets, fetchFacets, link, onChange, onClearText } = useRichText();

  const onClean = () => {
    onClearImages();
    onClearArticle();
    onClearText();
    props.onClose();
  };

  const onKeyboard = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      // TODO メンションが入った場合
      await fetchFacets();
      fetchOGP(link("ogp"));
      fetchQuote(link("quote"));
    }
  };

  const onSend = async () => {
    withBackdrop(async () => {
      let reply = undefined;
      let embed = undefined;
      if (props.type === "reply" && AppBskyFeedPost.isRecord(props.post?.record)) {
        const parent = { cid: props.post?.cid || "", uri: props.post?.uri || "" };
        const root = props.post?.record.reply?.root || parent;
        reply = { root, parent };
      }
      if (article) {
        embed = await fetchEmbedExternal();
      }
      if (!_.isEmpty(images)) {
        embed = await fetchEmbedImages();
      }
      if (props.type === "quote" && quote) {
        embed = fetchEmbedQuote();
      }
      onPost({ text, facets: facets(), reply, embed });
      onClean();
    });
  };

  const isNotPostable = MAX_TEXT_LENGTH < text.length || !text.length;

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
      <DialogTitle>
        <Stack spacing={1} alignItems="flex-start">
          {props.title}
          <IconButton color="primary" component="label">
            <AddPhotoAlternateIcon />
            <input type="file" accept="image/*" multiple hidden onChange={onUpload} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {props.post && props.type === "reply" && (
          <Box sx={{ p: 2, mt: 1, mb: 2, border: 1, borderRadius: 2, borderColor: grey[700] }}>
            <DialogContentText component="div" sx={{ mt: 1, mb: 1 }}>
              <ProfileHeader profile={props.post.author} size="small" />
              <Typography sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }} variant="caption">
                <Linkify>{props.post.record.text}</Linkify>
              </Typography>
            </DialogContentText>
          </Box>
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
        {!_.isEmpty(images) && (
          <ImageList sx={{ overflowX: "scroll" }} cols={4}>
            {_.map(images, (image, key) => (
              <ImageListItem key={key}>
                <CardMedia
                  sx={{ borderRadius: 3, width: 128, height: 128 }}
                  component="img"
                  image={URL.createObjectURL(image)}
                  alt={image.name}
                />
                <ImageListItemBar
                  sx={{ background: "rgba(0, 0, 0, 0)" }}
                  position="top"
                  actionIcon={
                    <CancelIcon
                      sx={{ m: 1 }}
                      onClick={() => {
                        onRemove(key);
                      }}
                    />
                  }
                  actionPosition="right"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {article && <PostArticle article={article} />}
        {quote && <PostQuote record={quote} />}
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
          <Button onClick={onClean}>Cancel</Button>
          <Button onClick={onSend} disabled={isNotPostable}>
            Send
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
