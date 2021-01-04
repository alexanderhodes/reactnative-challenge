import { useQuery } from "@apollo/client";
import { TodoModel } from "@models/todo.model";
import { ALL_TODO_QUERY } from "@utils/queries";
import { Text, View } from "react-native";
import TodoList from "./todo-list";
import React from 'react';
import Spinner from "./spinner";
import styles from "./todos.styles";

const Todos = () => {
    const { data, loading } = useQuery(ALL_TODO_QUERY, {
        pollInterval: 500,
        fetchPolicy: "cache-and-network"
    });

    const todos: TodoModel[] = data ? data.allTodos : [];
    if (loading && todos.length === 0) {
        return <Spinner></Spinner>;
    }

    if (todos && todos.length) {
        return <TodoList todos={todos} />;
    }

    return <View style={styles.message}>
        <Text>Currently, no todos are added.</Text>
    </View>;
}

export default Todos;
