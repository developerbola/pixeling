const download = async (c) => {
  const url = c.req.query("url");
  if (!url) return c.json({ error: "Missing url ?url=something" }, 400);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return c.json({ error: "Failed to fetch image" }, 400);
    }
    const contentType =
      res.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await res.arrayBuffer();

    c.header("Content-Type", contentType);
    c.header("Content-Disposition", `attachment; filename="image.jpg"`);
    return new Response(arrayBuffer);
  } catch (err) {
    console.error(err);
    return c.json({ error: err || err.message });
  }
};

export default download;
