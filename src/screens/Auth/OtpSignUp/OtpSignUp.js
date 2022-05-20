import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import colors from "../../../theme/colors";
import { Logo2, english_logo } from "../../../assets";
const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { connect } from "react-redux";
import { confirmOTP, signin } from "../../../redux/actions/auth";
import fonts from "../../../theme/fonts";
import { CommonActions } from "@react-navigation/routers";
import RNOtpVerify from "react-native-otp-verify";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CountDown from "react-native-countdown-component";
import auth from "@react-native-firebase/auth";
import { GradientButton } from "../../../components/GradientButton";
const OtpSignUp = ({
  navigation,
  route,
  signin,
  confirmOTP,
  translation,
  selectedLanguages,
}) => {
  const [otp, setotp] = useState("");
  const [compareotp, setcompareotp] = useState("");

  const [disabled, setdisabled] = useState(true);

  const { phoneNumber } = route.params;
  const { confirmation } = route.params;
  console.log("confirmation", confirmation);

  useEffect(() => {
    RNOtpVerify.getHash()
      .then((res) => console.log("myresponse", res))
      .catch(console.log("myresponsecatch", console.log));
    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(otpHandler))
      .catch((p) => console.log("myresponse2", p));
    return () => RNOtpVerify.removeListener();
  }, []);

  // Handle user state changes
  //  function onAuthStateChanged(user) {
  // console.log(user,'user')
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  const otpHandler = (message) => {
    console.log("myresponse1", message);
    // const otp1 = /(\d{6})/g.exec(message)[0];
    // console.log('otp1', otp1)
    const otp1 = message.split(" ")[0];
    setcompareotp(otp1);
    setotp(otp1);
    if (otp1 == otp) {
      (async () => {
        // const ifotpconfirm = await confirmOTP(otp1, confirmation);
        // console.log("confirmation123",ifotpconfirm);

        const formData = new FormData();
        formData.append("phone_no", phoneNumber);
        formData.append("status", "enduser");
        new Promise((rsl, rej) => {
          signin(formData, rsl, rej);
        })
          .then(async (res) => {
            setLoading(false);

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Map" }],
              })
            );
          })
          .catch((err) => {
            // setMsg(err);
            // setShowAlert(true);
            // setLoading(false);
          });
      })();
    }
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };
  const subbmitotp = async () => {
    console.log("myresponse1234", compareotp, otp);
    if (compareotp == otp) {
      (async () => {
        const formData = new FormData();
        formData.append("phone_no", phoneNumber);
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
    }
  };

  async function signInWithPhoneNumber(phoneNumber) {
    setdisabled(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // setConfirm(confirmation);
    if (confirmation) {
      navigation.navigate("OtpSignUp", {
        phoneNumber: phoneNumber,
        confirmation: confirmation,
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={selectedLanguages == "Bulgarian" ? Logo2 : english_logo}
          style={styles.logo_blue}
        />

        <View style={styles.wrapper}>
          <Text style={styles.text}>
            {translation[3][selectedLanguages]}
            {/* An Sms has been sent to you at */}
          </Text>
          <Text
            style={[
              styles.text,
              {
                paddingTop: 10,
                color: colors.black,
              },
            ]}
          >
            {phoneNumber}
          </Text>

          {disabled == true && (
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="gray"
                style={{ alignSelf: "center" }}
              />

              <View style={{ flexDirection: "row" }}>
                <CountDown
                  until={60}
                  size={15}
                  onFinish={() => setdisabled(false)}
                  digitStyle={{
                    backgroundColor: "transparent",
                    marginLeft: -3,
                  }}
                  digitTxtStyle={{ color: "gray" }}
                  timeToShow={["S"]}
                  timeLabels={{ m: "", s: "" }}
                />
                <Text style={{ alignSelf: "center", marginLeft: -8 }}>
                  {/* s */}
                  {translation[186][selectedLanguages]}
                </Text>
              </View>
            </View>
          )}

          {disabled == false && (
            <TouchableOpacity
              onPress={() => signInWithPhoneNumber(phoneNumber)}
            >
              <Text
                style={[
                  styles.text,
                  {
                    paddingTop: 30,
                    color: colors.yellow,
                    fontSize: 16,
                  },
                ]}
              >
                {translation[127][selectedLanguages].trim()}
                {/* Resend Code */}
              </Text>
            </TouchableOpacity>
          )}
          <KeyboardAvoidingView>
            <View style={styles.phoneNumberContainer}>
              <OTPInputView
                style={{
                  width: "60%",
                  height: 40,
                }}
                pinCount={6}
                code={otp}
                autoFocusOnLoad={true}
                secureTextEntry={false}
                editable={true}
                keyboardAppearance="default"
                keyboardType="number-pad"
                clearInputs={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(otp) => {
                  subbmitotp(otp);
                }}
                onCodeChanged={(text) => setotp(text)}
              />
            </View>
          </KeyboardAvoidingView>
          <Text
            style={[
              styles.text,
              {
                paddingTop: 20,
                fontFamily: fonts.PoppinsRegular,
                color: "black",
              },
            ]}
          >
            {translation[4][selectedLanguages]}
            {/* Please enter the verification code above */}
          </Text>
          <TouchableOpacity
            onPress={() => subbmitotp()}
            style={{
              width: "75%",
              height: 50,
              backgroundColor: colors.primary,
              borderRadius: 13,
              justifyContent: "center",
              marginVertical: 50,
              marginHorizontal: 80,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ marginTop: 70, marginHorizontal: 10, elevation: 1 }}>
          <GradientButton title="Sign in" onButtonPress={() => subbmitotp()} />
        </View> */}

        {/* {<Loading visible={loading} />} */}
      </View>
      {/* {this.state.show && (
      <AlertModal
        heading={this.state.msg}
        button1="OK"
        form={true}
        onOkPress={() => {
          // this.setState({ show: false });
        }}
      />
    )} */}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  signin,
  confirmOTP,
})(OtpSignUp);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  wrapper: {
    alignItems: "center",
    width: "90%",
  },
  logo_blue: {
    height: 150,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "20%",
  },
  text: {
    fontSize: 16,
    paddingTop: 30,
    textAlign: "center",
    fontFamily: fonts.PoppinsRegular,
    color: "black",
  },
  phoneNumberContainer: {
    marginBottom: 20,
    // backgroundColor: "red",
  },
  timerContainer: {
    width: "80%",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.white,
    width: 100,
    height: 50,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily: fonts.PoppinsRegular,

    textAlign: "center",
  },
  btnContainer: {
    width: DEVICE_WIDTH > 700 ? "80%" : "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  primaryBtn: {
    width: DEVICE_WIDTH > 700 ? "80%" : "90%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: fonts.PoppinsRegular,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {},

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
  },

  underlineStyleHighLighted: {
    borderColor: colors.gray,
  },
});
