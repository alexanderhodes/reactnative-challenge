import React, { Component } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Text, View } from "react-native";
import styles from "./connectivity.styles";

export interface ConnectivityProps {}
export interface ConnectivityState {
    connected: boolean;
    connectivitySubscription: Function;
}

class Connectivity extends Component<ConnectivityProps, ConnectivityState> {

    constructor(props: ConnectivityProps) {
        super(props);
        this.state = {
            connected: false,
            connectivitySubscription: () => {}
        }
    }

    componentDidMount(): void {
        // create subscription for getting network state if phone is connected
        const subscription = NetInfo.addEventListener(state => {
            this.setState({
                connected: state.isConnected
            });
        });
        this.setState({
            connectivitySubscription: subscription
        });
    }

    componentWillUnmount(): void {
        // cancel subscription
        this.state.connectivitySubscription();
    }

    render() {
        if (!this.state.connected) {
            return <View style={styles.container}>
                <Text style={styles.text}>No internet-connection.</Text>
            </View>
        }
        return null;
    }

}

export default Connectivity;
