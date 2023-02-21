import mongoose from "mongoose";

const persistence = "MONGO";

export let usersService;

switch (persistence) {
    case 'MONGO':
        mongoose.set('strictQuery', false)
        const connection = mongoose.connect("mongodb+srv://carloscogliandro:backendcarlos@cluster0.ng7biv3.mongodb.net/ecommerce?retryWrites=true&w=majority");
        const { default: MongoUser } = await import('./mongodb/UsersContainer.js')
        usersService = new MongoUser();
        break;
    case 'FILESYSTEM':
        const { default: FSUser } = await import('./filesystem/UsersContainer.js')
        usersService = new FSUser();
        break;
}

