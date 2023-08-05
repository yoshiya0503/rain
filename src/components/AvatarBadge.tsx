import { ReactNode } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { pink, green, blue, purple } from "@mui/material/colors";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import LoopIcon from "@mui/icons-material/LoopRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

type Props = {
  type: "reply" | "like" | "repost" | "quote" | "follow";
  children: ReactNode;
};

const IconWrapper = (props: { color?: string; children: ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      borderRadius: "50%",
      backgroundColor: props.color,
      border: 2,
      borderColor: "#121212",
      height: 20,
      width: 20,
      alignItems: "center",
      justifyContent: "space-around",
    }}
  >
    {props.children}
  </Box>
);

export const AvatarBadge = (props: Props) => {
  let icon = undefined;

  if (props.type === "reply") {
    icon = (
      <IconWrapper color={blue[400]}>
        <ReplyRoundedIcon sx={{ fontSize: 12 }} />
      </IconWrapper>
    );
  }

  if (props.type === "like") {
    icon = (
      <IconWrapper color={pink[400]}>
        <FavoriteIcon sx={{ fontSize: 12 }} />
      </IconWrapper>
    );
  }

  if (props.type === "repost") {
    icon = (
      <IconWrapper color={green[400]}>
        <LoopIcon sx={{ fontSize: 12 }} />
      </IconWrapper>
    );
  }

  if (props.type === "follow") {
    icon = (
      <IconWrapper color={purple[400]}>
        <PersonRoundedIcon sx={{ fontSize: 12 }} />
      </IconWrapper>
    );
  }

  return (
    <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={icon}>
      {props.children}
    </Badge>
  );
};

export default AvatarBadge;
