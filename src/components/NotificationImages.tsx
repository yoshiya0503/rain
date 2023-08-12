import _ from "lodash";
import CardMedia from "@mui/material/CardMedia";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  images: AppBskyEmbedImages.ViewImage[];
};

export const NotificationImages = (props: Props) => {
  return (
    <ImageList sx={{ width: "100%", height: "100%" }} rowHeight={100} cols={4}>
      {_.map(props.images, (image, key) => (
        <ImageListItem key={key}>
          <CardMedia
            sx={{ borderRadius: 3, width: "100%", height: "100%" }}
            component="img"
            image={image?.thumb}
            alt={image.alt}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default NotificationImages;
