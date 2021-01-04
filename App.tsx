import { ApolloProvider } from '@apollo/client';
import AddTodo from '@components/add-todo';
import Connectivity from '@components/connectivity';
import Spinner from '@components/spinner';
import Todos from '@components/todos';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './app.styles';
import createApolloClient from './src/apollo';

interface AppProps {}
interface AppState {
    client: any;
    loaded: boolean;
}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            client: null,
            loaded: false
        };
    }

    async componentDidMount() {
        try {
            const apolloClient = await createApolloClient();

            this.setState({
                client: apolloClient,
                loaded: true
            });
        } catch (error) {
            console.log('could not initialize apollo client', error);
            this.setState({
                client: null,
                loaded: true
            });
        }
    }

    render() {
        if (!this.state.loaded) {
            return <SafeAreaView style={styles.container}>
                <Spinner/>
            </SafeAreaView>
        }

        return (
            <ApolloProvider client={this.state.client}>
                    <Connectivity></Connectivity>
                <SafeAreaView style={styles.container}>
                    <AddTodo></AddTodo>
                    <Todos></Todos>
                </SafeAreaView>
            </ApolloProvider>
        );
    };
}

export default App;
