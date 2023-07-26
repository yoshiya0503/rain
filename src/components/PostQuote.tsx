import _ from "lodash";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import ProfileInline from "@/components/ProfileInline";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import Linkify from "linkify-react";
import { AppBskyEmbedImages, AppBskyEmbedExternal, AppBskyEmbedRecord } from "@atproto/api";

type Props = {
  record: AppBskyEmbedRecord.ViewRecord;
};

export const PostQuote = (props: Props) => {
  const onLink = () => {
    console.log("実装中");
  };

  const embedImage = _.find(props.record.embeds, (item) => item.$type === "app.bsky.embed.images#view");
  const embedArticle = _.find(props.record.embeds, (item) => item.$type === "app.bsky.embed.external#view");

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onLink}>
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }} spacing={2}>
            <ProfileInline profile={props.record.author} size="small" />
            <Typography sx={{ whiteSpace: "pre-wrap" }} variant="caption">
              <Linkify>{_.get(props.record.value, "text")}</Linkify>
            </Typography>
            {embedImage ? <PostImages images={embedImage.images as AppBskyEmbedImages.ViewImage[]} /> : null}
            {embedArticle ? <PostArticle article={embedArticle.external as AppBskyEmbedExternal.ViewExternal} /> : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostQuote;
