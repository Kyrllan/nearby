import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import { api } from "@/service/api";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar as categorias.");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return;
      const { data } = await api.get("/markets/category/" + category);
      setMarkets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar os locais.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: 14,
                    color: colors.gray[600],
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.regular,
                    fontSize: 14,
                    color: colors.gray[600],
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  );
}
