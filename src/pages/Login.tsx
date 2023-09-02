import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import CenterLayout from "@/templates/CenterLayout";
import useAuthentication from "@/hooks/useAuthentication";

export const Login = () => {
  const navigate = useNavigate();
  const { session, onLogin, onChange } = useAuthentication();

  useEffect(() => {
    if (session?.accessJwt && session?.refreshJwt) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <CenterLayout>
      <Card sx={{ minWidth: 480, minHeight: 480, width: "30vw", height: "60vh", p: 3 }} variant="outlined">
        <CardHeader title="RAIN" />
        <CardContent>
          <Stack direction="column" spacing={1}>
            <Box>
              <Typography sx={{ fontWeight: 600, p: 1 }} variant="body2" color={grey[400]}>
                Handle or Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                focused
                onChange={onChange("identifier")}
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, p: 1 }} variant="body2" color={grey[400]}>
                Password
              </Typography>
              <TextField
                sx={{
                  "&:has(> input:-webkit-autofill)": {
                    backgroundColor: "none",
                  },
                }}
                fullWidth
                variant="outlined"
                type="password"
                autoComplete="current-password"
                focused
                onChange={onChange("password")}
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Typography sx={{ fontWeight: 500 }} variant="caption" color={grey[400]}>
              We highly recommned you to use{" "}
              <Link href="https://atproto.com/specs/atp#app-passwords">app password</Link>.
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Button color="primary" variant="contained" onClick={onLogin}>
            LOGIN
          </Button>
        </CardActions>
      </Card>
    </CenterLayout>
  );
};

export default Login;
