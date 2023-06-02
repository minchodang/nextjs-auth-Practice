import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/client';
import { NextApiResponse } from 'next-auth/internals/utils';

const handler = async (req: IncomingMessage | undefined, res: NextApiResponse) => {
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
};

export default handler;
