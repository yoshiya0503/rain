import _ from "lodash";
import CardMedia from "@mui/material/CardMedia";
import { AppBskyEmbedImages } from "@atproto/api";

type Props = {
  images: AppBskyEmbedImages.ViewImage[];
};

export const PostImages = (props: Props) => {
  return <CardMedia sx={{ borderRadius: 3 }} component="img" image={_.get(props.images, 0).thumb} alt="" />;
};
export default PostImages;
