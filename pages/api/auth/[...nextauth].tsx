import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {connectToDatabase} from "../../../lib/db";
import {verifyPassword} from "../../../lib/auth";

interface CredentialType {
    email: string
    password: string
}

export default NextAuth(
    {
        session: {
            jwt: true
        },
        providers: [Providers.Credentials({
            async authorize(credentials: Record<keyof CredentialType, string>): Promise<any> {
                const client = await connectToDatabase();
                const userCollection = client.db().collection('users');
                const user = await userCollection.findOne({email: credentials.email})
                if (!user) {
                    client.close();
                    throw  new Error('No user found!')
                }
                const isValid = await verifyPassword(credentials.password, user.passwrord);
                if (!isValid) {
                    client.close();
                    throw  new Error('Could not log you in!')
                }
                client.close();
                return {email: user.email}
            }
        })]
    }
);
