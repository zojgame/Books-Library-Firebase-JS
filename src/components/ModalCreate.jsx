import '../App.css'
import "firebase/firestore";
import "firebase/auth";
import { Modal, Button, Form, Input, notification } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { isnbValidation, dateValidation, ratingValidation } from '../calculation';
import { useBooksStore } from '../store/store';
import { useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firestore';

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
          const newAuthorsFields = [...authorsFields, {id: authorsFields.length, placeholder: 'Enter another author'}]

          modalRef.current.resetFields()
          setAuthorsFields(newAuthorsFields);
        }
    }
    
    const handleDeleteAuthors = () => {
      if(authorsFields.length >= 1){
        const newAuthorsFields = [...authorsFields.slice(0, authorsFields.length - 1)]
        setAuthorsFields(newAuthorsFields);
      }
  }

    const handleFormConfirm = async(values) => {
        const books = collection(db, 'books');

        // Delete empty form fields
        const newAuthors = [values.authors, values.authors_0, values.authors_1]
          .filter(author => 
            author !== undefined 
            && author !== null
            && author !== '');
            
        const book = {
          authors: newAuthors ?? null,
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
                    key={index}
                    name={`authors_${index}`}>
                    <Input placeholder={`Enter another author`} />                                        
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
    </Modal> 
    );
}