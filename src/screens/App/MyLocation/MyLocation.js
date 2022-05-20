import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import axios from "axios";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
//logo
import { Persons, addphoto, cross } from "../../../assets";
import Headers1 from "../../../components/Headers1";
import { GradientButton } from "../../../components/GradientButton";

//redux
import {
  signin,
  signupwithfb,
  getMylocations,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { Header, Badge } from "react-native-elements";
import fonts from "../../../theme/fonts";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MyLocation = ({ signin, route, signupwithfb, getMylocations }) => {
  const navigation = useNavigation();
  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await getMylocations("", user.id, "");
      if (res.data.status == true) {
        // setallarticles(res.data.data);
        // setSelected('top');
      } else {
      }
      // setLoading(false);
    })();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={{ paddingTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "85%", paddingLeft: 10 }}>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              fontFamily: fonts.PoppinsRegular,
            }}
          >
            Police{" "}
          </Text>
        </View>
        <View style={{ width: "10%" }}>
          <Text style={{ fontSize: 16, color: "red" }}>Call</Text>
        </View>
      </View>
    </View>
  );
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1 title="Back" />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold", fontWeight: "bold", fontSize: 22 }}>
          National Emergency NOS
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <View
        style={{
          flex: 1,
          marginTop: "30%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "red",
            fontFamily: fonts.PoppinsRegular,
          }}
        >
          Inform your friend
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default connect(null, { signupwithfb, signin })(MyLocation);
