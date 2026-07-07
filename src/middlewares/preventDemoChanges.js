export function preventDemoChanges(req, res, next) {
    if (req.user.email === "demo@example.com") {
        return res.status(403).json({
            message: "Demo account is read only",
        });
    }

    next();
}
