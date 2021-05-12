let booksFile = require("./books");

function getTotalBooksCount(books) {
  let bookCount = 0;
  for (book in books) bookCount++;
  return bookCount;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const bookByStatus = booksFile.partitionBooksByBorrowedStatus(books);
  const booksOut = bookByStatus[0]; // references our array at index [0] which is our borrowed books array from our helper function partitionBooksByBorrowedStatus
  return booksOut.length;
}
//**use helper function here*** let borrowedCount = partitionBooksByBorrowedStatus(books)
// return borrowedCount.borrowed.length;
//destructure to get borrows => forEach to check what has value of returned === false

// const booksOut = books.filter(book => book.borrows[0].returned === false)
// return booksOut.length

function getMostCommonGenres(books) {
  const genres = books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 1;
    } else {
      acc[book.genre] = acc[book.genre] + 1;
    }
    return acc;
  }, {});
  return Object.keys(genres)
    .reduce((acc, genre) => {
      acc.push({ name: genre, count: genres[genre] });
      return acc;
    }, [])

    .sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1))
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookList = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  const sortedBookList = bookList.sort((bookA, bookB) =>
    bookA.count < bookB.count ? 1 : -1
  );
  return sortedBookList.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorsList = authors.map((author) => {
    const booksByAuthor = books.filter((book) => {
      return author.id === book.authorId; // returns a list books by author
    });
    const totalBorrows = booksByAuthor.reduce((acc, bookByAuthor) => {
      return bookByAuthor.borrows.length + acc;
    }, 0);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: totalBorrows,
    };
  });
  const sortAuthorList = authorsList.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  return sortAuthorList.slice(0, 5);
}
// ------- OTHER SOLUTION(S) -----------

// function _sortObjValues(obj) {
//   const keys = Object.keys(obj);
//   return keys.sort((keyA, keyB) => {
//     if (obj[keyA] > obj[keyB]) {
//       return -1;
//     } else if (obj[keyB] > obj[keyA]) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
// }
// function getMostPopularAuthors(books, authors) {
//   const count = books.reduce((acc, { authorId, borrows }) => {
//     if (acc[authorId]) {
//       acc[authorId].push(borrows.length);
//     } else {
//       acc[authorId] = [borrows.length];
//     }

//     return acc;
//   }, {});

//   for (let id in count) {
//     const sum = count[id].reduce((a, b) => a + b);
//     count[id] = sum;
//   }

//   const sorted = _sortObjValues(count);
//   return sorted
//     .map((authorId) => {
//       const {
//         name: { first, last },
//       } = authors.find(({ id }) => id === Number(authorId));
//       const name = `${first} ${last}`;
//       return { name, count: count[authorId] };
//     })
//     .slice(0, 5);
// }
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
