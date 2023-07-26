import _ from "lodash";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardMedia from "@mui/material/CardMedia";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  images: AppBskyEmbedImages.ViewImage[];
};

export const PostImages = (props: Props) => {
  // TODO 画像が3枚のときの対応
  if (_.size(props.images) === 1) {
    return (
      <CardMedia sx={{ borderRadius: 3 }} component="img" image={props.images[0]?.thumb} alt={props.images[0].alt} />
    );
  }
  return (
    <ImageList>
      {_.map(props.images, (image, key) => (
        <ImageListItem key={key}>
          <CardMedia sx={{ borderRadius: 3 }} component="img" image={image?.thumb} alt={image.alt} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default PostImages;
