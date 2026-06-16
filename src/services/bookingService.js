const prisma = require("../lib/prisma");

exports.findAllBookings = async (where, orderBy, skip, limit) => {
    return await Promise.all([
        prisma.booking.findMany({
            where,
            orderBy,
            skip,
            take: Number(limit),
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
        }),
        prisma.booking.count({ where }),
    ]);
};

exports.deleteAllBookings = async () => {
    return await prisma.booking.deleteMany({
        where: {
            id: {
                gt: 0,
            },
        },
    });
};

exports.createManyBookings = async data => {
    return await prisma.booking.createMany({
        data: data,
    });
};

exports.getBooking = async id => {
    return await prisma.booking.findUnique({
        where: { id },
        select: {
            id: true,
            createdAt: true,
            startDate: true,
            endDate: true,
            numNights: true,
            numGuests: true,
            status: true,
            cabinPrice: true,
            extrasPrice: true,
            totalPrice: true,
            hasBreakfast: true,
            observations: true,
            isPaid: true,
            cabin: {
                select: {
                    name: true,
                },
            },
            guest: {
                select: {
                    fullName: true,
                    email: true,
                    nationality: true,
                    countryFlag: true,
                    nationalID: true,
                },
            },
        },
    });
};

exports.updateBooking = async (id, obj) => {
    return await prisma.booking.update({
        where: { id },
        data: obj,
    });
};

exports.deleteBooking = async id => {
    return await prisma.booking.delete({
        where: {
            id,
        },
    });
};
