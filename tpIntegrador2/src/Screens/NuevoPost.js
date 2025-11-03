import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

class NuevoPost extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      email: '',
      texto: ''
    }
  }

  onSubmit(email, texto){
    db.collection('posts')
      .add({
        email: email,
        texto: texto,
        createdAt: Date.now(),
        likes: []
      })
      .then()
      .catch(e => console.log(e))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Posteos</Text>
        <View style={styles.caja}>
        
          <TextInput 
            style={styles.form}
            keyboardType='email-address' 
            placeholder='email' 
            onChangeText={ text => this.setState({email:text}) }
            value={this.state.email} 
          />
          
          <TextInput 
            style={styles.form}
            keyboardType="default"
            placeholder="texto"
            onChangeText={text => this.setState({texto:text})}
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
    marginTop: 150,
    padding: 20,
    backgroundColor: "pink",
    borderRadius: 10,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },

  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },

  botones: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  caja: {
    paddingHorizontal: 10,
    marginTop: 20
  },
  
  form: {
    backgroundColor: "white",
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    bordersize: 1,
    borderColor: "#8e1f37ff",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },

  boton: {
    backgroundColor:  "#eefe90ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
    borderSize: 6,
    borderStyle: "solid",
    borderColor: "#ffb73aff"
  },
  textoBoton: {
    color: "#ffbd59ff",
  }
});

export default NuevoPost;
