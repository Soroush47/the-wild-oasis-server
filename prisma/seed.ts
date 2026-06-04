// import "dotenv/config";
import * as dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import db from "../db.json";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
console.log(
    "🔍 Checking DATABASE_URL:",
    process.env.DATABASE_URL ? "✅ Found" : "❌ NOT FOUND",
);

const prisma = new PrismaClient();

console.log(db);

async function main() {
    console.log("🚀 Starting seeding...");

    // ۱. پاک‌سازی دیتابیس برای جلوگیری از خطای تکراری (Conflict)
    // ترتیب حذف مهم است (اول روابط/Booking، بعد موجودیت‌های اصلی)
    console.log("🧹 Cleaning up old data...");
    await prisma.booking.deleteMany();
    await prisma.guest.deleteMany();
    await prisma.cabin.deleteMany();
    await prisma.setting.deleteMany();
    console.log("🧹 Database is cleaned.");

    console.log("Seeding cabins...");
    const formatedCabins = db.cabins.map(cabin => ({
        ...cabin,
        createdAt: new Date(cabin.createdAt),
    }));
    await prisma.cabin.createMany({
        data: formatedCabins,
    });

    console.log(`Seeded ${formatedCabins.length} cabins.`);

    console.log("Seeding guests...");
    const formatedGuests = db.guests.map(guest => ({
        ...guest,
        createdAt: new Date(guest.createdAt),
    }));
    await prisma.guest.createMany({
        data: formatedGuests,
    });
    console.log(`Seeded ${formatedGuests.length} guests.`);

    console.log("Seeding bookings...");
    const formatedBookings = db.bookings.map(booking => ({
        ...booking,
        createdAt: new Date(booking.createdAt),
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
    }));
    await prisma.booking.createMany({
        data: formatedBookings,
    });
    console.log(`Seeded ${formatedBookings.length} bookings.`);

    console.log("Seeding settings...");
    if (db.settings && Object.keys(db.settings).length > 0) {
        await prisma.setting.upsert({
            where: { id: 1 }, // فرض می‌کنیم ID تنظیمات همیشه 1 است
            update: {
                minBookingLength: db.settings.minBookingLength,
                maxBookingLength: db.settings.maxBookingLength,
                maxGuestsPerBooking: db.settings.maxGuestsPerBooking,
                breakfastPrice: db.settings.breakfastPrice,
            },
            create: {
                id: 1, // یا هر ID دلخواه دیگر
                minBookingLength: db.settings.minBookingLength,
                maxBookingLength: db.settings.maxBookingLength,
                maxGuestsPerBooking: db.settings.maxGuestsPerBooking,
                breakfastPrice: db.settings.breakfastPrice,
            },
        });
        console.log("Seeded settings.");
    } else {
        console.log("No settings found in db.json to seed.");
    }
    console.log("Database seeding completed successfully!");
}

main()
    .catch(e => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Prisma client disconnected.");
    });
