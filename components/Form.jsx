import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableHighlight,
  Alert,
} from "react-native";
import axios from "axios";

const Form = ({ current, selectCript, setCurrent, setSelect, setCheckApi }) => {
  const [cripts, setCripts] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setCripts(resultado.data.Data);
    };
    callAPI();
  }, []);

  const alert = () => {
    Alert.alert("Error...", "Ambos campos son obligatorios", [{ text: "OK" }]);
  };
  const getCurrent = (current) => setCurrent(current);
  const getCripto = (cripto) => setSelect(cripto);
  const getResult = () => {
    if (!current || !selectCript) {
      alert();
      return;
    }

    setCheckApi(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}> Moneda </Text>
      <Picker
        selectedValue={current}
        onValueChange={(current) => getCurrent(current)}
      >
        <Picker.Item label="- Selecionar -" value="" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Dolar Americano" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomonedas</Text>
      <Picker
        selectedValue={selectCript}
        onValueChange={(cript) => getCripto(cript)}
      >
        <Picker.Item label="- Selecionar -" value="" />
        {cripts.length &&
          cripts.map((elm) => (
            <Picker.Item
              label={elm.CoinInfo.FullName}
              value={elm.CoinInfo.Name}
              key={elm.CoinInfo.Id}
            />
          ))}
      </Picker>

      <TouchableHighlight style={styles.btn} onPress={() => getResult()}>
        <Text style={styles.text}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: "uppercase",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  container: {
    marginHorizontal: 20,
  },
  btn: {
    backgroundColor: "#5E49E2",
    padding: 10,
    marginTop: 20,
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Form;
