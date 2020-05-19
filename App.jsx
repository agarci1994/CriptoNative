import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Header from "./components/Header";
import Form from "./components/Form";
import axios from "axios";

const App = () => {
  const [current, setCurrent] = useState("");
  const [selectCript, setSelect] = useState("");
  const [checkApi, setCheckApi] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const getResult = async () => {
      if (checkApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectCript},ETH&tsyms=${current}`;
        const result = await axios.get(url);
        setResult(result.data[selectCript][current]);
        setCheckApi(false);
      }
    };
    getResult();
  }, [checkApi]);
  return (
    <>
      <Header />

      <Image
        style={styles.img}
        source={require("./assets/img/cryptomonedas.png")}
      />

      <Form
        current={current}
        selectCript={selectCript}
        setCurrent={setCurrent}
        setSelect={setSelect}
        setCheckApi={setCheckApi}
      />
      <View style={styles.containerText}>
        <Text style={styles.textResult}> El valor esta en: {result}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
  containerText: {
    padding: 20,
    backgroundColor: "#5E49E2",
    flex: 1,
    flexDirection: "column",
    marginVertical: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  textResult: {
    fontSize: 30,
    fontWeight: "900",
    color: "black",
  },
});

export default App;
