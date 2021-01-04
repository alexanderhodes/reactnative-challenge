import { useMutation } from '@apollo/client';
import { TodoModel } from '@models/todo.model';
import { UPDATE_TODO_MUTATION } from '@utils/queries';
import { showToast } from '@utils/toast.service';
import React, { useState } from 'react';
import { Animated, Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import globalStyles from '../../global-styles';
import styles, { getItemStyle, getViewStyle } from './todo-item.styles';

const handleUpdateError = (title: string, error: any) => {
    console.log('error', error);
    showToast(`update completed for ${title} failed`);
}

const TodoItem = (todoProp: TodoModel) => {
    const [completeTodo] = useMutation(UPDATE_TODO_MUTATION, { errorPolicy: 'all' });
    const [todo, setTodo] = useState(todoProp);

    const clickCompleteTodo = () => {
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
    };

    const renderRightActions = () => (
        <View style={styles.rightActionView}>
            <Animated.View style={styles.rightActionAnimatedView}>
              <RectButton
                style={[styles.rightAction, { backgroundColor: globalStyles.colorRed }]}
                onPress={() => showToast('delete')}>
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
