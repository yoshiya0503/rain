import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type Props = {
  message: {
    title: string;
    description?: string;
    status?: "error" | "warning" | "success" | "info";
  };
  open: boolean;
  onClose: () => void;
};

export const Message = (props: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      open={props.open}
      onClose={props.onClose}
    >
      <Alert variant="outlined" onClose={props.onClose} severity={props.message.status}>
        <AlertTitle> {props.message.title} </AlertTitle>
        {props.message.description}
      </Alert>
    </Snackbar>
  );
};

export default Message;
