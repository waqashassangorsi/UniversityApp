/** @format */

import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { updatetoken } from "../../../redux/actions/auth";
import messaging from "@react-native-firebase/messaging";
import { connect } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
import AlertModal from "../../../components/AlertModal";

import { Header, Badge } from "react-native-elements";
import Octicons from "react-native-vector-icons/Octicons";
import { caricon } from "../../../assets";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import { notificationListener } from "../../../components/Notificationservice";
import { addfavlocation } from "../../../redux/actions/auth";
import { Loading } from "../../../components/Loading";
import colors from "../../../theme/colors";
import { Data } from "./Data";

const Map = ({
  route,
  updatetoken,
  selectedLanguages,
  user,
  addfavlocation,
  translation,
}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const loc = route.params;
  const [selected, setselected] = useState();
  const [placename, setplacename] = useState("");
  const [curLoc, setcurLoc] = useState({
    latitude: 33.54968167992937,
    longitude: 73.12356280345101,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const Dropdownloc = ["1", "2", "3"];

  const droploc = () => {
    navigation.navigate("PlacesApi", {
      stat: false,
      screen: "Map",
      datee: new Date().getTime(),
    });

    // setshowlocation("");
  };
  const pickloc = () => {
    navigation.navigate("PlacesApi", {
      stat: true,
      screen: "Map",
      datee: new Date().getTime(),
    });
  };
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [msg, setMsg] = useState("");
  const [region, setRegion] = useState({
    latitude: 33.684422,
    longitude: 73.047882,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  //////// Map
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  Geolocation.getCurrentPosition(
    (position) => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);

      setCurrentLongitude(currentLongitude);
      setCurrentLatitude(currentLatitude);
    }
    // (error) => {

    // },
    // {
    //   enableHighAccuracy: false,
    //   timeout: 30000,
    //   maximumAge: 1000
    // },
  );

  const [address, setaddress] = useState();
  useEffect(() => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        currentLatitude +
        "," +
        currentLongitude +
        "&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setaddress(
          JSON.stringify(
            responseJson.results[0].address_components[1].long_name
          )
        );
      });
  }, [currentLongitude, currentLatitude]);

  /////// pickup and dropoff location

  const [pickupadd, setpickupadd] = useState();
  const [pickuplati, setpickuplati] = useState();
  const [pickuplongi, setpickuplongi] = useState();
  const [dropoffadd, setdropoffadd] = useState();
  const [dropofflati, setdropofflati] = useState();
  const [dropofflongi, setdropofflongi] = useState();

  useEffect(() => {
    if (loc != undefined) {
      if (loc.addres1 != undefined) {
        setdropoffadd(loc.addres1);
        setdropofflati(loc.Latitude1);
        setdropofflongi(loc.Longitude1);

        if (loc.addres != undefined) {
          setpickupadd(loc.addres);
          setpickuplati(loc.Latitude);
          setpickuplongi(loc.Longitude);
        } else {
          setpickupadd(address);
          setpickuplati(currentLatitude);
          setpickuplongi(currentLongitude);
        }
      }
    }
  });
  const ConfirmAddress = () => {
    navigation.navigate("ListDriver", {
      pickadd: pickupadd,
      picklati: pickuplati,
      picklongi: pickuplongi,
      dropadd: dropoffadd,
      droplati: dropofflati,
      droplongo: dropofflongi,
    });
  };

  //////////////////////notification code

  messaging().onMessage(async (remoteMessage) => {
    // console.log(`received in foreground data123 `);
  });

  const [rating, setrating] = useState();
  // const [Data, setData] = useState();
  useEffect(() => {
    //  useFocusEffect(() => {
    // if (rating == "rate") {
    //   navigation.navigate("Ratings", {Dataa:Data});
    // }
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   "Notification caused app to open from background state:",
      //   remoteMessage.notification
      // );
      // if (remoteMessage.data.scree_name == "SoS") {
      //   navigation.navigate("DriverSoS", {
      //     data: remoteMessage.data,
      //   });
      // }
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      // if (remoteMessage.data.scree_name == "SoS") {
      //   navigation.navigate("DriverSoS", {
      //     data: remoteMessage.data,
      //   });
      // }
    });

    PushNotification.configure({
      onNotification: (notification) => {
        if (notification.userInteraction == true) {
          console.log(
            "Notification caused app to open from background state:",
            notification
          );
          // if (notification.data.scree_name == "cardscreen") {
          //   navigation.navigate("BillingPayment", {
          //     notidata: notification.data,
          //     });
          // }
        }
      },
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   "Notification caused app to open from quit state:",
          //   remoteMessage
          // );
          // if (remoteMessage.data.scree_name == "SoS") {
          //   navigation.navigate("DriverSoS", {
          //     data: remoteMessage.data,
          //   });
          // }
        }
      });
  }, [notificationListener]);

  useFocusEffect(
    React.useCallback(() => {
      hello();
    }, [])
  );

  const hello = () => {
    (async () => {
      const fcmToken = await messaging().getToken();

      const fomData = new FormData();

      fomData.append("u_id", user.u_id);
      fomData.append("token", fcmToken);

      const res = await updatetoken(fomData, navigation);
      console.log("data us from intervel", res.data);

      if (
        res.data.trip_status == "Started" ||
        res.data.trip_status == "Accepted"
      ) {
        navigation.navigate("ArrivalStatus");
      } else if (res.data.trip_status == "payment") {
        navigation.navigate("RideAmmount");
      } else if (res.data.trip_status == "rate") {
        navigation.navigate("Ratings", {
          Dataa: res.data,
          tripid: res.data.data.trip_id,
        });
      }
    })();
  };

  useFocusEffect(
    React.useCallback(() => {
      const api_interval = setInterval(() => {
        hello();
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  /////////////////add to fav

  const addfavhandle = () => {
    console.log("selected valee is", selected);
    let longi = "";
    let lati = "";
    let addres = "";
    if (selected === false) {
      if (loc != undefined) {
        if (loc.addres == undefined) {
          console.log("loc is undefinde address is", loc);
          lati = currentLatitude;
          longi = currentLongitude;
          addres = address;
        } else {
          console.log("loc is not undefinde address is", loc.addres);
          lati = loc.Latitude;
          longi = loc.Longitude;
          addres = loc.addres;
        }
      } else {
        console.log("loc is undefinde address is", loc);
        lati = currentLatitude;
        longi = currentLongitude;
        addres = address;
      }
    } else {
      console.log("loc is not undefinde address is", selected, loc);
      lati = loc.Latitude1;
      longi = loc.Longitude1;
      addres = loc.addres1;
    }

    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("name", placename);
      fomData.append("location_lat", lati);
      fomData.append("location_long", longi);
      fomData.append("location_address", addres);

      const res = await addfavlocation(fomData);
      console.log("formdat response", res, fomData);
      if (res.data.status == true) {
        setLoading(false);
        setShowAlert1(true);
        setMsg(res.data.message);
        setShowAlert(false);
      } else {
        setLoading(false);

        setMsg(res.data.message);
        setShowAlert(false);
      }
    })();
  };
  const additemtofav = (item) => {
    setselected(true);
    setShowAlert(!showAlert);
  };

  const additemfromfav = (item) => {
    setselected(false);
    setShowAlert(!showAlert);
  };

  /////////////////////
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          marginVertical: 5,
        }}
        backgroundColor={"transparent"}
        leftComponent={
          <Octicons
            name={"three-bars"}
            size={30}
            color={colors.yellow}
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{}}
          />
        }
      />
      <Loading visible={loading} />
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={curLoc}
      >
        {Data.map((val, i) => {
          return <Marker coordinate={val.coords} image={val.img} />;
        })}
      </MapView>

      {showAlert1 && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"
          form="abc"
          onOkPress={() => {
            setShowAlert1(false);
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return {
    user,
    selectedLanguages,
    translation,
  };
};
export default connect(mapStateToProps, {
  updatetoken,
  addfavlocation,
})(Map);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "88%",
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },
});
//////////////////////////code////////////////
