import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditcabin(newCabin, id) {
const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);

  // const hasImagePath=newCabin.image?.startsWith(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")

  const imagePath =hasImagePath?newCabin?.image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1 . create/Edit cabin
  let query = supabase.from("cabins")
  // A) CREATE
  if (!id)query=
    query
      .insert([{ ...newCabin, image: imagePath }])
      .select().single()
  // B)EDIT
  if (id)query= query
    .update({ ...newCabin, image: imagePath })
    .eq('id', id)
    
  const { data, error } = await query
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  if (storageError) { await supabase.from("cabins").delete().eq("id", data.id); }
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
