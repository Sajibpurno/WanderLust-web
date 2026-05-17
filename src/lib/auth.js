import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("wanderlust");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders:{
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  // log in korle auto token make howar jonne
  session : {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      //max- 7 days
      maxAge:  7* 24 * 60 * 60
    }
  },
  plugins: [
        jwt() 
    ]
});