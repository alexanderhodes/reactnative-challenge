import { ToastAndroid } from "react-native";
import { toastDuration } from "./../../app.json";

export function showToast (text: string): void {
    ToastAndroid.show(text, toastDuration);
}
