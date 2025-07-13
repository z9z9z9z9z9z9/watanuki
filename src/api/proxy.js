export default async function handler(req, res) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.PRIVATE_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Rate limiting logic here (optional)

  const { path } = req.query;
  const url = `https://eren-world.onrender.com/api/v1/${path}`;
  const response = await fetch(url, { method: req.method });
  const data = await response.text();
  res.status(response.status).send(data);
}
