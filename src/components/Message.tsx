import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useMessage from "@/hooks/useMessage";

export const Message = () => {
  const [open, message, closeMessage] = useMessage();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={3000}
      open={open}
      onClose={closeMessage}
    >
      <Alert variant="outlined" onClose={closeMessage} severity={message?.status}>
        <AlertTitle> {message?.title} </AlertTitle>
        {message?.description}
      </Alert>
    </Snackbar>
  );
};

export default Message;
