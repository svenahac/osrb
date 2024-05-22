import supabase from "./supabaseClient";

export const getContent = async () => {
  const { data, error } = await supabase.from("content").select("*");

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};
