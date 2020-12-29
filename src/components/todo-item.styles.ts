import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import globalStyles from "../../global-styles";

const styles = StyleSheet.create({
    item: {
        margin: 12,
        fontSize: 24
    }
});

export function getViewStyle(completed: boolean): ViewStyle {
    return {
        margin: 8,
        padding: 16,
        backgroundColor: completed ? globalStyles.colorPrimary : globalStyles.colorWhite,
        borderTopLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderColor: globalStyles.colorPrimary,
        borderWidth: 1
    }
}

export function getItemStyle(completed: boolean): TextStyle {
    return {
        margin: 12,
        fontSize: 24,
        color: completed ? globalStyles.colorWhite : globalStyles.colorPrimary
    }
}

export default styles;
