import mongoose, {Mongoose} from 'mongoose' 

const MONGO_URL=process.env.MONGO_URL!

interface MongooseConn {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

let cashed: any = (global as any).mongoose

if(cashed){
    cashed = (global as any).mongoose ={
        conn: null,
        promise: null
    }
}

export const connect = async () => {
    if(cashed.conn){
        return cashed.conn
    }

    cashed.promise = cashed.promise || mongoose.connect(MONGO_URL)

    cashed.conn = await cashed.promise

    cashed.conn = await cashed.promise

    return cashed.conn
}

export const disconnect = async () => {
    if(cashed.conn){
        await mongoose.disconnect()
        cashed.conn = null
        cashed.promise = null
    }
}
