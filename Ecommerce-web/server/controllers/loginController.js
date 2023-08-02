const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { SignToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("388238736274-dfnk0dalmbsj9slklphjcn56impv7btm.apps.googleusercontent.com");

class LoginController{
    static async googleLogin(req, res, next) {
        try {
          const googleToken = req.headers.google_token;
    
          const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: "388238736274-dfnk0dalmbsj9slklphjcn56impv7btm.apps.googleusercontent.com",
          });
          const payload = ticket.getPayload();
          const username = payload.name;
          const email = payload.email;
          const phoneNumber = payload.sub;
          const imgUrl = payload.picture;
          const address = payload.sub;
    
          // console.log({name, email, phoneNumber, address});
          const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { username, email, password: "Dony Ganteng", role: "staff", phoneNumber, imgUrl, address },
            hooks: false,
          });
          res.status(created ? 201 : 200).json({ access_token: SignToken({ id: user.id }) });
        } catch (err) {
          console.log(err, "<<< google");
          next(err);
        }
      }
      static async register(req, res, next) {
        try {
          const { username, email, password, phoneNumber, imgUrl, address } = req.body;
          const user = await User.create({ username, email, password, phoneNumber, imgUrl, address });
          res.status(201).json(
            {
              message: `user with ${email} is been created`,
              access_token: SignToken({ id: user.id }),
              user
            }
          );
        } catch (err) {
          console.log(err, "<<< name");
          next(err);
        }
      }
      static async login(req, res, next) {
        try {
          const { email, password } = req.body;
    
          if (!email) throw { name: "NameRequired" };
    
          if (!password) throw { name: "PasswordRequired" };
    
          const user = await User.findOne({ where: { email } });
          if (!user) throw { name: "InvalidUser" };
    
          const isPasswordCorrect = checkPassword(password, user.password);
          if (!isPasswordCorrect) throw { name: "InvalidUser" };
    
          res.status(200).json({ access_token: SignToken({ id: user.id }) });
        } catch (err) {
          next(err);
        }
      }


}

module.exports = LoginController