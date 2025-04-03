// db.js

const authors = [
  { id: 1, name: "Bryan" },
  { id: 2, name: "Christian" },
  { id: 3, name: "Jason" },
];


async function getAuthorById(req, res) {
  const { authorId } = req.params;

  try {
    const author = await db.getAuthorById(Number(authorId));

    if (!author) {
      res.status(404).send("Author not found");
      return;
    }

    res.send(`Author Name: ${author.name}`);
  } catch (error) {
    console.error("Error retrieving author:", error);
    res.status(500).send("Internal Server Error");

    // or we can call next(error) instead of sending a response here
    // Using `next(error)` however will only render an error page in the express' default view and respond with the whole html to the client.
    // So we will need to create a special type of middleware function if we want a different response and we will get to that in a bit.
  }
};
module.exports = { getAuthorById };
