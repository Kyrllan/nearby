import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    backgroundColor: colors.green.base,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 14,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[100],
  },
});
