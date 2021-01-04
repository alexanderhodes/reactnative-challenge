import React, { Component } from "react";
import { TextInput } from "react-native";
import styles from "./input.styles";

export interface InputProps {
    [key: string]: any
};
export interface InputState {
    style: any
};

class Input extends Component<InputProps, InputState> {

    constructor(props: InputProps) {
        super(props);
        this.state = {
            style: styles.initial
        };
    }

    render() {
        return (
            <TextInput
                {...this.props}
                style={[styles.input, this.state.style]}
                onFocus={() => this.setState({ style: styles.focussed })}
                onBlur={() => this.setState({ style: styles.initial })}
            />
        );
    }

}

export default Input;
