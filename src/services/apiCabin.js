import supabase,{supabaseUrl} from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createcabin(newCabin) {

  const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll("/","")

  const imagePath=`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  // 1 . create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin,image:imagePath}])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
// 2. Upload image
const {  error :storageError} = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)

  if(storageError){await supabase.from("cabins").delete().eq("id", data.id);}
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
