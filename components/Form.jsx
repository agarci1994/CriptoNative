import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import axios from "axios";

const Form = () => {
  const [current, setCurrent] = useState("");
  const [cripts, setCripts] = useState("");
  const [selectCript, setSelect] = useState('')

  useEffect(() => {
    const callAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setCripts(resultado.data.Data);
    };
    callAPI();
  }, []);
  const getCurrent = (current) => setCurrent(current);
  const getCripto = (cripto) => setSelect(cripto)
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
       {cripts.length && cripts.map(elm => (<Picker.Item label={elm.CoinInfo.FullName} value={elm.CoinInfo.Name} key={elm.CoinInfo.Id} />))}
      </Picker>
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
});

export default Form;
