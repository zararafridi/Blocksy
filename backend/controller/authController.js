const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const UserDTO = require("../dto/user");
const JWTService = require("../services/JWTService");
const RefreshToken = require("../models/token");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
  //  ----------------registration controller------------------------
  async register(req, res, next) {
    // 1) validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = userRegisterSchema.validate(req.body);

    // 2) if error in validation return error via middle ware
    if (error) {
      return next(error);
    }

    // 3) if email or username alredy registerd return an error
    const { username, name, email, password } = req.body;

    try {
      const emailInUSe = await User.exists({ email });

      const usernameInUSe = await User.exists({ username });

      if (emailInUSe) {
        const error = {
          status: 409,
          message: "email already in registerd use another one",
        };
        return next(error);
      }
      if (usernameInUSe) {
        const error = {
          status: 409,
          message: "username not availabel choose another username!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    // 4) passwors hash
    const hashPassword = await bcrypt.hash(password, 10);

    // 5) store user data in DB
    let accessToken;
    let refreshToken;

    let user;
    try {
      const userToRegister = new User({
        username,
        name,
        email,
        password: hashPassword,
      });

      user = await userToRegister.save();
      // token genration
      accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");

      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }
    // store refresh token in db
    await JWTService.storeRefreshToken(refreshToken, user._id);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    // 6) send response
    const userDTO = new UserDTO(user);
    return res.status(201).json({ user: userDTO, auth: true });
  },

  // ---------------Login controllel------------
  async login(req, res, next) {
    // 1) validate user input
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { username, password } = req.body;

    let user;

    try {
      // match username
      user = await User.findOne({ username: username });
      if (!user) {
        const error = {
          status: 401,
          message: "username not found",
        };
        return next(error);
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    let accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
    let refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

    // update refreshToken in database
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    const userDTO = new UserDTO(user);
    return res.status(200).json({ user: userDTO, auth: true });

    // 2) if error in validation return error
    // 3) match username and passwor
    // 4) return response
  },
  // Logout controller
  async logout(req, res, next) {
    //delete refresh token from db
    const { refreshToken } = req.cookies;

    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    // delete cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    //response
    res.status(200).json({ user: null, auth: false });
  },
  async refresh(req, res, next) {
    // 1. get refreshToken from cookies
    // 2. verify refreshToken
    // 3. generate new tokens
    // 4. update db, return response

    const originalRefreshToken = req.cookies.refreshToken;

    let id;
  

    try {
      id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
      console.log(id)
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: originalRefreshToken,
      });

      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };

        return next(error);
      }
    } catch (e) {
      return next(e);
    }

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "30m");

      const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (e) {
      return next(e);
    }

    const user = await User.findOne({ _id: id });

    const userDto = new UserDTO(user);
    // console.log(userDto)

    return res.status(200).json({ user: userDto, auth: true });
  },
  
};

module.exports = authController;
