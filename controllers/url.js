import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function handleGetHomePageSSR(req, res) {
  const urls = await URL.find({});
  res.render("home", {
    urls,
  });
}

export async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ msg: "Redirect URL not provided!" });
  const shortId = nanoid(8);
  try {
    await URL.create({
      shortId,
      redirectURL: body.url,
      visitedHistory: [],
    });
    const baseURL = req.protocol + "://" + req.get("host") + req.url;
    const shortURL = baseURL + "url/" + shortId;
    return res.render("home", {
      shortURL,
    });
  } catch (error) {
    console.log("error while creating short id: ", error);
  }
}

export async function handleGetShortURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  const httpsPattern = /^https:\/\//;

  if (!httpsPattern.test(entry?.redirectURL)) {
    return res.redirect("https://" + entry?.redirectURL);
  } else {
    return res.redirect(entry?.redirectURL);
  }
}
