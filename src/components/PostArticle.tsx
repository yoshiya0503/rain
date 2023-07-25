import _ from "lodash";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Linkify from "linkify-react";

// TODO 型指定
type Props = {
  article: object;
};

export const PostArticle = (props: Props) => {
  const onLink = () => {
    window.open(_.get(props.article, "uri"), "_blank");
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onLink}>
        <CardMedia sx={{ height: 200 }} component="img" image={_.get(props.article, "thumb")} alt="" />
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body1">
            <Linkify>{_.get(props.article, "title")}</Linkify>
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
            <Linkify>{_.get(props.article, "uri")}</Linkify>
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="caption">
            {_.get(props.article, "description")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostArticle;
