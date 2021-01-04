import { useMutation } from '@apollo/client';
import { TodoModel } from '@models/todo.model';
import { UPDATE_TODO_MUTATION } from '@utils/queries';
import { showToast } from '@utils/toast.service';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import globalStyles from '../../global-styles';
import { getItemStyle, getViewStyle } from './todo-item.styles';

const handleUpdateError = (title: string, error: any) => {
    console.log('error', error);
    showToast(`update completed for ${title} failed`);
}

const TodoItem = (todoProp: TodoModel) => {
    const [completeTodo] = useMutation(UPDATE_TODO_MUTATION, { errorPolicy: 'all' });
    const [todo, setTodo] = useState(todoProp);

    return <View style={getViewStyle(todo.completed)}>
        <Text style={getItemStyle(todo.completed)}>
            {todo.title}
        </Text>

        <Button
            color={todo.completed ? globalStyles.colorGray : globalStyles.colorPrimary}
            onPress={() => {
                const updatedTodo = {
                    id: Number.parseInt(`${todo.id}`),
                    title: todo.title,
                    completed: !todo.completed
                };
                completeTodo({ variables: updatedTodo })
                    .then((response) => {
                        if (response.data) {
                            setTodo(updatedTodo);
                        } 
                        if (response.errors) {
                            handleUpdateError(todo.title, response.errors);
                        }
                    })
                    .catch((error) => handleUpdateError(todo.title, error));
            }}
            title={todo.completed ? "open" : "completed"}
        />
    </View>
}

export default TodoItem;
