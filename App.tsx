import { ApolloClient, ApolloQueryResult, InMemoryCache } from '@apollo/client';
import Spinner from '@components/spinner';
import TodoList from '@components/todo-list';
import { QueryModel } from '@models/query.model';
import { TodoModel } from '@models/todo.model';
import { ALL_TODO_QUERY } from '@utils/queries';
import { showToast } from '@utils/toast.service';
import styles from './app.styles';
import React, { Component } from 'react';
import { Button, Keyboard, SafeAreaView, Text, TextInput, View } from 'react-native';
import { graphqlUrl } from './app.json';
import globalStyles from './global-styles';

const apolloClient = new ApolloClient({
    uri: graphqlUrl,
    cache: new InMemoryCache(),
});

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

    componentDidMount(): void {
        this.getTodos();
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
            this.setState({
                todos: [...todos, { title: this.state.title, completed: false, id: `${todos.length + 1}` }],
                title: ''
            });
        } else {
            showToast(`Todo ${title} already exists.`);
        }
    }

    getTodos(): void {
        apolloClient.query<QueryModel<TodoModel[]>>({ query: ALL_TODO_QUERY })
            .catch(error => console.log('error', error))
            .then((response) => {
                const result = (response as ApolloQueryResult<QueryModel<TodoModel[]>>);
                if (result && !result.loading) {
                    const todos = result.data['allTodos'];
                    console.log('data', todos);
                    this.setState({
                        todos,
                        isLoading: false
                    });
                } else if (result && result.error) {
                    console.log('error', result.error);
                    this.setState({
                        isLoading: false
                    });
                }
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.title}
                    onChangeText={(title) => this.setState({ title: title })}
                    onSubmitEditing={() => this.addTodo()}
                />
                <View style={styles.submit}>
                    <Button title="add" color={globalStyles.colorPrimary} onPress={() => this.addTodo()} />
                </View>
                {
                    this.state.isLoading ? <Spinner></Spinner> :
                        this.state.todos.length === 0 ?
                            <View style={styles.message}>
                                <Text>Currently, no todos are added.</Text>
                            </View> : <TodoList todos={this.state.todos} />
                }
            </SafeAreaView>
        );
    };
}

export default App;
