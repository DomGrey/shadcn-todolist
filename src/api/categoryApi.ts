export const fetchCategories = async () => {
  const response = await fetch(
    "https://wholesale-amusing-sandalwood.glitch.me/categories"
  );
  return await response.json();
};
