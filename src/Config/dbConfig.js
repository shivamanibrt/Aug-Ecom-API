import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const conStr = process.env.MONGO_CLIENT;
        if (!conStr) {
            return console.log("There is no connection string available in process.env.MONGO_CLIENT")
        }
        const con = await mongoose.connect(conStr);
        con && console.log('Mongo Db Connected')
    } catch (error) {
        console.log(error)
    }
}
