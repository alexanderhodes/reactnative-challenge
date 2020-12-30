import globalStyles from "./global-styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: globalStyles.colorGray1,
        backgroundColor: globalStyles.colorGray1,
    },
    submit: {
        marginTop: 10,
        marginBottom: 10,
    },
    message: {
        marginTop: 10,
    },
});

export default styles;
