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

export const CREATE_TODO_MUTATION = gql`
    mutation createTodo($title: String!, $completed: Boolean!) {
        createTodo (todo: { title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`;

export const DELETE_TODO_MUTATION = gql`
    mutation deleteTodo($id: Float!) {
        deleteTodo (id: $id) {
            id 
            title 
            completed
        }
    }
`;

export const UPDATE_TODO_MUTATION = gql`
    mutation updateTodo($id: Float!, $title: String!, $completed: Boolean!) {
        updateTodo (todo: {title: $title, completed: $completed }, id: $id) {
            id
            title
            completed
        }
    }
`;

export const ONE_TODO_BY_ID_QUERY = gql`
    query($id: Float!) {
        todoById(id: $id) {
            id
            title
            completed
        }
    }
`;
