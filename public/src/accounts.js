function findAccountById(accounts, id) { // use the find() method to search userInfo to see if userInfo[id] = id we want to find 
  return (matched = accounts.find((userInfo) => userInfo["id"] === id));
  
}
function sortAccountsByLastName(accounts) { // use the sort() method to sort by last name, remember to us toLowerCase for a proper sort.
  return accountsLastName = accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1
  );
}
  // use sort method to order last names a-z

function getTotalNumberOfBorrows(account, books) {
  return results = books.reduce((acc, book) => { //reduce books object
    const countPerBook = book.borrows.reduce((accBorrow, borrow)=> { // while reducing(used like a for loop) make variable saving book borrows which we also reduce 
      return borrow.id === account.id ? accBorrow + 1 : accBorrow },0) // ternary statemnet of borrow id = account id borrow +1 else accBorrow(nothing) start @ 0
      return acc + countPerBook },0) // return the other; reduce acc + countPerBook, 0
  
  }
// --------OTHER SOLUTIONS -------
//   const { id: accID} = account
//   let total = 0;
//   books.some(book => book.borrows.some(borrow => accID === borrow.id && total ++));
//   return total;
// }   
//--------------------------------------------------------   
// without destructuring
//  const accId = account.id;
//  let total = 0;
//     books.some(book => book.borrows.some(borrow => accId === borrow.id && total++));
//     return total;
//   }
// ---------------------------------------------------------
//   const { id: accId } = account;
//   return books.reduce((acc, book) => {
//     return (
//       acc +
//       book.borrows
//         .filter((borrow) => borrow.id === accId)
//         .reduce((accBorrows, borrow) => accBorrows + 1, 0)
//     );
//   }, 0);
// }


function getBooksPossessedByAccount(account, books, authors) {
  const getBorrowedBooks = books.filter ((book) => {
    const writer = authors.find((author) => author.id === book.authorId);
    book['author'] = writer; 
    return book.borrows.some(borrow =>borrow.id==account.id && borrow.returned == false)// creates or reassings if there the key author with the values at writer.name
  })
  return getBorrowedBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
