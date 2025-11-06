import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';



class Post extends Component {
  constructor(props) {
    super(props);
    
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
        <View style={styles.objetosArriba}>
        <Text style={styles.email}><EvilIcons name="user" size={24} color="black" />{this.props.info.data.email}</Text>
        <Text > ... </Text>
        </View>
        <Text style={styles.texto}>{this.props.info.data.texto}</Text>
        <View style={styles.objetos}>
        <Pressable  onPress={() => this.actualizarDatos(this.props.info.data.likes)}>
          <Text style={styles.icono} > ♡{this.props.info.data.likes.length} </Text>
        </Pressable>

        <Pressable  onPress={() => this.props.nav.navigate("Comentarios", {id: this.props.info.id})}>
          <Text style={styles.icono}><FontAwesome5 name="comment-alt" size={15} color="black" /></Text>
        </Pressable>
        <Text style={styles.icono}>⇌</Text>
         <Text style={styles.icono}><Entypo name="share" size={15} color="black" /></Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 12,
    marginBottom: 2
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
    marginTop: 5
  },
  textoBoton: {
    color: "#ffffff",
    fontWeight: "600",
  },
  objetos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
    
  },
  icono: {
    fontSize: 20
  },
  objetosArriba: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
  
});


export default Post;
