import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./spinner.styles";
import globalStyles from "../../global-styles";

export interface SpinnerProps { }
export interface SpinnerState { }

class Spinner extends Component<SpinnerProps, SpinnerState> {
    render() {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color={globalStyles.colorGray}></ActivityIndicator>
            </View>
        );
    }
}

export default Spinner;
