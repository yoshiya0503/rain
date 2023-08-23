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

export const DialogInviteCodes = (props: Props) => {
  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
      <DialogTitle>Invite Code</DialogTitle>
    </Dialog>
  );
};

export default DialogInviteCodes;
