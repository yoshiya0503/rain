import { useCallback, useState } from "react";
import { useStore } from "@/stores";

export const useAuthentication = () => {
  const [form, setForm] = useState<{ identifier: string; password: string }>({ identifier: "", password: "" });
  const session = useStore((state) => state.session);
  const resume = useStore((state) => state.resume);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  const onLogin = useCallback(() => {
    login(form?.identifier, form?.password);
  }, [login, form]);

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  const onChange = useCallback(
    (name: "identifier" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((state) => ({ ...state, [name]: e.target.value }));
    },
    [setForm]
  );

  return { session, resume, onChange, onLogin, onLogout };
};

export default useAuthentication;
