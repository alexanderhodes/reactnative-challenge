import { ApolloClient, ApolloQueryResult, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import Spinner from '@components/spinner';
import TodoList from '@components/todo-list';
import { QueryModel } from '@models/query.model';
import { TodoModel } from '@models/todo.model';
import { ALL_TODO_QUERY, CREATE_TODO_QUERY } from '@utils/queries';
import { showToast } from '@utils/toast.service';
import styles from './app.styles';
import React, { Component, useState } from 'react';
import { Button, Keyboard, SafeAreaView, Text, TextInput, View } from 'react-native';
import { graphqlUrl } from './app.json';
import globalStyles from './global-styles';
import Input from '@components/input';

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

    addTodo(): void {
        // close keyboard
        Keyboard.dismiss();
        const title = this.state.title;
        // check if title is entered
        if (title.length === 0) {
            showToast(`A todo has to be entered.`);
            return;
        }

        const todos = this.state.todos;
        const found = todos.find(todo => todo.title === title);
        // check if todo already exists
        if (!found) {
            //     apolloClient.mutate<TodoModel>({ mutation: CREATE_TODO_QUERY })
            //         .then((response) => {
            //             console.log('response', response);
            //             this.setState({
            //                 todos: [...todos, { title: this.state.title, completed: false, id: `${todos.length + 1}` }],
            //                 title: ''
            //             });
            //         })
            //         .catch(error => {
            //             console.log('error', error);
            //         });
        } else {
            showToast(`Todo ${title} already exists.`);
        }
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
    const todos: TodoModel[] = data.allTodos;

    if (todos && todos.length) {
        return <TodoList todos={todos} />;
    }

    return <View style={styles.message}>
        <Text>Currently, no todos are added.</Text>
    </View>;
}

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [addTodo, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_TODO_QUERY,
        { errorPolicy: 'all' }
    );

    return <View>
        <Input
            value={title}
            onChangeText={(value: string) => setTitle(value)}
            onSubmitEditing={() => {
                console.log('title', title);
                addTodo({
                    variables: { 'title': title, completed: false },
                })
                    .then((value) => {
                        console.log('value', value);
                        setTitle('');
                    })
                    .catch(error => console.log('error', error));
            }}
        />
        <View style={styles.submit}>
            <Button title="add" color={globalStyles.colorPrimary} onPress={() => {
                console.log('title', title);
                addTodo({
                    variables: { 'title': title, completed: false },
                })
                    .then((value) => {
                        console.log('value', value);
                        setTitle('');
                    })
                    .catch(error => console.log('error', error));
            }} />
        </View>
    </View>;
}

export default App;
