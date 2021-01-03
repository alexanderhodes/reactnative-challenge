import { gql } from "@apollo/client";

export const ALL_TODO_QUERY = gql`
    query{
        allTodos {
            id
            title
            completed
        }
    }
`;

export const CREATE_TODO_QUERY = gql`
    mutation($title: String!, $completed: Boolean!) {
        createTodo (todo: { title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`;

export const DELETE_TODO_QUERY = gql`
    mutation($id: Float!) {
        deleteTodo(id: $id) {id title completed}
    }
`;

export const UPDATE_TODO_QUERY = gql`
    mutation($updateId: Float!, $id: Float!, $title: String!, $completed: Boolean!) {
        updateTodo(id: $updateId, todo: { id: $id, title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`;

export const ONE_TODO_BY_ID_QUERY = gql`
    query($id: Float!) {
        findTodoById(id: $id) {
            id
            title
            completed
        }
    }
`;
