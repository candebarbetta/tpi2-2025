import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";



class Post extends Component{
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  
  actualizarDatos(){
    db.collection('posts')
    .doc(this.props.data.id)
    .update({
      likes: this.props.data.data.likes.includes(auth.currentUser.email)
      ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(
      () => console.log('actualizado')
    )
  }
  
  
  render() {
    return (
    <View style={styles.card}>
      <Text style={styles.email}>{this.props.data.data.email}</Text>
      <Text style={styles.texto}>{this.props.data.data.texto}</Text>
      <Pressable style={styles.boton} onPress={() => this.actualizarDatos(this.props.data.data.likes)}>
                  <Text style={styles.textoBoton}> Likes:{this.props.data.data.likes.length} </Text> 
                </Pressable> 

      <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate("Comentarios", { screen: 'Comentarios' }) }>
        <Text>Comentar</Text>
      </Pressable>
    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8
  },
  email: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  texto: {
    fontSize: 16,
  },
   boton: {
    backgroundColor:  "#eefe90ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
    borderSize: 1,
    borderStyle: "solid",
    borderColor: "#eefe90ff"
  },
  textoBoton: {
    color: "#ffbd59ff",
  }
});

export default Post;
