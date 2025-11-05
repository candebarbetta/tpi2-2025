import React, { Component } from "react";
import { Pressable } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);    
        this.state = {
          posts: []
        }
      }

    componentDidMount(){
        db.collection("posts").where("owner", "==", auth.currentUser.email).orderBy("createdAt", "desc").onSnapshot(
            docs =>{
                let posts= [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
            this.setState({
                posts: posts,
                
            })
            }
        )
    }



    render(){
        return(            
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Profile</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Nombre de usuario: {auth.currentUser.displayName}</Text>
                <Pressable
                    onPress={ ()=> props.navigation.navigate("Login")}>
                    <Text style={styles.texto}>Desloguearse</Text>
                </Pressable>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    contenedor: {
        padding: 10,
        backgroundColor: "pink",
        borderRadius: 25,
        margin: 15
    }, 
    titulo: {
        fontWeight: "bold",
        color: "#b03060",
        textAlign: "center",
        fontSize: 16,
        marginBottom: 10 

    },
    texto: {
        textAlign: "center",
        color: "#c71585",
        backgroundColor: "#ffe6ef",
        padding: 10,
        borderRadius: 25

    }

})

export default Profile;