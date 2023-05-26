import { Card, Progress, Button, notification } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useBooksStore } from "../store/store";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firestore/firestore";

export const BookCard = ({ book }) => {
    const { isDeleting, isEditing, 
      setIsFetching, setAuthorsFields, setEditModal } = useBooksStore();
    const {setEditBook} = useBooksStore(state => ({setEditBook: state.setEditBook}));

    const handleUpdateBookClick = () => {
      setEditBook(book);
      setAuthorsFields(book.authors.slice(1, book.authors.length));
      setEditModal(prev => !prev);      
    }

    const handleDeleteBook = async(bookId) => {
        const docRef = doc(db, 'books', bookId);
    
        await deleteDoc(docRef)
          .then(() => {
            setIsFetching();
            notification.success({message: 'Book deleted successfully'})
          })
          .catch((err) => {
            notification.error({message: `Error ${err}`})
          })
      }

   return (
    <>
      <Card key={book.id} className='books-card' title={<p className='books-title' key={book.id}>{book.title}</p>}>  
        <div className="book-info">
          {book.authors.length === 1 
                ? <div className='book-authors'><p>Author</p><p>{book.authors[0]}</p> </div>
                : <div className='book-authors'><p>Authors</p><p>{book.authors.join(', ')}</p> </div>}
                {book.rating && <Progress 
                className='book-rating'
                type='circle' 
                percent={book.rating * 10} 
                status='normal' 
                strokeColor={'yellow'} 
                size={60}
                format={(percent) => `${percent / 10 } / 10`}
                />}
            {(book?.date) && <p className='book-date'>Realise year {book.date}</p>}
            {(book?.isnb) && <p className='book-isnb'>ISNB {book.isnb}</p>}
        </div>   
        <div className="book-buttons">
          {isDeleting && <Button className="delete-btn card-btn" onClick={() => handleDeleteBook(book.id)}><DeleteOutlined /></Button>}
          {isEditing && <Button onClick={handleUpdateBookClick} className="card-btn"><EditOutlined /></Button>}
          
          </div>           
          

      </Card>
    </>
   );
};
