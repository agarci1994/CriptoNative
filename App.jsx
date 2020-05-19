import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Header from './components/Header'
import Form from './components/Form'

const App = () => {
  return (
  <>
  <Header />

  <Image style={styles.img} source={require('./assets/img/cryptomonedas.png')} />

  <Form />
  </>
  );
};

const styles = StyleSheet.create({
img: {
  width: '100%',
  height: 150,
  marginHorizontal: '2.5%'
}
});

export default App
