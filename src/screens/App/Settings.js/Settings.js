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

import colors from "../../../theme/colors";

//logo
import {
  lock,
  logout1,
  updateicon,
  Questionmark,
  privicy,
  gratericon,
} from "../../../assets";

//redux
import {
  signin,
  signupwithfb,
  logoutSuccess,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import Headers1 from "../../../components/Headers1";
import Entypo from "react-native-vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const Settings = ({ signin, route, userData, signupwithfb, logoutSuccess }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backcolor,
      }}
    >
      <Headers1 title="Back" />
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Settings</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            Change Mobile number
          </Text>
          <Entypo name="chevron-right" color={"black"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EmergencyContact")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            Update helping Friends
          </Text>
          <Entypo name="chevron-right" color={"black"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TermsCondition")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            Terms & Conditions
          </Text>
          <Entypo name="chevron-right" color={"black"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RequestProgress")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>Request Progress </Text>
          <Entypo name="chevron-right" color={"black"} size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    // alignItems: 'center',
    marginTop: "5%",
  },
});

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  logoutSuccess,
})(Settings);
