
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditcabin } from "../../services/apiCabin";
import toast from "react-hot-toast";




export function useEditCabin() {

const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, data }) => createEditcabin(data, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    //   reset();
    },
    onError: (err) => toast.error(err.message || "Edit failed"),
  });
  return {editCabin,isEditing
}}


