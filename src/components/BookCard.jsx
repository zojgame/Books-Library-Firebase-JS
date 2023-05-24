import { Card, Progress, Button, notification } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useBooksStore } from "../store/store";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firestore/firestore";

export const BookCard = ({ book }) => {
    const { isDeleting, isEditing, setEditModalOpen, setIsFetching } = useBooksStore();

    const handleUpdateBookClick = async() => {
        setEditModalOpen(book.id)
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
    <Card key={book.id} className='books-card' title={<p className='books-title' key={book.id}>{book.title}</p>}>                
        {book.rating && <Progress 
        className='book-rating'
        type='circle' 
        percent={book.rating * 10} 
        status='normal' 
        strokeColor={'yellow'} 
        size={50}
        gapPosition='right'
        format={(percent) => `${percent / 10 } / 10`}
        />}
        {book.authors.length === 1 
            ? <p className='book-authors'>Автор: {book.authors[0]}</p>
            : <p className='book-authors'>Авторы: {book.authors.join(', ')}</p>}
        {book.date !== undefined ?? <p className='book-date'>Год выпуска: {book.date}</p>}
        {isDeleting && <Button className="delete-btn" onClick={() => handleDeleteBook(book.id)}><DeleteOutlined /></Button>}
        {isEditing && <Button onClick={handleUpdateBookClick}><EditOutlined /></Button>}
    </Card>
   );
};
