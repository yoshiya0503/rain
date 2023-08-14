import _ from "lodash";
import CardMedia from "@mui/material/CardMedia";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  images: AppBskyEmbedImages.ViewImage[];
};

// TODO 画像の全画面表示

export const PostImages = (props: Props) => {
  if (_.size(props.images) === 1) {
    return (
      <CardMedia sx={{ borderRadius: 3 }} component="img" image={props.images[0]?.thumb} alt={props.images[0].alt} />
    );
  }

  if (_.size(props.images) === 3) {
    return (
      <ImageList sx={{ width: "100%", height: "100%" }} cols={4} rowHeight={200}>
        {_.map(props.images, (image, key) => (
          <ImageListItem key={key} cols={key === 0 ? 4 : 2}>
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
  }

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} rowHeight={200}>
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
export default PostImages;
