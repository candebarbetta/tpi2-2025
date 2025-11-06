import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DynamicForm from "../Components/DynamicForm";
import {  db } from "../firebase/config";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      idPost: this.props.route.params.id,

    };
  }

  componentDidMount(){
    db.collection("posts")
    .where("id", "==", this.state.idPost)
    .onSnapshot(docs=>{
      let postArr=[];
      docs.forEach(doc => {
        postArr.push({
          id: doc.id,
          data: doc.data()
        }) 
      })
      this.setState({
        posts: postArr
      })
    })

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
      this.setState({ comments: comments });
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
            <Text style={styles.postEmail}>{item.data.email}</Text>
            <Text style={styles.postText}>{item.data.texto}</Text>
            <Text style={styles.likes}>
             Likes❤️ : {item.data.likes.length}
            </Text>
            </View>
            )}
        />

        
        <DynamicForm idPost={this.state.idPost} />

        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View  style={styles.commentCard}>
              <Text style={styles.commentEmail}>{item.data.email}</Text>
              <Text style={styles.commentText}>{item.data.texto}</Text>
            </View>
          )}
        />
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
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e1e8ed"
  },
  postEmail: {
    fontWeight: "bold",
    color: "#1DA1F2",
    marginBottom: 4,
  },
  postText: {
    fontSize: 16,
    color: "#ffffffff",
    marginBottom: 6,
  },
  likes: {
    fontSize: 14,
    color: "#657786",
  },
  commentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e1e8ed",
  },
  commentEmail: {
    fontWeight: "bold",
    color: "#1DA1F2",
  },
  commentText: {
    fontSize: 15,
    color: "#ffffffff",
    marginTop: 4,
  },
});


export default Comentarios;