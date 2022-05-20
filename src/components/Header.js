import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { sendsos, unblockpasanger } from "../redux/actions/auth";
import { Header } from "react-native-elements";
import AlertModal from "../components/AlertModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./Text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { updatetoken } from "../redux/actions/auth";
import messaging from "@react-native-firebase/messaging";
const Headers1 = ({
  title,
  route,
  selectedLanguages,
  user,
  updatetoken,
  show,
  screen,
  rate,
}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Header
      containerStyle={{
        marginVertical: 20,
      }}
      backgroundColor={"transparent"}
      leftComponent={
        <View
          style={{
            flexDirection: "row",
            width: 500,
            alignItems: "center",
          }}
        >
          <Ionicons
            name={"chevron-back"}
            size={24}
            color={colors.secondary}
            style={{ paddingTop: 4 }}
          />

          <View>
            <Text>{title}</Text>
          </View>
        </View>
      }
    />
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation, trip_id } = state.auth;
  return { user, selectedLanguages, translation, trip_id };
};
export default connect(mapStateToProps, {
  sendsos,
  updatetoken,
})(Header);
