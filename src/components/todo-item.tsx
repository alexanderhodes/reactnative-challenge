import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { TodoModel } from '../models/todo.model';
import { COLOR_GRAY, COLOR_PRIMARY } from '../utils/colors';
import { getItemStyle, getViewStyle } from './todo-item.styles';

class TodoItem extends Component<TodoModel> {
    state = {
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
                    color={this.state.completed ? COLOR_GRAY : COLOR_PRIMARY}
                    onPress={() => this.setState({ completed: !this.state.completed })}
                    title={this.state.completed ? "open" : "completed"}
                />
            </View>
        );
    };
}



export default TodoItem;
