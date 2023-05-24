import { Divider } from "antd";
import { BookCard } from "./BookCard";

export function BooksSection({ booksPeriod, booksByPeriod }) {

    return (
      <div className='books-container'>
        <Divider orientation="left">{booksPeriod}</Divider>
          {booksByPeriod.map((book) => 
          { return (
            <BookCard book={book} 
              key={book.id}/>)
          })
        }
        </div>
    )
  }