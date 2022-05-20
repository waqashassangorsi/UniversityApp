import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import Headers1 from "../../../components/Headers1";
import { Header, Badge } from "react-native-elements";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { updateProfile } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { Persons } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../theme/fonts";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
const RequestSent = ({
  updateProfile,
  selectedLanguages,
  translation,
  user,
}) => {
  const navigation = useNavigation();
  const [profilePath, setFilePath] = useState("");
  const [namee, setName] = useState(user != null ? user.name : "");
  const [email, setemail] = useState(user != null ? user.email : "");
  const [loading, setloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState();

  return (
    <View style={{ flex: 1 }}>
      <Headers1 title={"Back"} />

      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <View
          style={{
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 24,
              fontFamily: fonts.PoppinsRegular,
            }}
          >
            Request Sent
          </Text>
          <Text style={{ paddingTop: 10, color: "gray" }}>
            This request will be active for 30 seconds
          </Text>
          <Text style={{ color: "gray" }}>after that you can send another</Text>
          <Text style={{ color: "gray" }}>request if no one respond</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "20%",
        }}
      >
        <Text style={{ color: "gray" }}>Sent request by mistake?</Text>
        <Text style={{ color: "red", fontSize: 22 }}>Cancel</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  updateProfile,
})(RequestSent);
