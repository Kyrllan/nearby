import { ImageBackground, View } from "react-native";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { s } from "./styles";
import { colors } from "@/styles/theme";

import { router } from "expo-router";
import { Button } from "@/components/button";

type Props = {
  uri: string;
};

export function Cover({ uri }: Props) {
  return (
    <ImageBackground source={{ uri }} style={s.container}>
      <View style={s.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <IconArrowLeft size={24} color={colors.gray[100]} />
        </Button>
      </View>
    </ImageBackground>
  );
}
