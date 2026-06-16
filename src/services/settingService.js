const prisma = require("../lib/prisma");

exports.findAllSettings = async () => {
    return await prisma.setting.findMany();
};

exports.updateSettings = async data => {
    console.log(data);
    return await prisma.setting.update({
        where: { id: 1 },
        data,
    });
};
