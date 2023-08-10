export const useCanvas = () => {
  const resizeImage = async (imageData: Blob): Promise<Blob | null> => {
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return null;

    const image: HTMLImageElement = await new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", reject);
      image.src = URL.createObjectURL(imageData);
    });
    context.canvas.width = image.naturalWidth;
    context.canvas.height = image.naturalHeight;
    context.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    return await new Promise((resolve) => {
      context.canvas.toBlob(resolve, `image/jpeg`, 0.9);
    });
  };

  return { resizeImage };
};

export default useCanvas;
