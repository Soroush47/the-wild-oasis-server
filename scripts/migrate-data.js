const { PrismaClient } = require("@prisma/client");

const local = new PrismaClient({
    datasources: { db: { url: process.env.LOCAL_DATABASE_URL } },
});

const remote = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
});

async function main() {
    console.log("Starting migration...");

    // 1. SETTINGS
    const settings = await local.setting.findMany();
    await remote.setting.createMany({ data: settings });

    // 2. CABINS
    const cabins = await local.cabin.findMany();
    await remote.cabin.createMany({ data: cabins });

    // 3. GUESTS
    const guests = await local.guest.findMany();
    await remote.guest.createMany({ data: guests });

    // 4. BOOKINGS
    const bookings = await local.booking.findMany();
    await remote.booking.createMany({ data: bookings });

    // 5. USERS
    const users = await local.user.findMany();
    await remote.user.createMany({ data: users });

    console.log("DONE 🚀");
}

main()
    .catch(console.error)
    .finally(async () => {
        await local.$disconnect();
        await remote.$disconnect();
    });
