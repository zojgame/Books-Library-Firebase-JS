import { create } from "zustand";

export const useBooksStore = create((set) => ({
    isEditing: false,
    isDeleting: false,
    isFetching: false,
    isEditModalOpen: false,
    isCreateModalOpen: false,
    editBookId: '',
    books: [],
    authorsFields: [],
    switchCreateModal: () => set((state) => (
        {
            isCreateModalOpen: !state.isCreateModalOpen
        }
    )),
    setEditModalOpen: (id) => set((state) =>
    (
        {
            isEditModalOpen: true,
            editBookId: id
        }
    )),
    setEditModalClose: () => set((state) =>
    (
        {
            isEditModalOpen: false
        }
    )),
    setIsEditing: (isEditing) => set((state) => 
    (
        {
            isEditing: isEditing
        }
    )),
    setIsFetching: () => set((state) => 
    (
        {
            isFetching: !state.isFetching
        }
    )),
    setIsDeleting: (isDeleting) => set((state) => 
    (
        {
            isDeleting: isDeleting
        }
    )),
    setAuthorsFields: (authorsFields) => set((state) => (
        {
            authorsFields: authorsFields
        }
    )),
    setBooks: (books) => set((state) => (
        {
            books: books
        }
    ))
}))