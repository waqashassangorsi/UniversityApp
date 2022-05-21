import React, { useEffect } from "react";
import { Text, View, Image, ImageBackground, StyleSheet } from "react-native";
import { splashimage } from "../../../assets";
import styles from "./styles";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/routers";
import { applogo, flag } from "../../../assets";
import colors from "../../../theme/colors";
import { alltranslation, updatePassword } from "../../../redux/actions/auth";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

const Splash = ({
  isLoggedIn,
  from,
  alltranslation,
  selectedLanguages,
  translation,
  user,
}) => {
  const navigation = useNavigation();

  // const storedata=async()=>{
  //   await AsyncStorage.setItem("userdata",user1)
  //   console.log('data ====>', user1)
  //  }

  const getdata = async () => {
    const valuedata = await AsyncStorage.getItem("userdata");

    console.log("firstuservalue", valuedata);
    return valuedata;
  };

  // storedata();
  useEffect(() => {
    const timer = setTimeout(() => {
      getdata()
        .then((response) => {
          console.log("firstresponse",response);
          if (response == "1" || response == 1) {
            navigation.navigate("Emergency");
          } else {
            navigation.navigate("WalkThrough");
          }
        })

        .catch((err) => alert(err)); // TypeError: failed to fetch (the text may vary);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backcolor,
      }}
    >
      <Image
        source={splashimage}
        resizeMode="contain"
        style={{
          width: "80%",
          height: "80%",
        }}
      />
    </View>
  );
  // <ImageBackground style={styles.main} source={SplashImage} />;
};
const mapStateToProps = (state) => {
  console.log("reduxdatasave", state);

  const { isLoggedIn, translation, selectedLanguages, user } = state.auth;
  return { isLoggedIn, translation, selectedLanguages, user };
};
export default connect(mapStateToProps, { alltranslation })(Splash);
