import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DynamicForm from "../Components/DynamicForm";
import { db } from "../firebase/config";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      idPost: this.props.route.params.id,

    };
  }

componentDidMount() {
  db.collection("posts")
    .where("idPost", "==", this.state.idPost)
    .onSnapshot(docs => {
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.setState({ posts: posts });
    });

    db.collection("comments")
      .where("postId", "==", this.state.idPost)
      .orderBy("createdAt", "desc")
      .onSnapshot(docs => {
        let comments = [];
        docs.forEach(doc => {
          comments.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({ 
          comments: comments 
        });
      });
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.objetosArriba}>
                <Text style={styles.postEmail}><EvilIcons name="user" size={24} color="black" />{item.data.email}</Text>
                <Text > ... </Text>
              </View>
              <Text style={styles.postText}>{item.data.texto}</Text>
              <View style={styles.objetos}>
                <Text style={styles.likes}>♡{item.data.likes.length}</Text>
                <Text style={styles.icono}>⇌</Text>
                <Text style={styles.icono}><Entypo name="share" size={15} color="black" /></Text>
              </View>
            </View>
          )}
        />


        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <View style={styles.objetosArriba}>
                <Text style={styles.commentEmail}>{item.data.email}</Text>
                <Text > ... </Text>
              </View>
              <Text style={styles.commentText}>{item.data.texto}</Text>
            </View>
          )}
        />
        <DynamicForm idPost={this.state.idPost} />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fa",
    padding: 12,
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 12,
    marginBottom: 10,
  },
  postEmail: {
    fontWeight: "bold",
    color: "#1DA1F2",
    marginBottom: 4,
  },
  postText: {
    fontSize: 16,
    color: "#000000ff",
    marginBottom: 6,
  },
  likes: {
    fontSize: 20,
    color: "#657786",
  },
  commentCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 1,
  },
  commentEmail: {
    fontWeight: "bold",
    color: "#1DA1F2",
  },
  commentText: {
    fontSize: 15,
    color: "#000000ff",
    marginTop: 4,
  },
  objetosArriba: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  objetos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"

  }
});


export default Comentarios;