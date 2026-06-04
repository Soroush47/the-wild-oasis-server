require("dotenv").config();
const app = require("./src/app");

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*
const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

const delay = ms => new Promise(r => setTimeout(r, ms));

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
    await delay(800);
    next();
});

// crud operations

app.get("/", (req, res) => {
    res.send("Hello from The Wild Oasis backend!");
});

app.get("/api/cabins", async (req, res) => {
    try {
        const cabins = await prisma.cabin.findMany({
            orderBy: {
                id: "asc",
            },
        });
        res.json(cabins);
    } catch (error) {
        console.error("Error fetching cabins:", error);
        res.status(500).json({ message: "Error fetching cabins" });
    }
});

app.post("/api/cabins", async (req, res) => {
    const body = req.body;
    try {
        const newCabin = await prisma.cabin.create({
            data: {
                name: body.name,
                maxCapacity: Number(body.maxCapacity),
                regularPrice: Number(body.regularPrice),
                discount: Number(body.discount),
                description: body.description,
                image: body.image,
            },
        });
        res.status(201).json(newCabin);
    } catch (error) {
        console.error("Error creating cabin:", error);

        res.status(400).json({
            message: "Failed to create cabin",
            error: error.message,
        });
    }
});

app.delete("/api/cabins/:id", async (req, res) => {
    const cabinId = parseInt(req.params.id);
    try {
        const deletedCabin = await prisma.cabin.delete({
            where: {
                id: cabinId,
            },
        });
        res.status(200).json({
            message: `Cabin with ID ${cabinId} deleted successfully.`,
            deletedCabin: deletedCabin,
        });
    } catch (error) {
        console.error("Error deleting cabin:", error);

        if (error.code === "P2025") {
            // P2025: Record not found
            res.status(404).json({
                message: `Cabin with ID ${cabinId} not found.`,
                error: error.message,
            });
        } else {
            res.status(400).json({
                message: "Failed to delete cabin.",
                error: error.message,
            });
        }
    }
});

app.patch("/api/cabins/:id", async (req, res) => {
    const updatedData = req.body;
    const cabinId = parseInt(req.params.id);
    try {
        const updatedCabin = await prisma.cabin.update({
            where: {
                id: cabinId,
            },
            data: updatedData,
        });
        res.status(200).json(updatedCabin);
    } catch (error) {
        console.error("Error updating cabin:", error);

        if (error.code === "P2025") {
            // P2025: Record not found
            res.status(404).json({
                message: `Cabin with ID ${req.params.id} not found.`,
                error: error.message,
            });
        } else {
            res.status(400).json({
                message: "Failed to update cabin.",
                error: error.message,
            });
        }
    }
});

app.get("/api/guests", async (req, res) => {
    try {
        const guests = await prisma.guest.findMany();
        res.json(guests);
    } catch (error) {
        console.error("Error fetching guests:", error);
        res.status(500).json({ message: "Error fetching guests" });
    }
});

app.get("/api/settings", async (req, res) => {
    try {
        const settings = await prisma.setting.findMany();
        res.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Error fetching settings" });
    }
});

app.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            select: {
                id: true,
                createdAt: true,
                startDate: true,
                endDate: true,
                numNights: true,
                numGuests: true,
                status: true,
                totalPrice: true,
                cabin: {
                    select: {
                        name: true,
                    },
                },
                guest: {
                    select: {
                        fullName: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                id: "asc",
            },
        });
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
});


*/
