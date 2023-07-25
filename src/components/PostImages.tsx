import _ from "lodash";
import CardMedia from "@mui/material/CardMedia";

type Props = {
  images: object;
};

export const PostImages = (props: Props) => {
  return <CardMedia sx={{ borderRadius: 3 }} component="img" image={_.get(props.images, 0).thumb} alt="" />;
};
export default PostImages;
