import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import CustomText from "../../../components/Text";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import fonts from "../../../theme/fonts";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { CommonActions } from "@react-navigation/routers";
import { GradientButton } from "../../../components/GradientButton";
import { connect } from "react-redux";
import CountryPicker from "react-native-country-picker-modal";
import { signin } from "../../../redux/actions/auth";
import { Logo2, applogo, flag, english_logo } from "../../../assets";
import Foreground from "../../../components/Foreground";
import Geolocation from "@react-native-community/geolocation";
import { addListener } from "npm";
const Signup = ({ navigation, signin, selectedLanguages, translation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [mnumber, setmnumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [val, setval] = useState([]);
  const [countryCode, setCountryCode] = useState("BG");
  const [country, setCountry] = useState("");
  const [callingCode, setcallingCode] = useState("359");
  const onSelect = (country) => {
    console.log("country", country);
    setCountryCode(country.cca2);
    console.log("country1", country.callingCode);
    setCountry(country);
    setcallingCode(country.callingCode);
  };
  const subbmitotp = () => {
    (async () => {
      const formData = new FormData();
      formData.append("phone_no", mnumber);
      formData.append("status", "enduser");
      console.log("response from data", formData);
      const res = await signin(formData);
      if (res.data.status == true) {
        if (res.data.data.user_privilidge == 1) {
          setShowAlert(true);
          setMsg(translation[126][selectedLanguages]);
          // setMsg("Your account is blocked,please contact support");
        } else {
          if (res.data.data.is_first_registered == 0) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "EditProfile" }],
              })
            );
          } else if (res.data.data.is_first_registered == 1) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Map" }],
              })
            );
          }
        }
      }
    })();
  };

  console.log("selectlanguage", selectedLanguages);
  console.log("first", translation[0]);

  useEffect(() => {
    Geolocation.getCurrentPosition((data) => console.log(data));
    console.log("GeoLocation");
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission assigned");
        } else {
          console.log("Permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();

    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permission assigned");
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      requestLocationPermission();
      console.log("Permission denied");
    } else if (granted === PermissionsAndroid.RESULTS.BLOCKED) {
      requestLocationPermission();
      console.log("Permission denied permanently");
    } else {
      console.log("Permissions");
    }
  };
  requestLocationPermission();
  async function signInWithPhoneNumber(phoneNumber) {
    // alert(phoneNumber);
    // return false;
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

    // setConfirm(confirmation);

    if (confirmation) {
      navigation.navigate("OtpSignUp", {
        phoneNumber: phoneNumber,
        confirmation: confirmation,
      });
      setLoading(false);
    }
  }
  async function confirmCode() {
    try {
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  // For Bulgaria
  const check = () => {
    if (mnumber.length == 9) {
      //877309086
      // alert('+359'+ mnumber)
      signInWithPhoneNumber("+359" + mnumber);
    } else if (mnumber.length == 10) {
      //0877309086
      // alert('+359'+ mnumber.slice(1))
      signInWithPhoneNumber("+359" + mnumber.slice(1));
    } else if (mnumber.length == 12) {
      //359877309086
      // alert('+'+ mnumber)
      signInWithPhoneNumber("+" + mnumber);
    } else if (mnumber.length == 13) {
      // +359877309086
      // alert(mnumber)
      signInWithPhoneNumber(mnumber);
    } else if (mnumber.length == 14) {
      // 00359877309086
      // alert('+'+ mnumber.slice(2))
      signInWithPhoneNumber("+" + mnumber.slice(2));
    }
  };

  // For Pakistan
  // const check = () => {
  //   if (mnumber.length == 10) {
  //     //3016332182
  //     // alert('+92'+ mnumber)
  //     signInWithPhoneNumber("+92" + mnumber);
  //   } else if (mnumber.length == 11) {
  //     //03016332182
  //     // alert('+92'+ mnumber.slice(1))
  //     signInWithPhoneNumber("+92" + mnumber.slice(1));
  //   } else if (mnumber.length == 12) {
  //     //923016332182
  //     // alert('+'+ mnumber)
  //     signInWithPhoneNumber("+" + mnumber);
  //   } else if (mnumber.length == 13) {
  //     // +923016332182
  //     // alert(mnumber)
  //     signInWithPhoneNumber(mnumber);
  //   } else if (mnumber.length == 14) {
  //     // 00923016332182
  //     // alert('+92'+ mnumber.slice(4))
  //     signInWithPhoneNumber("+92" + mnumber.slice(4));
  //   }
  // };

  return (
    <SafeAreaView style={{ ...styles.mainContainer }}>
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: "30%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
            Add your name and number
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: "5%",
          }}
        >
          <TextInput
            placeholder="Name"
            style={{
              width: "90%",
              backgroundColor: "white",
              height: 40,
              fontSize: 20,
              marginLeft: 20,
              borderBottomWidth: 1,
            }}
            selectionColor={colors.red}
            keyboardType={"number-pad"}
            onChangeText={(pno) => setmnumber(pno)}
            theme={{
              colors: {
                primary: colors.red,
                underlineColor: "transparent",
              },
            }}
            maxLength={10}
          />
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              borderWidth: 0,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              borderBottomWidth: 2,
              color: "gray",
            }}
          >
            <CountryPicker
              containerButtonStyle={{
                height: 40,
                marginTop: 5,
                justifyContent: "center",
              }}
              countryCode={countryCode}
              withCountryNameButton={true}
              visible={false}
              withFlag={true}
              withCloseButton={true}
              withAlphaFilter={true}
              withCallingCode={true}
              //   withCurrency={true}
              withEmoji={true}
              //   withCurrencyButton={true}
              // withCallingCodeButton={true}
              withFilter={true}
              withModal={true}
              onSelect={onSelect}
              // country={country}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 20,
                color: colors.gray,
                marginLeft: 20,
              }}
            >
              Your Mobile Number*
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
              width: "90%",
            }}
          >
            <View style={{ borderBottomWidth: 1, flexDirection: "row" }}>
              {/* <AntDesign
                style={{
                  marginTop: 13,
                }}
                name="plus"
                size={16}
                color="black"
              /> */}
              <Text
                style={{
                  backgroundColor: "white",
                  borderBottomWidth: 0,
                  fontSize: 19,
                  marginTop: 8,
                  marginLeft: 1,
                }}
              >
                {callingCode}
              </Text>
            </View>

            <TextInput
              style={{
                width: "84%",
                backgroundColor: "white",
                height: 40,
                fontSize: 20,
                marginRight: 10,
                marginLeft: 10,
                borderBottomWidth: 1,
              }}
              selectionColor={colors.red}
              keyboardType={"number-pad"}
              onChangeText={(pno) => setmnumber(pno)}
              theme={{
                colors: {
                  primary: colors.red,
                  underlineColor: "transparent",
                },
              }}
              maxLength={10}
              // value={num}
              // keyboardType="numeric"
            />
          </View>
          <View style={{ paddingLeft: 20, paddingTop: 20 }}>
            <Text style={{ color: "gray" }}>
              An OTP will be sent to the number{"\n"}to verify your mobile
              number
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 70, marginHorizontal: 10, elevation: 1 }}>
          <GradientButton
            title="Next"
            onButtonPress={() =>
              signInWithPhoneNumber("+" + callingCode + mnumber)
            }
            // onButtonPress={() =>
            //   subbmitotp()

            // }
          />
        </View>

        {showAlert && (
          <AlertModal
            heading={msg}
            button1={translation[185][selectedLanguages]}
            // button1="OK"
            form={true}
            onOkPress={() => {
              setShowAlert(false);
            }}
          />
        )}
        <Loading visible={loading} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  signin,
})(Signup);
