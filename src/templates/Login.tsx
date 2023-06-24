import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type Props<T> = {
  title: string;
  form: T;
  onLogin: (data: T) => void;
};

export const Login = <T,>(props: Props<T>) => {
  return (
    <Container maxWidth="sm" sx={{ mt: "10%" }}>
      <Card sx={{ width: 480, height: 320 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            SKYLINE
          </Typography>
        </CardContent>
        <CardContent>
          <Stack direction="column" spacing={2} sx={{ m: 2 }}>
            <TextField label="username or email" variant="outlined" focused />
            <TextField label="password" variant="outlined" type="password" autoComplete="current-password" focused />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button form="login" color="primary" type="submit" variant="outlined" onClick={() => {props.onLogin()}}>
            LOGIN
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Login;
