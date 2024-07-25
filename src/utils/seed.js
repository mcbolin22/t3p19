const { BlogModel } = require("../models/blogModel");
const { UserModel } = require("../models/userModel");
const { databaseConnect, databaseClear, databaseClose } = require("./database");


async function seedUsers () {
    let userData = [
        {
            username: "Colin"
        },
        {
            username: "Eevee"
        }
    ];

    let result = await UserModel.insertMany(userData)
    console.log(result);
    return result;
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
    let newBlogs = await seedBlogPosts(newUsers);

    console.log("Seeded data!");
    await databaseClose();
}

seed();