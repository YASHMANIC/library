const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data:[
                {name:"FULL STACK"},
                {name:"FRONTEND"},
                {name:"BACKEND"},
                {name:"CLOUD"},
                {name:"DATABASE"},
                {name:"MACHINE LEARNING"},
                {name:"ARTIFICIAL INTELLIGENCE"},
            ]
        })
        console.log("successfully saved");
    }catch(err) {
        console.error("Error seeding the database",err);
    }
    finally {
        await db.$disconnect();
    }
}
main()