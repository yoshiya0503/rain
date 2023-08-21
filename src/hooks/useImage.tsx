import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import useCanvas from "@/hooks/useCanvas";

export const useImage = () => {
  const { resizeImage } = useCanvas();
  const onUploadBlob = useStore((state) => state.uploadBlob);
  const [images, setImages] = useState<File[]>([]);

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.target.files) {
        const items = _.map(e.target.files, (item) => item);
        const result = _.concat(images, items);
        setImages(_.take(result, 4));
      }
    },
    [images, setImages]
  );

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const items = _.map(e.dataTransfer.files, (item) => item);
      const result = _.concat(images, items);
      setImages(_.take(result, 4));
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
        const resized = await resizeImage(image);
        if (!resized) return;
        const arrayBuffer = await resized.arrayBuffer();
        return await onUploadBlob(new Uint8Array(arrayBuffer));
      })
    );
    const uploadImages = _.map(result, (item) => ({ image: item?.blob, alt: "" }));
    return { images: uploadImages, $type: "app.bsky.embed.images" };
  };

  return { images, onUpload, onDrop, onRemove, fetchEmbedImages, onClearImages };
};

export default useImage;
