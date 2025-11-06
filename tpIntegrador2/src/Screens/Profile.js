import React, { Component } from "react";
import { Pressable } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { FlatList } from "react-native";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        db.collection("posts").where("email", "==", auth.currentUser.email).orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posts = [];
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

    logout() {
        auth.signOut();
        this.props.navigation.navigate("Login")
    }



    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Profile</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Nombre de usuario: {auth.currentUser.displayName}</Text>

                <Text style={styles.texto} >Mis posteos:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text>{item.data.texto}</Text>}

                />

                <Pressable onPress={() => this.logout()}  >
                    <Text style={styles.texto} >Desloguearse</Text>
                </Pressable>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    contenedor: {
        padding: 12,
        backgroundColor: "#f5f8fa",
        borderRadius: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: "#e1e8ed"
    },
    titulo: {
        fontWeight: "bold",
        color: "#14171a",
        textAlign: "center",
        fontSize: 18,
        marginBottom: 10
    },
    texto: {
        textAlign: "center",
        color: "#14171a",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#e1e8ed",
        marginTop: 8
    }
});


export default Profile;

