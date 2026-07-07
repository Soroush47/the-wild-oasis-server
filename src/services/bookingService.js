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
        include: {
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

exports.getBookingsAfterDate = async (queryDate, today) => {
    return await prisma.booking.findMany({
        where: {
            createdAt: {
                gte: queryDate,
                lte: today,
            },
        },
        select: {
            createdAt: true,
            totalPrice: true,
            extrasPrice: true,
        },
    });
};

exports.getStaysAfterDate = async (queryDate, endOfToday) => {
    // console.log({ queryDate, endOfToday });
    return await prisma.booking.findMany({
        where: {
            startDate: {
                gte: queryDate,
                lte: endOfToday,
            },
        },
        include: {
            guest: {
                select: {
                    fullName: true,
                },
            },
        },
    });
};

exports.getStaysTodayActivity = async (startOfToday, endOfToday) => {
    return await prisma.booking.findMany({
        where: {
            OR: [
                {
                    status: "unconfirmed",
                    startDate: {
                        gte: startOfToday,
                        lte: endOfToday,
                    },
                },
                {
                    status: "checked-in",
                    endDate: {
                        gte: startOfToday,
                        lte: endOfToday,
                    },
                },
            ],
        },
        include: {
            guest: {
                select: {
                    fullName: true,
                    nationality: true,
                    countryFlag: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
};
