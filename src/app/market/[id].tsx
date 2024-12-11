import { View, Modal, Alert } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { api } from "@/service/api";
import { useEffect, useState } from "react";

import { Loading } from "@/components/loading";

import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get("/markets/" + params.id);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar o local.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        Alert.alert("Erro", "Permissão de camera negada.");
        return;
      }

      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao abrir a camera.");
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id]);

  if (loading) return <Loading />;

  if (!data) return <Redirect href="/home" />;

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={data.cover} />
      <Details data={data} />
      {coupon && <Coupon code={coupon} />}
      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView style={{ flex: 1 }} />
        <Button onPress={() => setIsVisibleCameraModal(false)}>
          <Button.Title>Voltar</Button.Title>
        </Button>
      </Modal>
    </View>
  );
}
