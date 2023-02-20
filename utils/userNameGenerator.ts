export const createUsername = (name) => {
  let username = name.toLowerCase().replace(/\s+/g, "_");
  username += Math.floor(Math.random() * 1000);
  return username;
};
