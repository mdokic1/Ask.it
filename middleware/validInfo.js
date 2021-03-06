module.exports = (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      if (![firstname, lastname, email, password].every(Boolean)) {
        return res.status(401).json("Missing credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid email");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid email");
      }
    }
  
    next();
};