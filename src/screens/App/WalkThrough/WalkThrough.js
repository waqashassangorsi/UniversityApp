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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { updateProfile } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { Persons, Success1, walk1, walk2, walk3, walk4 } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
import AsyncStorage from "@react-native-community/async-storage";

const WalkThrough = ({
  updateProfile,
  selectedLanguages,
  translation,
  user,
  
}) => {
  const navigation = useNavigation();
  const [profilePath, setFilePath] = useState("");
  const [namee, setName] = useState(user != null ? user.name : "");
  const [email, setemail] = useState(user != null ? user.email : "");
  const [walkhrough, setwalkhrough] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [colorful, setcolorful] = useState(1);
   const valuedata="1";

  const storeVAlue=async()=>{
    await AsyncStorage.setItem("userdata", valuedata)
    console.log('firstvalue', valuedata)
    navigation.navigate("Emergency")
   }
  const nextsecreen = () => {
    if (walkhrough == 4) {
      navigation.navigate("Signup");
    }
    setwalkhrough(walkhrough + 1);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.backcolor }}>
      <Headers1 title={"Back"}/>
      {walkhrough == 1 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{}}>
            <Image source={walk1} style={styles.logo_blue} />
          </View>
          <View style={{}}>
            <Text style={{ color: "gray", fontSize: 16, paddingTop: "20%" }}>
              Tap to connect with all the
            </Text>
            <Text style={{ color: "gray", fontSize: 16 }}>
              First Aid Kit Points around you
            </Text>
          </View>
        </View>
      )}
      {walkhrough == 2 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{}}>
            <Image source={walk2} style={styles.logo_blue} />
          </View>
          <View style={{}}>
            <Text style={{ color: "gray", fontSize: 16, paddingTop: "20%" }}>
              Request shops to drop FA Kits
            </Text>
            <Text style={{ color: "gray", fontSize: 16 }}>
              to drop your location in emergency
            </Text>
            <Text style={{ color: "gray", fontSize: 16 }}>situations</Text>
          </View>
        </View>
      )}
      {walkhrough == 3 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{}}>
            <Image source={walk3} style={styles.logo_blue} />
          </View>
          <View style={{}}>
            <Text style={{ color: "gray", fontSize: 16, paddingTop: "20%" }}>
              inform your friends and family
            </Text>
            <Text style={{ color: "gray", fontSize: 16 }}>
              when you are in emergency
            </Text>
            <Text style={{ color: "gray", fontSize: 16 }}>situations</Text>
          </View>
        </View>
      )}
      {walkhrough == 4 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{}}>
            <Image source={walk4} style={styles.logo_blue} />
          </View>
          <View style={{}}>
            <Text style={{ color: "gray", fontSize: 16, paddingTop: "20%" }}>
              Accessible by Hotkeys,Voice
            </Text>
            <Text style={{ color: "gray", fontSize: 16 }}>Commands</Text>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingBottom: "10%",
        }}
      >
        <TouchableOpacity onPress={()=>storeVAlue()}>
          <Text style={{ color: "red" }}>Skip</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          {walkhrough > 0 ? (
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                color={colors.primary}
              />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons name="checkbox-blank-circle-outline" />
            </View>
          )}
          {walkhrough > 1 ? (
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                color={colors.primary}
              />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons name="checkbox-blank-circle-outline" />
            </View>
          )}
          {walkhrough > 2 ? (
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                color={colors.primary}
              />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons name="checkbox-blank-circle-outline" />
            </View>
          )}
          {walkhrough > 3 ? (
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                color={colors.primary}
              />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons name="checkbox-blank-circle-outline" />
            </View>
          )}
        </View>
        <TouchableOpacity onPress={nextsecreen}>
          <Text style={{ color: colors.primary }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logo_blue: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  updateProfile,
})(WalkThrough);
