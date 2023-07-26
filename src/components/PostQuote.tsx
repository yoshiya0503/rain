import _ from "lodash";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import ProfileInline from "@/components/ProfileInline";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostFeed from "@/components/PostFeed";
import Linkify from "linkify-react";
import {
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyFeedGenerator,
} from "@atproto/api";

type Props = {
  record: AppBskyEmbedRecord.ViewRecord;
};

export const PostQuote = (props: Props) => {
  const onLink = () => {
    console.log("実装中");
  };

  const embedImage = _.find(props.record.embeds, (item) => item.$type === "app.bsky.embed.images#view");
  const embedArticle = _.find(props.record.embeds, (item) => item.$type === "app.bsky.embed.external#view");
  const embedMedia = _.find(props.record.embeds, (item) => item.$type === "app.bsky.embed.recordWithMedia#view");
  const embedRecord = _.find(props.record.embeds, (item) => item.$type === "app.bsky.embed.record#view");
  const images = embedImage?.images as AppBskyEmbedImages.ViewImage[];
  const article = embedArticle?.external as AppBskyEmbedExternal.ViewExternal;
  const media = embedMedia?.media as AppBskyEmbedRecordWithMedia.Main;
  const mediaImages = media?.images as AppBskyEmbedImages.ViewImage[];
  const record = embedRecord?.record as AppBskyEmbedRecord.ViewRecord;
  const feedRecord = embedRecord?.record as AppBskyFeedGenerator.Record;

  const dateLabel = formatDistanceToNowStrict(Date.parse(props.record.indexedAt), { locale: ja });

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onLink}>
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }} spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <ProfileInline profile={props.record.author} size="small" />
              <Typography color={grey[500]} variant="caption">
                {dateLabel}
              </Typography>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-wrap" }} variant="caption">
              <Linkify>{_.get(props.record.value, "text")}</Linkify>
            </Typography>
            {media ? <PostImages images={mediaImages} /> : null}
            {images ? <PostImages images={images} /> : null}
            {article ? <PostArticle article={article} /> : null}
            {record?.author ? <PostQuote record={record} /> : null}
            {feedRecord?.creator ? <PostFeed record={feedRecord} /> : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostQuote;
