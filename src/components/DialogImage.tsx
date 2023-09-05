import _ from "lodash";
import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  images?: AppBskyEmbedImages.ViewImage[];
  open: boolean;
  onClose: () => void;
};

export const DialogImage = (props: Props) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const image = props.images && props.images[imageIndex];

  const onNavigateImage = useCallback(
    (add: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (imageIndex === _.size(props.images) - 1) return setImageIndex(0);
      setImageIndex(imageIndex + add);
    },
    [imageIndex, props.images, setImageIndex]
  );

  const onClear = useCallback(() => {
    setImageIndex(0);
    props.onClose();
  }, [setImageIndex, props]);

  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open} onClick={onClear}>
      <Box>
        <Stack alignItems="flex-end" justifyContent="flex-end">
          <Box>
            <IconButton size="large" onClick={onClear}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            size="large"
            disabled={imageIndex === 0 || _.size(props.images) === 1}
            onClick={onNavigateImage(-1)}
          >
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <CardActionArea onClick={onNavigateImage(1)}>
            <CardMedia
              sx={{ borderRadius: 3, maxWidth: "80vh", maxHeight: "80vh" }}
              component="img"
              image={image?.thumb}
              alt={image?.alt}
            />
            {image?.alt && <ImageListItemBar subtitle={image?.alt} position="bottom" />}
          </CardActionArea>
          <IconButton
            size="large"
            disabled={imageIndex === _.size(props.images) - 1 || _.size(props.images) === 1}
            onClick={onNavigateImage(1)}
          >
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Stack>
      </Box>
    </Backdrop>
  );
};

export default DialogImage;
