import React, { Component } from "react";
import { Pressable } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-web";

class DynamicForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comentario: "",
            value: "",
        }
      };


    onSubmit(){
        console.log(this.state);
        
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
        padding: 10,
        backgroundColor: "pink",
        borderRadius: 25,
        margin: 15,
        display:"flex",
        flexDirection: "column",
        alignItems:"center"
    }, 
    titulo: {
        fontWeight: "bold",
        color: "#b03060",
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5

    },
    texto: {
        textAlign: "center",
        color: "#c71585",
        backgroundColor: "#ffe6ef",
        padding: 10,
        borderRadius: 15,
        marginTop: 5

    },
    formulario: {
       height: 20,
       paddingVertical: 15,
       borderWidth: 5,
       borderColor: "#ffe6ef",
       borderStyle: "solid",
       borderRadius: 20,
       marginVertical: 10,
       textAlign: "center"
    }

})

export default DynamicForm;