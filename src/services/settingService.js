const prisma = require("../lib/prisma");

exports.findAllSettings = async () => {
    return await prisma.setting.findMany();
};
