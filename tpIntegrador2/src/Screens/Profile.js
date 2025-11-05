import React, { Component } from "react";
import { Pressable } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { FlatList } from "react-native-web";

class Profile extends Component {
    constructor(props) {
        super(props);    
        this.state = {
          posts: []
        }
      }

    componentDidMount(){
        db.collection("posts").where("email", "==", auth.currentUser.email).orderBy("createdAt", "desc").onSnapshot(
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

    logout(){
        auth.signOut();
        this.props.navigation.navigate("Login")
    }



    render(){
        return(            
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Profile</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Nombre de usuario: {auth.currentUser.displayName}</Text>
               
                <Text style={styles.texto} >Mis posteos:</Text>
                <FlatList
                    data = {this.state.posts}
                    keyExtractor = {item => item.id.toString()}
                    renderItem = {({item}) => <Text>{item.data.texto}</Text>}
                    
                />
                
                <Pressable onPress={() => this.logout() }  >
                    <Text style={styles.texto} >Desloguearse</Text>
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

