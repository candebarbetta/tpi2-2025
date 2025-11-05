import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { db } from "../firebase/config";
import Post from "../Components/Post";

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
        <Text style={styles.texto}>Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post data={item} navigation={this.props.navigation} />}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  texto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 100,
    fontWeight: "bold",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "pink",
    marginTop: 50,
    textAlign: "center",
  },
});

export default Home;
