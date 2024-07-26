const { BlogModel } = require("../models/blogModel");
const { UserModel } = require("../models/userModel");
const { comparePasswords, createJWT, validateJWT } = require("./authHelpers");
const { databaseConnect, databaseClear, databaseClose } = require("./database");


async function seedUsers () {
    let userData = [
        {
            username: "Colin",
            password: "password"
        },
        {
            username: "Eevee",
            password: "pokemon"
        }
    ];

    let thirdUser = {
        username: "Brock",
        password: "jennyjoy"
    };

    console.log("Creating a user with .create()");
    let Brock = await UserModel.create(thirdUser);

    console.log("Calling save on the created user:");
    await Brock.save();

    console.log("Brock's encrypted password is: " + Brock.password);
    let doesJennyjoyMatch = await comparePasswords("jennyjoy", Brock.password);
    console.log("Brock's password in jennyjoy: " + doesJennyjoyMatch);

    // console.log("Creating users from insertMany:"); 
    // let result = await UserModel.insertMany(userData)

    // If you had to do the presave hook on array of seed data (insertMany) use the following.
    // The following loops through the array of user data and returns array of promises and returns array of users after Promise.all has finished.
    console.log("Creating users in bulk by Promise.all over userModel.create:") 
    let result = await Promise.all(userData.map(async (user) => {
        let newUser = await UserModel.create(user);
        return newUser;
    }));

    console.log([...result, Brock]);
    return [...result, Brock];
}

async function seedBlogPosts (usersToUse) {
    let blogData = [
        {
            title: "Blog Title",
            content: "Lorem",
            author: usersToUse[0].id,
            headerImage: "https://placehold.co/600x400/EEE/31343C",
            tags: ["seeded", "blog", "pokemon"],
            categories: ["coding", "life"]
        },
        {
            title: "Another Blog Title",
            content: "Lorem",
            author: usersToUse[0].id,
            headerImage: "https://placehold.co/600x400/EEE/31343C",
            tags: ["seeded", "food", "pokemon"],
            categories: ["coding", "travel"]
        },
        {
            title: "Third Blog Title",
            content: "Lorem",
            author: usersToUse[0].id,
            headerImage: "https://placehold.co/600x400/EEE/31343C",
            tags: ["seeded", "food", "pokemon"],
            categories: ["coding", "photography"]
        },
    ];

    let result = await BlogModel.insertMany(blogData);
    console.log(result);
    return result;
}

async function seed() {

    await databaseConnect();
    await databaseClear();

    let newUsers = await seedUsers();
    console.log("New users about to be given to the seedBlog function:");
    console.log(newUsers)
    let newBlogs = await seedBlogPosts(newUsers);

    let newJWT = createJWT(newUsers[0]._id);
    console.log("New JWT: " + newJWT);

    validateJWT(newJWT);

    console.log("Seeded data!");
    await databaseClose();
}

seed();