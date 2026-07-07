import jwt from "jsonwebtoken";

export function preventDemoChanges(req, res, next) {
    // console.log(req.headers.authorization);

    const accessToken = req.headers.authorization.split(" ")[1];

    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    // console.log({ user });

    if (user.email === "demo@example.com") {
        return res.status(403).json("Demo account is read only");
    }

    next();
}
