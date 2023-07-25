import PostDialog from "@/components/PostDialog";
import useDialog from "@/hooks/useDialog";
import Button from "@mui/material/Button";
import Create from "@mui/icons-material/Create";

type Props = {
  label: string;
};

export const PostButton = (props: Props) => {
  const [isOpen, openPostDialog, closePostDialog] = useDialog();

  return (
    <>
      <Button
        sx={{ mt: 1, width: "100%", borderRadius: 6 }}
        variant="contained"
        startIcon={<Create />}
        onClick={openPostDialog}
      >
        {props.label}
      </Button>
      <PostDialog title="send post" open={isOpen} onClose={closePostDialog} />
    </>
  );
};

export default PostButton;
