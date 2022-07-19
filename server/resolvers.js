import { ApolloError } from "apollo-server";
import { generatePassword, checkPassword } from "./password";
import { generateValidToken } from "./auth";
import { User, Roof } from "./models";

export const resolvers = {
  Query: {
    roofs: async (_, {}, context) => {
      if (!context.user)
        throw new ApolloError(
          "Votre session a expiré. Veuillez vous reconnecter",
        );
      const res = await Roof.find();
      return res;
    },
    roof: async (_, { id }, context) => {
      if (!context.user)
        throw new ApolloError(
          "Votre session a expiré. Veuillez vous reconnecter",
        );
      const res = await Roof.findById(id);
      return res;
    },
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
      if (!context.user)
        throw new ApolloError(
          "Votre session a expiré. Veuillez vous reconnecter",
        );
      const res = await (await Roof.create({ ...input })).save();
      return res;
    },
    deleteRoof: async (_, { id }, context) => {
      if (!context.user)
        throw new ApolloError(
          "Votre session a expiré. Veuillez vous reconnecter",
        );
      const res = await await Roof.deleteOne({ _id: id });
      if (res) {
        return await Roof.find();
      }
    },
    updateRoof: async (_, { id, input }, context) => {
      if (!context.user)
        throw new ApolloError(
          "Votre session a expiré. Veuillez vous reconnecter",
        );
      const res = await Roof.findOneAndUpdate(
        { _id: id },
        { ...input },
        { new: true },
      );
      return res;
    },
  },
};
