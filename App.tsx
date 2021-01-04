import { useMutation, useQuery } from '@apollo/client';
import Input from '@components/input';
import Spinner from '@components/spinner';
import TodoList from '@components/todo-list';
import { TodoModel } from '@models/todo.model';
import { ALL_TODO_QUERY, CREATE_TODO_MUTATION } from '@utils/queries';
import { showToast } from '@utils/toast.service';
import React, { Component, useState } from 'react';
import { Button, Keyboard, SafeAreaView, Text, View } from 'react-native';
import styles from './app.styles';
import globalStyles from './global-styles';

interface AppProps { }
interface AppState {
    todos: TodoModel[],
    title: string,
    isLoading: boolean
}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            todos: [],
            title: '',
            isLoading: true
        };
    }

    completeTodo(todo: TodoModel): void {
        console.log('completeTodo', todo.id, todo.title, todo.completed);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AddTodo></AddTodo>
                <Todos></Todos>
            </SafeAreaView>
        );
    };
}

const Todos = () => {
    const { data, loading, error } = useQuery(ALL_TODO_QUERY);

    if (loading) {
        return <Spinner></Spinner>;
    }
    const todos: TodoModel[] = data ? data.allTodos : [];

    if (todos && todos.length) {
        return <TodoList todos={todos} />;
    }

    return <View style={styles.message}>
        <Text>Currently, no todos are added.</Text>
    </View>;
}

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [addTodo] = useMutation(CREATE_TODO_MUTATION, { errorPolicy: 'all' });
    const submitTodo = () => {
        Keyboard.dismiss();
        addTodo({
            variables: { 'title': title, completed: false },
        })
        .then(() => setTitle(''))
        .catch(error => {
            console.log('error', error);
            showToast(`Error while adding todo ${title}.`);
        });
    }

    return <View>
        <Input
            value={title}
            onChangeText={(value: string) => setTitle(value)}
            onSubmitEditing={() => submitTodo()}
        />
        <View style={styles.submit}>
            <Button title="add" color={globalStyles.colorPrimary} onPress={() => submitTodo()} />
        </View>
    </View>;
}

export default App;
