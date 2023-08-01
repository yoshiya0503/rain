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
  AppBskyFeedDefs,
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from "@atproto/api";

type Props = {
  record: AppBskyEmbedRecord.ViewRecord;
};

export const PostQuote = (props: Props) => {
  const onLink = () => {
    console.log("実装中");
  };

  const dateLabel = formatDistanceToNowStrict(Date.parse(props.record.indexedAt), { locale: ja });

  return (
    <Card variant="outlined">
      <CardActionArea component="div" onClick={onLink}>
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }} spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <ProfileInline profile={props.record.author} size="small" />
              <Typography color={grey[500]} variant="caption">
                {dateLabel}
              </Typography>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
              <Linkify>{_.get(props.record.value, "text")}</Linkify>
            </Typography>
            {_.map(props.record.embeds, (embed, key) => {
              if (AppBskyEmbedImages.isView(embed)) {
                return <PostImages key={key} images={embed.images} />;
              }
              if (AppBskyEmbedExternal.isView(embed)) {
                return <PostArticle key={key} article={embed.external} />;
              }
              if (AppBskyEmbedRecordWithMedia.isView(embed)) {
                if (AppBskyEmbedImages.isView(embed.media)) {
                  return <PostImages key={key} images={embed.media.images} />;
                }
                if (AppBskyEmbedExternal.isView(embed.media)) {
                  return <PostArticle key={key} article={embed.media.external} />;
                }
              }
              if (AppBskyEmbedRecord.isView(embed)) {
                if (AppBskyEmbedRecord.isViewRecord(embed.record)) {
                  return <PostQuote key={key} record={embed.record} />;
                }
                if (AppBskyFeedDefs.isGeneratorView(embed.record)) {
                  return <PostFeed key={key} record={embed.record} />;
                }
              }
            })}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostQuote;
