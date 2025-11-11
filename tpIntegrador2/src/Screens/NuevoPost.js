import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";


class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      texto: ""
    }
  }

  onSubmit(email, texto) {
    db.collection("posts")
      .add({
        email: auth.currentUser.email,
        texto: texto,
        createdAt: Date.now(),
        likes: []
      })
      .then()
      .catch(e => console.log(e))
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Posteos</Text>
        <View style={styles.caja}>

          <TextInput
            style={styles.form}
            keyboardType="default"
            placeholder="Publica algo"
            onChangeText={text => this.setState({ texto: text })}
            value={this.state.texto}
          />

          <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.texto, this.state.likes)}>
            <Text style={styles.textoBoton}> Postear </Text>
          </Pressable>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#14171a"
  },
  botones: {
    backgroundColor: "#1da1f2",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10
  },
  caja: {
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  form: {
    backgroundColor: "#ffffff",
    height: 40,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    borderRadius: 20,
    margin: 8
  },
  boton: {
    backgroundColor: "#1da1f2",
    padding: 10,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 4
  },
  textoBoton: {
    color: "#ffffff",
    fontWeight: "600"
  }
});

export default NuevoPost;
