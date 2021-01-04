import { I18nManager, StyleSheet, TextStyle, ViewStyle } from "react-native";
import globalStyles from "../../global-styles";

const styles = StyleSheet.create({
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 16,
        marginTop: 8
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    rightActionView: {
        width: 64,
        marginTop: 8,
        marginBottom: 8,
        marginRight: 8,
        marginLeft: 8,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
    },
    rightActionAnimatedView: {
        flex: 1,
        transform: [{ translateX: 0 }]
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
