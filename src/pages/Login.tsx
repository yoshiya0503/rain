import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useStore } from "@/stores";

export const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const session = useStore((state) => state.session);
  const [form, setForm] = useState<{ identifier: string; password: string }>({ identifier: "", password: "" });

  useEffect(() => {
    if (session?.accessJwt && session?.refreshJwt) {
      navigate("/");
    }
  }, [session, navigate]);

  const onLogin = useCallback(() => {
    login(form?.identifier, form?.password);
  }, [login, form]);

  const onChange = useCallback(
    (name: "identifier" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((state) => ({ ...state, [name]: e.target.value }));
    },
    [setForm]
  );

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
            <TextField label="username or email" variant="outlined" focused onChange={onChange("identifier")} />
            <TextField
              label="password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              focused
              onChange={onChange("password")}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button form="login" color="primary" type="submit" variant="outlined" onClick={onLogin}>
            LOGIN
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Login;
