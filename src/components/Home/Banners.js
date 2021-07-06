import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { getBannersApi } from "../../api/home-banner";
import { API_URL } from "../../utils//constants";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [bannerActive, setBannerActive] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await getBannersApi();
      setBanners(response);
    })();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.banner.url}` }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const goToProduct = (id) => {
    navigation.push("product", { idProducto: id });
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        data={banners}
        sliderWidth={WIDTH}
        itemWidth={WIDTH}
        renderItem={renderItem}
        onSnapToItem={(index) => setBannerActive(index)}
      />
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={bannerActive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.dot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  carousel: {
    width:WIDTH,
    height:HEIGHT/4
  },
  dotsContainer: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  dot: {
    backgroundColor: "#fff",
  },
});
