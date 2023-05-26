import { create } from "zustand";

export const useBooksStore = create((set) => ({
    isEditing: false,
    isDeleting: false,
    isFetching: false,
    isEditModalOpen: false,
    isCreateModalOpen: false,
    editBook: {},
    books: [],
    authorsFields: [],
    switchCreateModal: () => set((state) => (
        {
            isCreateModalOpen: !state.isCreateModalOpen
        }
    )),
    setEditModal: (isEditModal) => set((state) =>
    (
        {
            isEditModalOpen: isEditModal,
        }
    )),
    setEditModalOpen: () => set((state) =>
    (
        {
            isEditModalOpen: true,
        }
    )),
    setEditBook: (editBook) => set((state) =>
    (
        {
            editBook: editBook

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