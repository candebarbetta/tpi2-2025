import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DynamicForm from "../Components/DynamicForm";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }


  render() {
    return (
      <View>
        <Text>Agregar Comentario:</Text>
        <DynamicForm />


        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DynamicForm data={item} />}
        />
      </View>
    )
  }


}

export default Comentarios;