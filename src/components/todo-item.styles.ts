import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLOR_PRIMARY, COLOR_WHITE } from "../utils/colors";

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
        backgroundColor: completed ? COLOR_PRIMARY : COLOR_WHITE,
        borderTopLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderColor: COLOR_PRIMARY,
        borderWidth: 1
    }
}

export function getItemStyle(completed: boolean): TextStyle {
    return {
        margin: 12,
        fontSize: 24,
        color: completed ? COLOR_WHITE : COLOR_PRIMARY
    }
}

export default styles;
