import User from "../models/user.js";

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
