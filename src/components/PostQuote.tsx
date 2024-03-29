import _ from "lodash";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import ProfileHeader from "@/components/ProfileHeader";
import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostFeed from "@/components/PostFeed";
import Text from "@/components/Text";
import usePost from "@/hooks/usePost";
import useLocale from "@/hooks/useLocale";
import {
  AppBskyFeedDefs,
  AppBskyFeedPost,
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from "@atproto/api";

type Props = {
  record: AppBskyEmbedRecord.ViewRecord;
  onOpenImage?: (images: AppBskyEmbedImages.ViewImage[]) => void;
};

export const PostQuote = (props: Props) => {
  const { onViewThread } = usePost();
  const { fromNow } = useLocale();

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardActionArea
        component="div"
        onClick={(e) => {
          e.stopPropagation();
          onViewThread(props.record)();
        }}
      >
        <CardContent>
          <Stack sx={{ mt: 1, mb: 1 }} spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <ProfileHeader profile={props.record.author} size="small" />
              <Typography color={grey[500]} variant="caption">
                {fromNow(props.record.indexedAt)}
              </Typography>
            </Stack>
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
              <Text>{AppBskyFeedPost.isRecord(props.record.value) && props.record.value.text}</Text>
            </Typography>
            {_.map(props.record.embeds, (embed, key) => {
              if (AppBskyEmbedImages.isView(embed)) {
                return <PostImages key={key} images={embed.images} onOpenImage={props.onOpenImage} />;
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
