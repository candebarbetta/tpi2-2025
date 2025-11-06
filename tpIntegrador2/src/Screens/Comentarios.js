import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DynamicForm from "../Components/DynamicForm";
import {  db } from "../firebase/config";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <View>
        <FlatList
        data={this.state.post}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View >
            <Text>{item.data.email}</Text>
            <Text>{item.data.texto}</Text>
            <Text>
             Likes: {item.data.likes.length}
            </Text>
            </View>
            )}
        />

        
        <DynamicForm idPost={this.state.idPost} />


        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DynamicForm data={item}  />}
        />

        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.data.email}</Text>
              <Text>{item.data.texto}</Text>
            </View>
          )}
        />
      </View>
    )
  }


}

export default Comentarios;