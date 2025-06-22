import mongoose from "mongoose";

const connectToDB = async () => {
    try {

        await mongoose.connect('mongodb+srv://ganilbatsityan:<db_password>@netflic-cluster.4zg73zn.mongodb.net/')

        console.log('mongodb is connected')
    }catch(e){
        console.log(e);
    }

}
export  default connectToDB;