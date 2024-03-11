export default async function handler(req, res) {
  try {
    const response = await (
      await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes`, {
        method: req.method,
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error API" });
  }
}
