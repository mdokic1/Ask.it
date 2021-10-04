module.exports = function(req, res, next) {
    const { firstname, lastname, email, user_password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![firstname, lastname, email, user_password].every(Boolean)) {
        return res.json("Missing credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid email");
      }
    } else if (req.path === "/login") {
      if (![email, user_password].every(Boolean)) {
        return res.json("Missing credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid email");
      }
    }
  
    next();
  };