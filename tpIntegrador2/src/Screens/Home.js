import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { db } from "../firebase/config";
import Post from "../Components/Post";
import AntDesign from '@expo/vector-icons/AntDesign';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
      docs => {
        let postsNuevos = [];
        docs.forEach(doc => {
          postsNuevos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: postsNuevos,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <AntDesign name="twitter" size={24} color="blue" style={styles.logo} />
        <Text style={styles.texto}>Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post info={item} />}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fa",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 12
  },
  logo: {
    alignSelf: "center",
    color: "#1DA1F2", // azul Twitter
    marginTop: 10,
    marginBottom: 5,
  },
  texto: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14171a",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e1e8ed",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    textAlign: "center",
    alignSelf: "center"
  },
});


export default Home;
