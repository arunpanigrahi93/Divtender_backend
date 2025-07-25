const adminAuth = (req, res, next) => {
  console.log("admin check");
  const token = "xyz";

  isAuthenticated = token === "xyz";

  if (!isAuthenticated) {
    res.send("unautherized");
  } else {
    next();
  }
};
module.exports = { adminAuth };
