import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";



class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  actualizarDatos() {
    db.collection('posts')
      .doc(this.props.info.id)
      .update({
        likes: this.props.info.data.likes.includes(auth.currentUser.email)
          ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
          : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(
        () => console.log('actualizado')
      )
  }


  render() {
    console.log(this.props);
    
    return (
      <View style={styles.card}>
        <Text style={styles.email}>{this.props.info.data.email}</Text>
        <Text style={styles.texto}>{this.props.info.data.texto}</Text>
        <Pressable style={styles.boton} onPress={() => this.actualizarDatos(this.props.info.data.likes)}>
          <Text style={styles.textoBoton}> Likes:{this.props.info.data.likes.length} </Text>
        </Pressable>

        <Pressable style={styles.boton} onPress={() => this.props.nav.navigate("Comentarios", {id: this.props.info.id})}>
          <Text>Comentar</Text>
        </Pressable>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    marginBottom: 10,
  },
  email: {
    fontWeight: "bold",
    color: "#14171a",
    marginBottom: 5,
  },
  texto: {
    fontSize: 15,
    color: "#14171a",
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#1da1f2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 5,
  },
  textoBoton: {
    color: "#ffffff",
    fontWeight: "600",
  },
  
});


export default Post;
