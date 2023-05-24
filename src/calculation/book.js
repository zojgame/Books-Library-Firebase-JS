const byDate = ((a, b) => Number(b.date) - Number(a.date))
const byAlph = ((a, b) => b.title > a.title ? -1 : 1);
const byRatingCriteria = (a, b) => b.rating - a.rating;
const olderBookCriteria = (book) => {
    const year = new Date().getFullYear(); 
    return book.date !== null && Number(book.date) <= year - 3
};

export function splitBooksByYear(books) {
    const bookSectionTitle = new Map(); 

    // Sorting books
    const sortedBooks = books
      .sort(byAlph)
      .sort(byDate);

    // Get recommend book
    if(sortedBooks.length !== 0){
        const recommendedBook = getRecommendBook(sortedBooks);
        bookSectionTitle.set('Recommended book', [recommendedBook])
    }
  
    // Devide books into years
    sortedBooks.forEach((book) => {
      let sectionName = `${book.date} year`;
      if(book.date === '' || book.date === null){
        sectionName = 'Books without a release year';
      }
  
      // Checking if bookPeriod is already exist
      if(bookSectionTitle.has(sectionName)){
        const booksInCurrenPeriod = bookSectionTitle.get(sectionName);
        bookSectionTitle.set(sectionName, [...booksInCurrenPeriod, book]);
      }
      else{
        bookSectionTitle.set(sectionName, [book]);      
      }
    })

    // Convert from Map to Array
    const newArr = Array.from(bookSectionTitle, ([key, value]) => [key, value])
    return newArr;
}

export function splitBooksByAuthors(books) {
    const bookSectionTitle = new Map();  
    const sortedBooks = books.sort(byAlph);

  // Get recommend book
  if(sortedBooks.length !== 0){
    const recommendedBook = getRecommendBook(sortedBooks);
    bookSectionTitle.set('Recommended book', [recommendedBook]);
  }  
  
      
      // Devide books into authors
      sortedBooks.forEach((book) => {
        let authors = book.authors;
  
          // Split books on each author
          authors.forEach((author) => {
          if(bookSectionTitle.has(author)){
              const currentAuthorBooks = bookSectionTitle.get(author);
              bookSectionTitle.set(author, [...currentAuthorBooks, book])
          }
          else{
              bookSectionTitle.set(author, [book])
          }})
      }
    )

    // Convert from Map to Array
    const newArr = Array.from(bookSectionTitle, ([key, value]) => [key, value])
    return newArr;
}

export  function getRecommendBook(books){
    const filteredBooks = books
        // Filter if the book is older than 3 years
        .filter(olderBookCriteria)
        // Sort by rating order by descending
        .sort(byRatingCriteria);
    
    // Filter books by max rating
    const maxRatingBook = filteredBooks[0].rating;
    const recommendBooks = filteredBooks.filter((book) => book.rating === maxRatingBook);
    
    // Get random recommend book
    const recommendBookIndex = Math.round(Math.random() * (recommendBooks.length - 1));
    const recommendBook = recommendBooks[recommendBookIndex];
    return recommendBook;
}