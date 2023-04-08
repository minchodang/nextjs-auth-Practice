import {MongoClient} from "mongodb";

export const connectToDatabase = async () => {
    return await MongoClient.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_KEY}@${process.env.MONGO_CLUSTER_NAME}.l1xz3m6.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`);
}
