import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import _ from "lodash";
import Profile from "@/components/Profile";
import Post from "@/components/Post";

const Loaded = () => {
  const me = useStore((state) => state.me);
  const getMe = useStore((state) => state.getMe);

  if (!me) {
    throw getMe();
  }

  return <Profile actor={me} me={me} />;
};

const Loaded2 = () => {
  const { handle } = useParams<"handle">();
  const authorFeed = useStore((state) => state.authorFeed);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);

  if (_.isEmpty(authorFeed)) {
    throw getAuthorFeed(handle || "");
  }

  return (
    <>
      {_.map(authorFeed, (item, key) => {
        if (item.reply) {
          return <Post key={key} post={item.reply.root} />;
        }
        return <Post key={key} post={item.post} />;
      })}
    </>
  );
};

export const Test = () => {
  return (
    <>
      <Suspense fallback={<div>loading111................</div>}>
        <Loaded />
      </Suspense>
      <Suspense fallback={<div>loading22222................</div>}>
        <Loaded2 />
      </Suspense>
    </>
  );
};

export default Test;
