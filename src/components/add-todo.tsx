import { useMutation } from "@apollo/client";
import { CREATE_TODO_MUTATION } from "@utils/queries";
import { showToast } from "@utils/toast.service";
import globalStyles from "../../global-styles";
import React, { useState } from "react";
import { Button, Keyboard, View } from "react-native";
import styles from "./add-todo.styles";
import Input from "./input";

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [addTodo] = useMutation(CREATE_TODO_MUTATION, { errorPolicy: 'all' });
    const submitTodo = () => {
        // hide keyboard
        Keyboard.dismiss();
        // execute mutation
        addTodo({
            variables: { 'title': title, completed: false },
        })
        // reset title when successful
        .then(() => setTitle(''))
        // catch error while mutating
        .catch(error => {
            console.log('error', error);
            showToast(`Error while adding todo ${title}.`);
        });
    };

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

export default AddTodo; 
