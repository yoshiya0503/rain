import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
import AvatarBadge from "@/components/AvatarBadge";
import useBackdrop from "@/hooks/useBackdrop";
import useActor from "@/hooks/useActor";
import ImageListItemBar from "@mui/material/ImageListItemBar";

type Props = {
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

const MAX_NAME_LENGTH = 64;
const MAX_DESC_LENGTH = 256;

export const DialogProfile = (props: Props) => {
  const theme = useTheme();
  const {
    actor,
    avatar,
    banner,
    onChangeName,
    onChangeDescription,
    onUploadAvatar,
    onUploadBanner,
    onUpdateActor,
    onDropAvatar,
    onDropBanner,
  } = useActor();
  const { open, withBackdrop } = useBackdrop();

  const disabled = MAX_NAME_LENGTH < actor.displayName?.length || MAX_DESC_LENGTH < actor.description?.length;

  const onSend = async () => {
    withBackdrop(async () => {
      onUpdateActor();
      props.onClose();
    });
  };

  // TODO 画像の削除が出来ない
  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={props.onClose}>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <CardActionArea component="label">
          {banner || actor.banner ? (
            <CardMedia
              sx={{ borderRadius: 1, height: 140 }}
              image={(banner && URL.createObjectURL(banner)) || actor.banner || ""}
            />
          ) : (
            <Box sx={{ height: 140, backgroundColor: theme.palette.primary.main }} />
          )}
          <input type="file" accept="image/*" hidden onChange={onUploadBanner} />
          <ImageListItemBar
            sx={{ mr: 2, background: "none" }}
            position="bottom"
            actionPosition="right"
            actionIcon={<CameraAltOutlinedIcon sx={{ color: grey[400] }} />}
          />
        </CardActionArea>
        <Stack direction="row" sx={{ ml: 2, mt: -6 }} justifyContent="space-between">
          <Box>
            <CardActionArea sx={{ borderRadius: "50%" }} component="label">
              <AvatarBadge type="camera">
                <Avatar sx={{ width: 96, height: 96 }} src={(avatar && URL.createObjectURL(avatar)) || actor.avatar} />
                <input type="file" accept="image/*" hidden onChange={onUploadAvatar} />
              </AvatarBadge>
            </CardActionArea>
          </Box>
        </Stack>
        <Box sx={{ pt: 1 }}>
          <Stack spacing={2}>
            <TextField fullWidth label="Name" value={actor.displayName} onChange={onChangeName} />
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Description"
              value={actor.description}
              onChange={onChangeDescription}
            />
          </Stack>
        </Box>
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

export default DialogProfile;
