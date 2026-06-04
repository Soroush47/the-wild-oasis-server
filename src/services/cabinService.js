const prisma = require("../lib/prisma");

exports.findAllCabins = async () => {
    return await prisma.cabin.findMany({
        orderBy: { id: "asc" },
    });
};

exports.deleteAllCabins = async () => {
    return await prisma.cabin.deleteMany({ where: { id: { gt: 0 } } });
};

exports.createManyCabins = async data => {
    return await prisma.cabin.createMany({
        data: data,
    });
};

exports.createCabin = async data => {
    return await prisma.cabin.create({ data });
};

exports.deleteCabin = async id => {
    // Check if cabin exists before deleting to give a P2025 error properly
    const cabin = await prisma.cabin.findUnique({ where: { id } });
    if (!cabin) {
        const error = new Error(`Cabin with ID ${id} not found.`);
        error.code = "P2025";
        throw error;
    }
    return await prisma.cabin.delete({ where: { id } });
};

exports.updateCabin = async (id, data) => {
    return await prisma.cabin.update({
        where: { id },
        data,
    });
};

exports.getCabinIds = async () => {
    return await prisma.cabin.findMany({
        select: {
            id: true,
        },
        orderBy: { id: "asc" },
    });
};
