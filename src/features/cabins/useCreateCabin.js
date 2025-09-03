import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditcabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();

  // CREATE
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditcabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    //   reset();
    },
    onError: (err) => toast.error(err.message || "Create failed"),
  });

  return{createCabin,isCreating}
}


