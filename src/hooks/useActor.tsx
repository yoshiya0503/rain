import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import useMe from "@/hooks/useMe";
import useCanvas from "@/hooks/useCanvas";
import { AppBskyActorDefs } from "@atproto/api";

export const useActor = () => {
  const me = useMe();
  const { resizeImage } = useCanvas();
  const updateProfile = useStore((state) => state.updateProfile);
  const onUploadBlob = useStore((state) => state.uploadBlob);
  const [actor, setActor] = useState<
    Required<Pick<AppBskyActorDefs.ProfileViewDetailed, "displayName" | "description" | "avatar" | "banner">>
  >({
    displayName: me.displayName || "",
    description: me.description || "",
    avatar: me.avatar || "",
    banner: me.banner || "",
  });
  const [avatar, setAvatar] = useState<File | null | undefined>();
  const [banner, setBanner] = useState<File | null | undefined>();

  const onChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActor({ ...actor, displayName: e.currentTarget.value });
    },
    [actor, setActor]
  );

  const onChangeDescription = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActor({ ...actor, description: e.currentTarget.value });
    },
    [actor, setActor]
  );

  const onUploadAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setAvatar(_.first(e.target.files));
      }
    },
    [setAvatar]
  );

  const onUploadBanner = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setBanner(_.first(e.target.files));
      }
    },
    [setBanner]
  );

  const onRemoveAvatar = useCallback(() => {
    setAvatar(undefined);
    setActor({ ...actor, avatar: "" });
  }, [actor, setActor, setAvatar]);

  const onRemoveBanner = useCallback(() => {
    setBanner(undefined);
    setActor({ ...actor, banner: "" });
  }, [actor, setActor, setBanner]);

  const fetchBlob = useCallback(async () => {
    const [uploadedAvatar, uploadedBanner] = await Promise.all(
      _.map([avatar, banner], async (image) => {
        if (!image) return;
        const resized = await resizeImage(image);
        if (!resized) return;
        const arrayBuffer = await resized.arrayBuffer();
        return await onUploadBlob(new Uint8Array(arrayBuffer));
      })
    );
    return { avatar: uploadedAvatar?.blob, banner: uploadedBanner?.blob };
  }, [avatar, banner, onUploadBlob, resizeImage]);

  const onUpdateActor = useCallback(async () => {
    const { avatar, banner } = await fetchBlob();
    const update = { ...actor, avatar, banner };
    updateProfile(update);
  }, [updateProfile, actor, fetchBlob]);

  return { actor, avatar, banner, onUpdateActor, onChangeName, onChangeDescription, onUploadAvatar, onUploadBanner };
};

export default useActor;
