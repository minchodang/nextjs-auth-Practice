import { IncomingMessage } from 'http';
import { hashPassword, verifyPassword } from 'lib/auth';
import { connectToDatabase } from 'lib/db';
import { getSession } from 'next-auth/client';
import { NextApiResponse } from 'next-auth/internals/utils';

const handler = async (req: IncomingMessage | undefined | any, res: NextApiResponse) => {
    if (req?.method !== 'PATCH') {
        return;
    }
    const session = await getSession({
        req: req,
    });
    if (!session) {
        res?.status(401).json({ message: 'Not authenticated!' });
        return;
    }
    const userEmail = session.user?.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const client = await connectToDatabase();

    const userCollection = client.db().collection('users');
    const user = await userCollection.findOne({
        email: userEmail,
    });
    if (!user) {
        res.status(404).json({
            message: 'User not found.',
        });
        client.close();
        return;
    }
    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

    if (!passwordsAreEqual) {
        res.status(403).json({
            message: 'Invalid password.',
        });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);
    const result = await userCollection.updateOne(
        {
            email: userEmail,
        },
        {
            $set: { password: hashedPassword },
        },
    );
    client.close();
    res.status(200).json({
        message:'Password updated!'
    })
};

export default handler;
