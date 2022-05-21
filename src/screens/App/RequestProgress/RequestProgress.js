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
import { useFocusEffect } from "@react-navigation/native";

import { updateProfile } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { speaker } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
const RequestProgress = ({
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
  const [timer, settimer] = useState(15);

  useFocusEffect(
    React.useCallback(() => {
      let j = 0;
      // const [timer, settimer] = useState(15);

      const api_interval = setInterval((i) => {
        //hello();
        j++;
        alert("sdsd")

        console.log("myivalue", j);
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{
          marginVertical: 5,
        }}
        backgroundColor={"transparent"}
        leftComponent={
          <Octicons
            name={"three-bars"}
            size={30}
            color={"gray"}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        }
      />

      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <View
          style={{
            alignItems: "center",
            paddingTop: 20,
            // backgroundColor: "blue",
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 24,
              fontFamily: fonts.PoppinsRegular,
            }}
          >
            Request in Progress
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.primary,
              width: 250,
              height: 250,
              borderRadius: 250 / 2,
            }}
            onPress={() => navigation.navigate("RequestSent")}
          >
            <View
              style={{
                height: 200,
                width: 200,
                backgroundColor: "white",
                borderRadius: 200 / 2,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 60,
                    fontFamily: fonts.PoppinsRegular,
                  }}
                >
                  {timer}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate("Emergency")}
        >
          <Text style={{ color: "red", fontSize: 22, paddingTop: 20 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Map")}
          style={{
            width: "35%",
            height: 110,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.PoppinsRegular,
              padding: 10,
            }}
          >
            Take me to{"\n"}FAK Point
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Entypo name="chevron-small-right" color={"black"} size={30} />
            <Feather
              name="send"
              color={"red"}
              size={24}
              style={{ paddingRight: 10 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyLocation")}
          style={{
            width: "35%",
            height: 110,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.PoppinsRegular,
              padding: 10,
            }}
          >
            Emergency{"\n"}Contacts
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Entypo name="chevron-small-right" color={"black"} size={30} />
            <Feather
              name="phone-call"
              color={"red"}
              size={24}
              style={{ paddingRight: 10 }}
            />
          </View>
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
})(RequestProgress);
