const prisma = require("../lib/prisma");

exports.findAllGuests = async () => {
    return await prisma.guest.findMany();
};

exports.deleteAllGuests = async () => {
    return await prisma.guest.deleteMany({ where: { id: { gt: 0 } } });
};

exports.createManyGuests = async data => {
    return await prisma.guest.createMany({
        data,
    });
};

exports.getGuestIds = async () => {
    return await prisma.guest.findMany({
        select: {
            id: true,
        },
        orderBy: { id: "asc" },
    });
};
