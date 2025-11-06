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
                    <Text style={styles.texto} > ↑ </Text> 
                </Pressable>

                


               
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flexDirection: "row", 
    padding: 15,
    backgroundColor: "#ffffff", 
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e8ed"
  },
  texto: {
    textAlign: "center",
    color: "#ffffffff", 
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    marginLeft: 10,
    fontSize: 20
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