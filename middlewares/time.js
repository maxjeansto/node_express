export const timeOfRequest = (req, res, next) => {
    if (req.user) {
        req.user.timeOfRequest = new Date();
    }
    next();
}