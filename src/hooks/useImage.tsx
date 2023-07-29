import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";

export const useImage = () => {
  const onUploadBlob = useStore((state) => state.uploadBlob);
  const [images, setImages] = useState<File[]>([]);

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const items = _.map(e.target.files, (item) => item);
        const result = _.concat(images, items);
        setImages(_.take(result, 4));
      }
    },
    [images, setImages]
  );

  const onRemove = useCallback(
    (index: number) => {
      setImages(_.reject(images, (_, key) => key === index));
    },
    [images, setImages]
  );

  const onClearImages = useCallback(() => {
    setImages([]);
  }, [setImages]);

  const fetchEmbedImages = async () => {
    if (_.isEmpty(images)) {
      return;
    }
    const result = await Promise.all(
      _.map(images, async (image) => {
        const arrayBuffer = await image.arrayBuffer();
        return await onUploadBlob(new Uint8Array(arrayBuffer));
      })
    );
    const uploadImages = _.map(result, (item) => ({ image: item?.blob, alt: "" }));
    return { images: uploadImages, $type: "app.bsky.embed.images" };
  };

  return { images, onUpload, onRemove, fetchEmbedImages, onClearImages };
};

export default useImage;
