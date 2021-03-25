import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Rating, AirbnbRating } from "react-native-ratings";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Context from "../context/globalSettings";
import { Icon } from "react-native-elements";
import common_styles from "../components/settings";
import DropdownAlert from "react-native-dropdownalert";
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const defaultState = {
  typing_username: false,
  typing_password: false,
  animation_login: new Animated.Value(width - 40),
  enable: true,
  meal_info: {
    meal_name: "",
    fats: "",
    protein: "",
    Carbohydrate: "",
    email: "",
    calories: "",
    recipe: "",
  },
  token: "",
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  _animation() {
    Animated.timing(this.state.animation_login, {
      toValue: 200,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      // setTimeout(() => {
      // this.props.navigation.navigate("Login");
      // this.setState({
      // ...defaultState,
      // });
      // }, 1500);
    });

    setTimeout(() => {
      this.setState({
        enable: false,
      });
    }, 150);
  }

  componentDidMount() {
    this._getInfo();
    // const { navigation } = this.props;
    // navigation.addListener("willFocus", () => this._getInfo());
  }

  async _Save() {
    this.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "The meal has been add, Waiting for the Nutritionist approval."
    );

    // let selected = this.state.selectedItems;
    // let items = [];
    // for (let i = 0; i < selected.length; i++) {
    //   await items.push(selected[i].id);
    // }

    // let header = new Headers();
    // let form = new FormData();
    // form.append("username", Context._currentValue.username);
    // form.append("reaction", this.state.rating);
    // var arr = await JSON.stringify(items);
    // form.append("meals", arr);

    // // header.append("Authorization", "Token " + Context._currentValue.token);
    // var requestOptions = {
    //   method: "POST",
    //   // headers: header,
    //   body: form,
    //   redirect: "follow",
    // };
    // await fetch("http://192.168.43.72:8000/API/add_reaction/", requestOptions)
    //   .then((response) => response.text())
    //   .then(async (result) => {
    //     console.log(result);
    //     let response = await JSON.parse(result);
    //     this.dropDownAlertRef.alertWithType(
    //       "success",
    //       "Success",
    //       "The meal has been add, Waiting for Nutirtion approval :)"
    //     );
    //   });

    this._animation();
  }
  async _getInfo() {
    var header = new Headers();
    header.append("Authorization", "Token " + Context._currentValue.token);
    var requestOptions = {
      method: "GET",
      headers: header,
      redirect: "follow",
    };
    await fetch(
      Context._currentValue.ApiUrl + "/API/all_meals/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        let array = [];
        for (let i = 0; i < response.length; i++) {
          array.push({ id: response[i].pk, name: response[i].name });
        }
        this.setState({ meals: array });
      });
  }
  render() {
    const button_width = this.state.animation_login;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require("../img/header.png")}
            style={styles.imageBackground}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
              style={styles.back_button}
            >
              <Icon
                name="arrow-back"
                size={26}
                type="Ionicons"
                container
                color={"#ffffff"}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.profile_container}>
          <View style={styles.avatar_container}>
            <Image
              source={require("../img/fast_food.png")}
              style={{
                height: 180,
                width: 180,
                top: -80,
                justifyContent: "center",
                left: width / 4,
              }}
            />
          </View>
        </View>
        <DropdownAlert
          ref={(ref) => (this.dropDownAlertRef = ref)}
          successColor={"#b038ac"}
          successImageSrc={require("../img/check.png")}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  profile_container: {
    flex: 2,
    // marginLeft: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  avatar_container: {
    alignItems: "center",
    top: "-29%",
    position: "absolute",
  },
  avatar: {
    borderRadius: 100,
    height: 150,
    width: 150,
    // borderWidth: 10,
    // borderColor: "rgba(101, 27, 98,0.6)",
  },
  Username: {
    margin: 5,
    fontSize: 20,
  },
  info_card: {
    width: width - 25,
    // height: height / 2.5,
    marginTop: -50,
    borderRadius: 20,
    padding: 20,
  },
  card_title: {
    fontSize: 18,
    // color: "#ffffff",
    fontWeight: "bold",
    marginTop: 7,
  },
  card_title_input: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
    color: "#f4d7f3",
    width: "100%",
  },
  card_title_container: {
    backgroundColor: common_styles.colors.TextInputContainerColor,
    justifyContent: "center",
    height: 45,
    borderRadius: 10,
    // padding: 10,
    marginBottom: 8,
    width: width - 160,
    textAlign: "center",
    justifyContent: "center",
  },
  card_title_row_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back_button: {
    margin: 10,
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(101, 27, 98,0.6)",
    borderRadius: 40,
    justifyContent: "center",
  },
  animation: {
    backgroundColor: "#93278f",
    paddingVertical: 10,
    // marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
    left: 15,
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});