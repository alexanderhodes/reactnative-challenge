import { ApolloClient, ApolloQueryResult, InMemoryCache } from '@apollo/client';
import React, { Component } from 'react';
import { Button, SafeAreaView, StyleSheet,Text, TextInput, View } from 'react-native';
import { graphqlUrl } from './app.json';
import TodoList from './src/components/todo-list';
import { QueryModel } from './src/models/query.model';
import { TodoModel } from './src/models/todo.model';
import { COLOR_GRAY_1, COLOR_PRIMARY } from './src/utils/colors';
import { ALL_TODO_QUERY } from './src/utils/queries';
import { showToast } from './src/utils/toast.service';

const apolloClient = new ApolloClient({
    uri: graphqlUrl,
    cache: new InMemoryCache(),
});

class App extends Component {
    state = {
        todos: [] as TodoModel[],
        title: '' as string,
    };

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.getTodos();
    }

    addTodo(): void {
        const todos = this.state.todos;
        const title = this.state.title;
        const found = todos.find(todo => todo.title === title);
        if (!found) {
            todos.push({title: this.state.title, completed: false, id: `${todos.length + 1}`});
            this.setState({
                todos,
                title: '',
            });
        } else {
            showToast(`Das Todo ${title} existiert bereits.`);
        }
    }

    getTodos() {
        apolloClient.query<QueryModel<TodoModel[]>>({query: ALL_TODO_QUERY})
            .catch(error => console.log('error', error))
            .then((response) => {
                const result = (response as ApolloQueryResult<QueryModel<TodoModel[]>>);
                if (result && !result.loading) {
                    const todos = result.data['allTodos'];
                    console.log('data', todos);
                    this.setState({
                        todos,
                    });
                } else if (result && result.error) {
                    console.log('error', result.error);
                }
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.title}
                    onChangeText={(title) => this.setState({title: title})}
                />
                <View style={styles.submit}>
                    <Button title="add" color={COLOR_PRIMARY} onPress={() => {
                        this.addTodo();
                    }}/>
                </View>
                <TodoList todos={this.state.todos} />
                {this.state.todos.length === 0 ?
                    <View style={styles.message}>
                        <Text>Derzeit sind noch keine Todo's angelegt worden.</Text>
                    </View>
                    : null}
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        padding: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLOR_GRAY_1,
        backgroundColor: COLOR_GRAY_1,
    },
    submit: {
        marginTop: 10,
        marginBottom: 10,
    },
    message: {
        marginTop: 10,
    },
});

export default App;
