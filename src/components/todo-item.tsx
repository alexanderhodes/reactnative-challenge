import { useMutation } from '@apollo/client';
import { TodoModel } from '@models/todo.model';
import { DELETE_TODO_MUTATION, UPDATE_TODO_MUTATION } from '@utils/queries';
import { showToast } from '@utils/toast.service';
import React, { useState } from 'react';
import { Animated, Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import globalStyles from '../../global-styles';
import styles, { getItemStyle, getViewStyle } from './todo-item.styles';

const handleError = (type: 'update' | 'delete', title: string, error: any) => {
    console.log('error', error);
    showToast(`${type} completed for ${title} failed`);
}

const TodoItem = (todoProp: TodoModel) => {
    const [completeTodo] = useMutation(UPDATE_TODO_MUTATION, { errorPolicy: 'all' });
    const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, { errorPolicy: 'all' });
    const [todo, setTodo] = useState(todoProp);

    const clickDeleteTodo = () => {
        // execute delete todo mutation
        deleteTodo({ variables: { id: Number.parseInt(`${todo.id}`) } })
            .then((response) => {
                if (response.errors) {
                    handleError('delete', todo.title, response.errors);
                }
            })
            .catch(error => handleError('delete', todo.title, error));
    }

    const clickCompleteTodo = () => {
        const updatedTodo = {
            id: Number.parseInt(`${todo.id}`),
            title: todo.title,
            completed: !todo.completed
        };
        // execute complete todo mutation
        completeTodo({ variables: updatedTodo })
            .then((response) => {
                if (response.data) {
                    // update for updating completed status
                    setTodo(updatedTodo);
                } 
                if (response.errors) {
                    // display error because update failed
                    handleError('update', todo.title, response.errors);
                }
            })
            .catch((error) => handleError('update', todo.title, error));
    };

    // right action with displaying trash icon for deleting
    const renderRightActions = () => (
        <View style={styles.rightActionView}>
            <Animated.View style={styles.rightActionAnimatedView}>
              <RectButton
                style={[styles.rightAction, { backgroundColor: globalStyles.colorRed }]}
                onPress={() => clickDeleteTodo()}>
                    <Icon style={styles.actionText} name='trash' type='font-awesome' color={globalStyles.colorWhite}></Icon>
              </RectButton>
            </Animated.View>
        </View>
    );

    return <Swipeable renderRightActions={renderRightActions}>
        <View style={getViewStyle(todo.completed)}>
            <Text style={getItemStyle(todo.completed)}>
                {todo.title}
            </Text>
            <Button
                color={todo.completed ? globalStyles.colorGray : globalStyles.colorPrimary}
                onPress={() => clickCompleteTodo()}
                title={todo.completed ? "open" : "completed"}
            />
        </View>
    </Swipeable>
}

export default TodoItem;
