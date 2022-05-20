import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

import Headers1 from "../../../components/Headers1";
import { Header, Badge } from "react-native-elements";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { updateProfile } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { Persons, speaker } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
const SendingRequest = ({
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{}}>
        <Text
          style={{
            color: "gray",
            fontSize: 24,
            fontFamily: fonts.PoppinsRegular,
          }}
        >
          Sending Request to{"\n"}nearby FA Kit Points
        </Text>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 15 }}>
      <TouchableOpacity onPress={()=>navigation.navigate("RequestSent")}>
        <Image
          source={speaker}
          style={{ height: 200, width: 200, borderRadius: 200 / 2 }}
        />
                </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("Emergency")}>
        <Text
          style={{
            color: "red",
            fontSize: 24,
            fontFamily: fonts.PoppinsRegular,
            paddingTop: 10,
          }}
        >
          cancel
        </Text>
        </TouchableOpacity>
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
})(SendingRequest);
