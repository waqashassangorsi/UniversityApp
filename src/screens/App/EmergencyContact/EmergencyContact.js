import React, { useEffect, useState, useRef } from "react";
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import Headers1 from "../../../components/Headers1";
import { Header, Badge } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { GradientButton } from "../../../components/GradientButton";
import { updateProfile } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { Persons, cross } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../theme/fonts";
// const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
import SelectDropdown from "react-native-select-dropdown";
import { add } from "react-native-reanimated";
import Contacts from "react-native-contacts";
import ListItem from "../../../components/ListItem";
import colors from "../../../theme/colors";
const Emergency = ({ updateProfile, selectedLanguages, translation, user }) => {
  const navigation = useNavigation();

  const [namee, setName] = useState(user != null ? user.name : "");
  const [email, setemail] = useState(user != null ? user.email : "");
  const [loading, setloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const countries = ["Chinese", "English", "Spanish", "Italian", "French"];
  let [contacts, setContacts] = useState([]);
  let [flatListData, setflatListData] = useState([1]);
  const [updateflatlistmenu, setupdateflatlistmenu] = useState("0");
  const [isModalVisible, setModalVisible] = useState(false);

  const addplusfield = () => {
    flatListData.push(1);
    setupdateflatlistmenu(new Date());
    // console.log("inputfieldarray", inputfieldarray);
  };
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
        );
        setContacts(contacts);
      })
      .catch((e) => {
        alert("Permission to access contacts was denied");
        console.warn("Permission to access contacts was denied");
      });
  };

  const search = (text) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === "" || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then((contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
        );
        setContacts(contacts);
        console.log("contacts", contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then((contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
        );
        setContacts(contacts);
        console.log("contacts", contacts);
      });
    }
  };

  const openContact = (contact) => {
    console.log(JSON.stringify(contact));
    Contacts.openExistingContact(contact);
  };

  const FlatListItem = (item) => {
    return (
      <View>
        <Text
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}
        >
          Sadam
        </Text>
      </View>
    );
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closemodal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Headers1 title={"Back"} />
      <View style={{ flex: 1, paddingHorizontal: "10%" }}>
        <View style={{}}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Add your emergency Contact
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            You can add as much as three
          </Text>
        </View>

        <View style={{ width: "82%", paddingTop: "10%" }}>
          <FlatList
            data={flatListData}
            renderItem={FlatListItem}
            keyExtractor={(item) => item}
            extraData={updateflatlistmenu}
          />
        </View>

        <TouchableOpacity
          onPress={addplusfield}
          style={{ flexDirection: "row", paddingTop: 15, alignItems: "center" }}
        >
          <Ionicons
            name="add-circle-outline"
            color={colors.primary}
            size={25}
          />

          <Text style={{ color: colors.primary, paddingLeft: 10 }}>
            Add more
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleModal}
          style={{ alignItems: "center", paddingTop: "15%" }}
        >
          <Text style={{ color: colors.primary, paddingLeft: 10 }}>
            Choose from contacts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              paddingBottom: 60,
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closemodal();
                }}
              >
                <Image
                  source={cross}
                  resizemode="contain"
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={contacts}
              renderItem={(contact) => {
                {
                  console.log("contact -> " + JSON.stringify(contact));
                }
                return (
                  <ListItem
                    key={contact.item.recordID}
                    item={contact.item}
                    onPress={openContact}
                  />
                );
              }}
              keyExtractor={(item) => item.recordID}
            />
          </View>
        </Modal>
      </View>
      <View style={styles.container1}>
        <GradientButton title="Next"  onButtonPress={()=>navigation.navigate("Emergency")}/>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 0.5,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#4591ed",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: "#f0eded",
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === "android" ? undefined : 15,
  },
});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  updateProfile,
})(Emergency);
