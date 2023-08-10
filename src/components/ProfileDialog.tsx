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
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
import useBackdrop from "@/hooks/useBackdrop";
import useActor from "@/hooks/useActor";

type Props = {
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

const MAX_NAME_LENGTH = 64;
const MAX_DESC_LENGTH = 256;

export const ProfileDialog = (props: Props) => {
  const { actor, avatar, banner, onChangeName, onChangeDescription, onUploadAvatar, onUploadBanner, onUpdateActor } =
    useActor();
  const { open, withBackdrop } = useBackdrop();

  const disabled = MAX_NAME_LENGTH < actor.displayName?.length || MAX_DESC_LENGTH < actor.description?.length;

  const onSend = async () => {
    withBackdrop(async () => {
      onUpdateActor();
      props.onClose();
    });
  };

  const onClean = () => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <CardActionArea component="label">
          <CardMedia
            sx={{ borderRadius: 1, height: 140 }}
            component="img"
            image={(banner && URL.createObjectURL(banner)) || actor.banner}
          />
          <input type="file" accept="image/*" hidden onChange={onUploadBanner} />
        </CardActionArea>
        <Stack direction="row" sx={{ ml: 2, mt: -6 }} justifyContent="space-between">
          <Box>
            <CardActionArea sx={{ borderRadius: "50%" }} component="label">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<CameraAltOutlinedIcon sx={{ color: grey[400] }} />}
              >
                <Avatar sx={{ width: 96, height: 96 }} src={(avatar && URL.createObjectURL(avatar)) || actor.avatar} />
                <input type="file" accept="image/*" hidden onChange={onUploadAvatar} />
              </Badge>
            </CardActionArea>
          </Box>
          <Box sx={{ mt: 2, mr: 2 }}>
            <CameraAltOutlinedIcon sx={{ color: grey[400] }} />
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
          <Button onClick={onClean}>Cancel</Button>
          <Button onClick={onSend} disabled={disabled}>
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
