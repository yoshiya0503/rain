import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Linkify from "linkify-react";
import { AppBskyEmbedExternal } from "@atproto/api";

type Props = {
  article: AppBskyEmbedExternal.ViewExternal;
};

export const PostArticle = (props: Props) => {
  const onLink = () => {
    window.open(props.article.uri, "_blank");
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onLink}>
        <CardMedia sx={{ height: 200 }} component="img" image={props.article.thumb} alt="" />
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body1">
            <Linkify>{props.article.title}</Linkify>
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
            <Linkify>{props.article.uri}</Linkify>
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="caption">
            <Linkify>{props.article.description}</Linkify>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostArticle;
