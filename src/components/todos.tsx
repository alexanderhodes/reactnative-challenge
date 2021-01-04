import { useQuery } from "@apollo/client";
import { TodoModel } from "@models/todo.model";
import { ALL_TODO_QUERY } from "@utils/queries";
import React from 'react';
import { FlatList, Text, View } from "react-native";
import Spinner from "./spinner";
import TodoItem from "./todo-item";
import styles from "./todos.styles";

const Todos = () => {
    const { data, loading } = useQuery(ALL_TODO_QUERY, {
        pollInterval: 1000,
        fetchPolicy: "cache-and-network"
    });

    const todos: TodoModel[] = data ? data.allTodos : [];
    if (loading && todos.length === 0) {
        return <Spinner></Spinner>;
    }

    if (todos && todos.length) {
        return  <FlatList data={todos} key="todos" style={{marginBottom: todos && todos.length ? 80 : 0}}
        renderItem={
            ({item, index}) => (
                <TodoItem key={index} id={item.id} title={item.title} completed={item.completed}/>
            )
        }/>;
    }

    return <View style={styles.message}>
        <Text>Currently, no todos are added.</Text>
    </View>;
}

export default Todos;
