function getUserBooks(booksRepository) {
  return (req, res) => {
    return booksRepository
      .getByInstitutionDomain(req.user.email.split('@')[1])
      .then(booksRes => {
        res.json({
          status: 'success',
          data: {
            books: booksRes.books.map(book => ({
              isbn: book.isbn,
              title: book.title,
              author: book.author,
            }))
          }
        });
      })
  }
}

module.exports = {
  getUserBooks: getUserBooks,
};
