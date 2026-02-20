import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      console.log("Signup successful", user);
      toast.success(
        "Signup successful! Please check your email to confirm your account.",
      );
    },
  });
  return { signup, isLoading };
}
