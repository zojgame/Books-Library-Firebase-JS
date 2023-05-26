import '../App.css'
import "firebase/firestore";
import "firebase/auth";
import { Modal, Button, Form, Input, notification } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { isnbValidation, dateValidation, ratingValidation } from '../calculation';
import { useBooksStore } from '../store/store';
import { useRef } from 'react';
import { updateDoc, doc  } from 'firebase/firestore';
import { db } from '../firestore';
import { nanoid } from 'nanoid';

export function ModalEditComponent() {
    const {authorsFields, setAuthorsFields, setEditModalClose,
            setIsFetching, isEditModalOpen, editBook} = useBooksStore();
    const modalRef = useRef();

    const handleModalClose = () => {      
        // Reset modal form fields when modal is closing
        modalRef.current.resetFields();
        setEditModalClose();
        setAuthorsFields([]);
    }

    const handleAddAuthors = () => {
        if(authorsFields.length < 2){
          const newAuthorsFields = [...authorsFields, {id: nanoid(), placeholder: 'Enter another author'}]
          setAuthorsFields(newAuthorsFields);
        }
    }

    const handleDeleteAuthors = () => {
        if(authorsFields.length >= 1){
          const newAuthorsFields = [...authorsFields?.slice(0, authorsFields.length - 1)]
          
          modalRef.current.resetFields()
          setAuthorsFields(newAuthorsFields);
        }
    }

    const handleFormConfirm = async(values) => {
        const bookRef = doc(db, 'books', editBook.id)
        
        // Delete empty form fields
        const newAuthors = [values.authors, values.authors_0, values.authors_1]
          .filter(author => 
            author !== undefined 
            && author !== null
            && author !== '');
            
        const updatedBook = {
          authors: newAuthors ?? null,
          date: values.date ?? null,
          title: values.bookTitle ?? null,
          isnb: values.isnb ?? null,
          rating: values.rating ?? null };

        await updateDoc(bookRef, updatedBook)
            .then(() => {
                setIsFetching();
                setEditModalClose();
                notification.success({message: 'Book successfully updated!'});
            })
            .catch(err => {
                notification.error({message: `error ${err}`});
            })
    }

    return (<>
      {<Modal  
      destroyOnClose={true}
      mask={false}
      className='edit-modal'       
        footer={null}       
        title='Editing a book'        
        open={isEditModalOpen}
        onCancel={handleModalClose}>         
        <Form onFinish={handleFormConfirm} ref={modalRef}>
            <Form.Item 
              initialValue={editBook?.title}
              name={'bookTitle'}
              label={<p>Title</p>}
              rules={
                  [{
                    required: true,
                    message: 'Please, enter this book title'
                  },
                  {
                    max: 100, message: 'Book title is too long'
                  }]
              }>
                <Input placeholder='Enter this book title' className='input-title'/>
            </Form.Item>

            <Form.Item 
              initialValue={editBook?.rating}
              name={'rating'}
              label={<p>Rating</p>}
              rules={ [{validator: ratingValidation}] }>
              <Input placeholder='Enter a number between 0 and 10' className='input-rating'/>                        
            </Form.Item>

            <Form.Item 
              initialValue={editBook?.date}
                name={'date'}
                label={<p>Date</p>}
                rules={[ { validator: dateValidation } ]}>
                <Input placeholder='Enter the publication date' className='input-date'/>                        
            </Form.Item>

            <Form.Item 
                initialValue={editBook?.isnb}
                name={'isnb'}
                rules={ [{validator: isnbValidation}] }
                label={<p>ISNB</p>}>
                <Input placeholder='Enter ISNB value' className='input-isnb'/>
            </Form.Item>
            
            <Form.Item 
              name={'authors'}
              initialValue={editBook?.authors?.[0]}
              rules={[
                  {
                    required: true, 
                    message: 'Please, enter at least one author'} ]}
              label={<p>Authors</p>}>
              <Input placeholder={`Enter an author`} className='input-authors'/>           
            </Form.Item>
            {
                authorsFields.map((author, index) => 
                <Form.Item 
                  initialValue={editBook?.authors?.[index + 1]}
                  key={index}
                  name={`authors_${index}`}>
                  <Input placeholder={`Enter another author`} className={`input-authors-${index}`}/>                                        
                </Form.Item>)
            }

            <div className="change-authors-btn">
              <Button icon={<PlusCircleOutlined/>} onClick={handleAddAuthors}></Button>
              <Button icon={<MinusCircleOutlined/>} onClick={handleDeleteAuthors}></Button>
            </div>
            <div className="book-form-button">
                <Button type='link' onClick={handleModalClose}>Cancel</Button>
                <Button type='primary' htmlType='submit'>Save</Button>
            </div>
        </Form>
    </Modal>}
    </>
     
    );
}