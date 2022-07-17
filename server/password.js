import bcrypt from "bcrypt";

/*Func to generate a secure password*/
export const generatePassword = async (plainTextPassword) => {
  const result = await bcrypt.hash(plainTextPassword, 10);
  return result;
};

/*Func to check if password match*/
export const checkPassword = async (plainTextPassword, hashFromDB) => {
  const result = await bcrypt.compare(plainTextPassword, hashFromDB);
  return result;
};
