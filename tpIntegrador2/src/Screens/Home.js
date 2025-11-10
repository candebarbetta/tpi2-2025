import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { db } from "../firebase/config";
import Post from "../Components/Post";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
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
    console.log(this.props);

    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post info={item} nav={this.props.navigation} />}
        />

      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fa",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 12
  },
  texto: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 12
  },
});


export default Home;
