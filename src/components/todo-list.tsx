import React, { Component } from "react";
import { FlatList } from "react-native";
import { TodoModel } from "../models/todo.model";
import TodoItem from "./todo-item";

export interface TodoListProps {
    todos: TodoModel[]
}

class TodoList extends Component<TodoListProps> {
    render() {
        return (
            <FlatList data={this.props.todos} key="todos"
            renderItem={
                ({item, index}) => (
                    <TodoItem key={index} id={item.id} title={item.title} completed={item.completed}/>
                )
            }/>
        );
    }
}

export default TodoList;
