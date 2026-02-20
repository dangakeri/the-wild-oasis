import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess(user) {
      queryClient.setQueryData(["user"], user.user);
      console.log("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError(error) {
      console.log("ERRROR", error);
      console.error("Login failed:", error);
      toast.error("Provided email or password is incorrect. Please try again.");
    },
  });
  return { login, isLoading };
}
