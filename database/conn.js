// const MONGO_URI = "mongodb+srv://balram222:uddhav222@nextjscrud.ai3jhty.mongodb.net/?retryWrites=true&w=majority"
import mongoose from "mongoose";

// here we Connect data to MongoDB

const connectMongo = async () => {
    try {
       const {connection} = await mongoose.connect(process.env.MONGO_URI)
        
        if (connection.readyState == 1) {
            console.log("Database Connected")
        }

    } catch(errors) {
        return Promise.reject(errors)
    }
}

export default connectMongo;