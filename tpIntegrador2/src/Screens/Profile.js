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
  pantalla: {
    flex: 1,
    backgroundColor: "#f5f8fa", // fondo gris claro como Twitter
    padding: 10,
  },
  contenedor: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  titulo: {
    fontWeight: "700",
    color: "#14171a",
    textAlign: "center",
    fontSize: 22,
    marginBottom: 12,
  },
  info: {
    textAlign: "center",
    color: "#657786",
    fontSize: 16,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1DA1F2",
    marginTop: 16,
    marginBottom: 10,
  },
  postCard: {
    backgroundColor: "#f7f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    padding: 12,
    marginBottom: 10,
  },
  postTexto: {
    fontSize: 16,
    color: "#14171a",
  },
  boton: {
    backgroundColor: "#1DA1F2",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  botonTexto: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});



export default Profile;

