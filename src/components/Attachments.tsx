import PostArticle from "@/components/PostArticle";
import PostImages from "@/components/PostImages";
import PostQuote from "@/components/PostQuote";
import PostFeed from "@/components/PostFeed";
import {
  AppBskyFeedDefs,
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
} from "@atproto/api";

type Props = {
  embed:
    | AppBskyEmbedRecordWithMedia.View
    | AppBskyEmbedRecord.View
    | AppBskyEmbedExternal.View
    | AppBskyEmbedImages.View
    | { [k: string]: unknown; $type: string }
    | undefined;
  onOpenImage?: (images: AppBskyEmbedImages.ViewImage[]) => void;
};

export const Attachments = (props: Props) => {
  const { embed } = props;
  return (
    <>
      {AppBskyEmbedImages.isView(embed) && <PostImages images={embed.images} onOpenImage={props.onOpenImage} />}
      {AppBskyEmbedExternal.isView(embed) && <PostArticle article={embed.external} />}
      {AppBskyEmbedRecord.isView(embed) && AppBskyEmbedRecord.isViewRecord(embed.record) && (
        <PostQuote record={embed.record} />
      )}
      {AppBskyEmbedRecord.isView(embed) && AppBskyFeedDefs.isGeneratorView(embed.record) && (
        <PostFeed record={embed.record} />
      )}
      {AppBskyEmbedRecordWithMedia.isView(embed) && AppBskyEmbedImages.isView(embed.media) && (
        <PostImages images={embed.media.images} onOpenImage={props.onOpenImage} />
      )}
      {AppBskyEmbedRecordWithMedia.isView(embed) && AppBskyEmbedExternal.isView(embed.media) && (
        <PostArticle article={embed.media.external} />
      )}
      {AppBskyEmbedRecordWithMedia.isView(embed) && AppBskyEmbedRecord.isViewRecord(embed.record.record) && (
        <PostQuote record={embed.record.record} />
      )}
    </>
  );
};

export default Attachments;
