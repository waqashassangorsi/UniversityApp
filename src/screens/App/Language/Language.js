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
import SelectDropdown from "react-native-select-dropdown";
import colors from "../../../theme/colors";
const Emergency = ({ updateProfile, selectedLanguages, translation, user }) => {
  const navigation = useNavigation();
  const [profilePath, setFilePath] = useState("");
  const [namee, setName] = useState(user != null ? user.name : "");
  const [email, setemail] = useState(user != null ? user.email : "");
  const [loading, setloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState();
  const countries = ["Chinese", "English", "Spanish", "Italian", "French"];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: fonts.PoppinsBold,
            fontSize: 18,
          }}
        >
          Select Language
        </Text>
        <Text
          style={{
            color: "black",
            paddingBottom: 30,
          }}
        >
          Currently Available in English & Chinese
        </Text>
      </View>
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <SelectDropdown
          defaultButtonText={"Chinese"}
          buttonStyle={{
            backgroundColor: colors.lightWhite,
            width: "45%",
            height: 40,
            marginTop: 5,
          }}
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextStyle={{
            fontSize: 12,
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View
        style={{
          flex: 1,

          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingHorizontal: 40,
          paddingBottom: 40,
        }}
      >
        <Text style={{ color: colors.primary }}>Next</Text>
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
})(Emergency);
