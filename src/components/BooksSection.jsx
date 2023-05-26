import { Divider } from "antd";
import { BookCard } from "./BookCard";
import { Fragment } from "react";

export function BooksSection({ booksPeriod, booksByPeriod }) {

    return (
      <div className='books-container'>
        <Divider orientation="left" className="book-period-title">{booksPeriod}</Divider>
          {booksByPeriod.map((book) => 
          { return (
            <Fragment key={book.id}>
              <BookCard book={book}
                />
            </Fragment>)
          })
        }
        
        </div>
    )
  }