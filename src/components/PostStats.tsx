import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { green, pink } from "@mui/material/colors";
import { alpha } from "@mui/material";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  post: AppBskyFeedDefs.PostView;
};

export const PostStats = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <Button
        sx={{ color: green["A400"], "&:hover": { color: green["A400"], backgroundColor: alpha(green["A400"], 0.1) } }}
        variant="text"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          const id = _.last(_.split(props.post.uri, "/"));
          const url = `/profile/${props.post.author.handle}/post/${id}/reposted`;
          navigate(url);
        }}
      >
        {props.post.repostCount} reposts
      </Button>
      <Button
        sx={{ color: pink["A200"], "&:hover": { color: pink["A200"], backgroundColor: alpha(pink["A200"], 0.1) } }}
        variant="text"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          const id = _.last(_.split(props.post.uri, "/"));
          const url = `/profile/${props.post.author.handle}/post/${id}/liked`;
          navigate(url);
        }}
      >
        {props.post.likeCount} likes
      </Button>
    </Stack>
  );
};

export default PostStats;
