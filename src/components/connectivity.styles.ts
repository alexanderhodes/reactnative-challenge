import globalStyles from "../../global-styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colorRed,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    text: {
        color: globalStyles.colorWhite,
        textAlign: "center"
    }
});

export default styles;
