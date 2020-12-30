import globalStyles from "../../global-styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        borderWidth: 1,
    },
    initial: {
        backgroundColor: globalStyles.colorGray1,
        borderColor: globalStyles.colorGray1,
    },
    focussed: {
        borderColor: globalStyles.colorPrimary
    }
});

export default styles;
