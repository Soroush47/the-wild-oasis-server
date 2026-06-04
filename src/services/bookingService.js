const prisma = require("../lib/prisma");

exports.findAllBookings = async (where, orderBy) => {
    return await prisma.booking.findMany({
        where,
        orderBy,
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
    });
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
