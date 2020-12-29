import { gql } from "@apollo/client";

export const ALL_TODO_QUERY = gql`query{
    allTodos {
        id
        title
        completed
    }
}`;
