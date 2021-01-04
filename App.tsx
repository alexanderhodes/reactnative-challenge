import AddTodo from '@components/add-todo';
import Todos from '@components/todos';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './app.styles';

interface AppProps { }
interface AppState {}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
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

export default App;
