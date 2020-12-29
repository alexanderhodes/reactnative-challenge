import { ToastAndroid } from "react-native";

export function showToast (text: string): void {
    ToastAndroid.show(text, 500);
}
