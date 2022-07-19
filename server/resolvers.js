import { ApolloError } from "apollo-server";
import { generatePassword, checkPassword } from "./password";
import { generateValidToken } from "./auth";
import { User, Roof } from "./models";

export const resolvers = {
  Query: {
    roofs: async (_, {}, context) => {
      if(!context.user) throw new ApolloError("Votre session a expiré. Veuillez vous reconnecter");
      const res = await Roof.find()
      return res
    },
    roof: async (_, { id }) => {},
  },
  Mutation: {
    signUp: async (_, { input }) => {
      // Find if user already exist in DB and throw an error if he exist
      const user = await User.findOne({ username: input.username });
      if (user) {
        throw new ApolloError(
          "Un utilisateur avec cet identifiant existe déja",
        );
      }
      // encrypt user password
      const passwordHash = await generatePassword(input.password);
      if (passwordHash) {
        const { password, ...data } = input;
        // save user to database with encrypted password
        const res = await (
          await User.create({ ...data, password: passwordHash })
        ).save();
        return res;
      }
    },
    signIn: async (_, { username, password }) => {
      // Find if user exist in DB
      const user = await User.findOne({ username });
      // Check if password match with the hashed password in DB
      if (user && (await checkPassword(password, user.password))) {
        const token = generateValidToken(user.id);
        // Add JWT response to user Object
        user.token = token;
        return user;
      }
      throw new ApolloError("Username ou Mot de passe incorrect.");
    },
    createRoof: async (_, { input }, context) => {
      if(!context.user) throw new ApolloError("Votre session a expiré. Veuillez vous reconnecter");
      const res = await (await Roof.create({...input})).save()
      return res
    },
    deleteRoof: async (_, { id }) => {},
    updateRoof: (_, { id, input }) => {},
  },
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ0NmI3OGEwZjc5NWRjNzFhMGVjNmYiLCJpYXQiOjE2NTgyNDYxNTEsImV4cCI6MTY1ODI1MzM1MX0.9uLwnvWb0vCoCHe_HSq8hq7KoyIdCx_wc04geK2njIE