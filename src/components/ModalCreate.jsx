import '../App.css'
import "firebase/firestore";
import "firebase/auth";
import { Modal, Button, Form, Input, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { isnbValidation, dateValidation, ratingValidation } from '../calculation';
import { useBooksStore } from '../store/store';
import { useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firestore';
import { nanoid } from 'nanoid';

export function ModalCreateComponent() {
    const {authorsFields, setAuthorsFields, 
        switchCreateModal, isCreateModalOpen, setIsFetching } = useBooksStore();
    const modalRef = useRef();

    const handleModalClose = () => {
        switchCreateModal();

        // Reset modal form fields when cancel button is touched
        modalRef.current.resetFields();
        setAuthorsFields([]);
    }

    const handleAddAuthors = () => {
        if(authorsFields.length < 2){
          const newAuthorsFields = [...authorsFields, {id: nanoid(), placeholder: 'Enter another author'}]
          setAuthorsFields(newAuthorsFields);
        }
    }

    const handleFormConfirm = async(values) => {
        let authors = [];
        const books = collection(db, 'books');
        
        switch (authorsFields.length) {
          case 2:
            authors = [values.authors, values.authors_0, values.authors_1];        
            break;
          case 1:
            authors = [values.authors, values.authors_0];        
            break;
          default:
            authors = [values.authors];  
            break;
        }
            
        const book = {
          authors: authors ?? null,
          date: values.date ?? null,
          title: values.bookTitle,
          isnb: values.isnb ?? null,
          rating: values.rating ?? null };
    
        await addDoc(books, book)
          .then(() => {
            switchCreateModal();
            setIsFetching();
            modalRef.current.resetFields();
            notification.success({message: 'Book added successfully'});
          })
          .catch((err) => {
            modalRef.current.resetFields();
            notification.error({message: `Error ${err}`})
          });
    }

    return (
    <Modal         
        footer={null}       
        title='Adding a book'        
        open={isCreateModalOpen}
        onCancel={handleModalClose}>         
        <Form onFinish={handleFormConfirm} ref={modalRef}>
            <Form.Item 
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
                <Input placeholder='Enter this book title'/>
            </Form.Item>

            <Form.Item 
              name={'rating'}
              label={<p>Rating</p>}
              rules={ [{validator: ratingValidation}] }>
              <Input placeholder='Enter a number between 0 and 10'/>                        
            </Form.Item>

            <Form.Item 
                name={'date'}
                label={<p>Date</p>}
                rules={[ { validator: dateValidation } ]}>
                <Input placeholder='Enter the publication date'/>                        
            </Form.Item>

            <Form.Item 
                name={'isnb'}
                rules={ [{validator: isnbValidation}] }
                label={<p>ISNB</p>}>
                <Input placeholder='Enter ISNB value'/>
            </Form.Item>
            
            <Form.Item 
              name={'authors'}
              rules={[
                  {required: true, message: 'Please, enter at least one author'}
              ]}
              label={<p>Authors</p>}>
              <Input placeholder={`Enter an author`} />           
            </Form.Item>
            {
                authorsFields.map((author, index) => 
                <Form.Item 
                    key={author.id}
                    name={`authors_${index}`}>
                    <Input placeholder={`Enter another author`} />                                        
                </Form.Item>)
            }

            <Button icon={<PlusCircleOutlined/>} onClick={handleAddAuthors}></Button>
            <div className="book-form-button">
                <Button type='link' onClick={handleModalClose}>Cancel</Button>
                <Button type='primary' htmlType='submit'>Save</Button>
            </div>
        </Form>
    </Modal> 
    );
}