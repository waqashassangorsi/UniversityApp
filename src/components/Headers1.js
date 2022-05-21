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
import colors from "../theme/colors";
const Headers1 = ({
  title,
  route,
  selectedLanguages,
  user,
  updatetoken,
  show,
  screen,
  rate,
  onButtonPress
}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const api_interval = setInterval(() => {
        (async () => {
          const fcmToken = await messaging().getToken();

          const fomData = new FormData();

          fomData.append("u_id", user.u_id);
          fomData.append("token", fcmToken);

          fomData.append("selectedLanguages", selectedLanguages);
          const res = await updatetoken(fomData, navigation);
          console.log("data us from intervel header", res);
          if (screen != "false") {
            if (
              res.data.trip_status == "Started" ||
              res.data.trip_status == "Accepted"
            ) {
              navigation.navigate("ArrivalStatus");
            } else if (res.data.trip_status == "payment") {
              navigation.navigate("BillingPayment", {
                tripid: res.data.data.trip_id,
                did: res.data.data.driver_id,
                payment: res.data.data.payableamt,
                screen: "Map",
              });
            }
            // else if (res.data.trip_status == 'rate') {
            //   navigation.navigate('Ratings',{
            //   Dataa:res.data,
            //     })
            //   }
          }
          // console.log("data was", res.data)
        })();
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  return (
    
    <Header
      containerStyle={{
        // marginVertical: 10,
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
          {show != "No" && (
            <Ionicons
              name={"chevron-back"}
              size={24}
              color={colors.secondary}
              onPress={onButtonPress}
              style={{ paddingTop: 4 }}
            />
          )}

          <TouchableOpacity onPress={onButtonPress}>
            
            <Text style={{ fontSize: 20, marginLeft: 0,color:'gray', }}>{title}</Text>
          </TouchableOpacity>

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
})(Headers1);
