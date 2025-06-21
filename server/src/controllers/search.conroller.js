const search = (c) => {
  try {
    return c.json({ message: "/search route working" }, 200);
  } catch (error) {
    return c.json(
      {
        error:
          error || error.error || error.message || "Unexpected error occured",
      },
      500
    );
  }
};

export default search;
