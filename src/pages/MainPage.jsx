
import '../App.css'
import { getBooks } from '../firestore';
import "firebase/firestore";
import "firebase/auth";
import { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { BooksSection, ModalCreationComponent } from '../components';
import { Segmented, Layout, Button } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { splitBooksByAuthors, splitBooksByYear } from '../calculation';
import { useBooksStore } from '../store/store';
import { ModalEditComponent } from '../components';

export function MainPage() {
  const [group, setGroup] = useState('Years');
  const { isDeleting, setIsDeleting, setIsEditing,
          isEditing, books, setBooks,
          isFetching, switchCreateModal, setAuthorsFields } = useBooksStore();

  useEffect(() => {    
    getBooks()
      .then((data) => {
        if(data.length !== 0 && group === "Years"){
            setBooks(splitBooksByYear(data))
        }
        if(data.length !== 0 && group === "Authors"){
            setBooks(splitBooksByAuthors(data))
        }
      });
      
  }, [ isFetching, group ])

  const handleModalOpen = () => {
    setAuthorsFields([]);
    switchCreateModal();
  }

  const handleDeleteBtn = () => {
    setIsDeleting(!isDeleting);
    setIsEditing(false);
  }

  const handleEditBtn = async() => {
    setIsEditing(!isEditing);
    setIsDeleting(false);
  }

  return (
    <Layout className='layout'>        
      <Layout>
        <Content>
          <div className="admin-panel">
            <div className="buttons">
              <Button className='editBtn'
                icon={!isEditing ? <EditOutlined /> : <CloseOutlined />} 
                onClick={handleEditBtn}>{!isEditing && 'Edit book'}</Button>

              <Button icon={<PlusCircleOutlined />} onClick={handleModalOpen}>Add book</Button>

              <Button className='delete' 
                icon={!isDeleting ? <DeleteOutlined /> : <CloseOutlined />} 
                onClick={handleDeleteBtn}>{!isDeleting && 'Delete book'}</Button>
            </div>
            <div className='group-section'>
              Group by: <Segmented options={['Years', 'Authors']} value={group} onChange={setGroup}/>
            </div>
          </div>

          {books.length !== 0 &&  
              books.map((item) => {
                return <BooksSection 
                  key={item[0]}
                  booksPeriod={item[0]} 
                  booksByPeriod={item[1]}  />
              })       
          }                   

          <ModalCreationComponent /> 
          <ModalEditComponent/>
          
             
        </Content>
      </Layout>
    </Layout>)
}
