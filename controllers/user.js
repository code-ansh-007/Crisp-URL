import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

export async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  try {
    await User.create({
      name,
      email,
      password,
    });
    return res.render("home");
  } catch (error) {
    console.log("Error creating user: ", error);
    return res.status(500).json({ msg: "Error creating user", error });
  }
}

export async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
      password,
    });
    if (!user)
      return res.render("login", {
        error: "Invalid username or password",
      });

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
    //return res.render("home");
  } catch (error) {
    console.log("Error creating user: ", error);
    return res.status(500).json({ msg: "Error creating user", error });
  }
}
