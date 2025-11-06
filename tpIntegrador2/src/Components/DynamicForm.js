import React, { Component } from "react";
import { Pressable } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-web";
import { auth, db } from "../firebase/config";



class DynamicForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comentario: "",
            value: "",
        }
      };


    onSubmit(){
        db.collection("comments").add({
          email: auth.currentUser.email,
          texto: this.state.comentario,
          createdAt: Date.now(),
          postId: this.props.idPost
        })
        .then(response => console.log(response))
        .catch(e => console.log(e))
        
    };
    

    render(){
        return(
            <View style={styles.contenedor}>
                <TextInput style={styles.formulario} 
                    keyboardType="default"
                    placeholder="comentario" 
                    onChangeText={ text => this.setState({comentario:text}) }
                    value={this.state.comentario}/> 

                <Pressable onPress={() => this.onSubmit()}>
                    <Text style={styles.texto} > subir el comentario </Text> 
                </Pressable>

                <View style={styles.texto}>
                    <Text>Datos ingresados:</Text>
                    <Text>{this.state.comentario}</Text>
                </View>


               
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 15,
    backgroundColor: "#f5f8fa", // fondo gris azulado
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e8ed"
  },
  texto: {
    textAlign: "center",
    color: "#14171a", // texto principal
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e1e8ed"
  },
  formulario: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccd6dd",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  
});

export default DynamicForm;