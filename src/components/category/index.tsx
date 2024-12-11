import { Text, Pressable, PressableProps } from "react-native";
import { s } from "./styles";
import { colors } from "@/styles/colors";
import { categoriesIcons } from "@/utils/categories-icons";

type Props = PressableProps & {
  iconId: string;
  isSelected: boolean;
  name: string;
};

export function Category({ iconId, isSelected, name, ...rest }: Props) {
  const Icon = categoriesIcons[iconId];
  return (
    <Pressable
      {...rest}
      style={[s.container, isSelected && s.containerSelected]}
    >
      <Icon
        size={16}
        color={isSelected ? colors.gray[100] : colors.gray[400]}
      />
      <Text style={[s.name, isSelected && s.nameSelected]}>{name}</Text>
    </Pressable>
  );
}
