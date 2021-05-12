function findAuthorById(authors, id) {
  return matched = authors.find((authorInfo) => authorInfo['id'] === id)
}

function findBookById(books, id) {
  return matched = books.find((bookInfo) => bookInfo['id'] === id)
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    const [borrowed,returned] = acc// turning our acc into these arrays that we declared on line 19 using destructuring
    const recent = book.borrows[0];
      if (recent.returned){
        returned.push(book)
      } else {
        borrowed.push(book)
      }
      return acc
  }, [[],[]])
}
 

 function getBorrowersForBook(book, accounts) {
   const accountsById = accounts.reduce((acc, account) => {
     acc[account.id] = account;
     return acc;
   }, {});
   return book.borrows.map(({ id, returned }) => ({
     ...accountsById[id],// grabbing all the info in accountsById variable
     returned,
   }))
   .slice(0, 10);
 
 }

// getTotalNumberOfBorrows(account, books)
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
