import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import globalStyles from '../../global-styles';
import { TodoModel } from '../models/todo.model';
import { getItemStyle, getViewStyle } from './todo-item.styles';

interface TodoItemState extends TodoModel {}
interface TodoItemProps extends TodoModel {}

class TodoItem extends Component<TodoItemProps, TodoItemState> {
    state = {
        id: this.props.id,
        title: this.props.title,
        completed: this.props.completed
    }

    render() {
        return (
            <View style={getViewStyle(this.state.completed)}>
                <Text style={getItemStyle(this.state.completed)}>
                   {this.state.title}
                </Text>
                <Button
                    color={this.state.completed ? globalStyles.colorGray : globalStyles.colorPrimary}
                    onPress={() => this.setState({ completed: !this.state.completed })}
                    title={this.state.completed ? "open" : "completed"}
                />
            </View>
        );
    };
}



export default TodoItem;
