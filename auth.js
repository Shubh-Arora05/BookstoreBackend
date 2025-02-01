const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new LocalStrategy({ usernameField: "name" }, async (name, password, done) => {
    try {
      const user = await Person.findOne({ name: name });
      if (!user) {
        return done(null, false, { message: "Username not found" });
      }
      const check = await user.comparePassword(password);
      if (check) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password is Incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
