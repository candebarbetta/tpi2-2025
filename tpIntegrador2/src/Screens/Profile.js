import React, { Component } from "react";
import { Pressable, Text, View, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Post from "../Components/Post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
        });
      });
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <View style={styles.granContenedor} >

        <View style={styles.contenedor}>
          <View style={styles.usuario}>
            <Text style={styles.infoImportante}><EvilIcons name="user" size={24} color="black" />{auth.currentUser.email}</Text>
            <Text style={styles.info}>{auth.currentUser.usuario}</Text>
          </View>

          <View style={styles.separador}>
            <Text style={styles.subtituloMejor}>Mis Tweets</Text>
            <Text style={styles.subtitulo}>|</Text>
            <Text style={styles.subtitulo}>Mis Likes</Text>
          </View>
          
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Post info={item} nav={this.props.navigation} />
            )}
          />

          <Pressable onPress={() => this.logout()} style={styles.boton}>
            <Text style={styles.botonTexto}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  contenedor: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    flex: 1
  },
  usuario: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    marginBottom: 1

  },
  info: {
    color: "#000000ff",
    fontSize: 15,
    marginBottom: 4,
  },
  infoImportante: {
    color: "#000000ff",
    fontSize: 17,
    marginBottom: 4,
    fontWeight: "bold",
  },
  subtitulo: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "600",
    color: "#55ACEE",
    alignSelf: "center"
  },
  subtituloMejor: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "bold",
    color: "#55ACEE",
    alignSelf: "center"
  },
  postCard: {
    backgroundColor: "#F5F8FA",
    padding: 10,
    marginBottom: 1,

  },
  postTexto: {
    fontSize: 15,
    color: "#14171A",

  },
  boton: {
    backgroundColor: "#55ACEE",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: "center",
    marginTop: 15,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
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
  },
  separador: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  granContenedor: {
    flex: 1
  }
});

export default Profile;
