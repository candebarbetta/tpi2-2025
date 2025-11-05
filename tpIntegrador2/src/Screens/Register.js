import React, { Component } from "react"
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native"
import { auth, db } from "../firebase/config";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            displayName: "",
            password: ""
        }
    }

    onSubmit(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.setState({ registered: true })

                auth.currentUser.updateProfile({
                    displayName: this.state.displayName
                  });

                db.collection('users').add({
                    email: email,
                    displayName: this.state.displayName,
                    createdAt: Date.now(),
                })
                    .then(response => console.log(response))
                    .catch(e => console.log(e))
            })
            .catch(error => {
                this.setState({ error: 'Fallo en el registro.' })
                console.log(this.state);

            })

            this.props.navigation.navigate("Login");

    };

    render() {
        return (
            <View style={styles.container}>
                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.text}>Ya tengo cuenta</Text>
                </Pressable>

                <TextInput
                    style={styles.texto}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.texto}
                    keyboardType='default'
                    placeholder='Username'
                    onChangeText={text => this.setState({ displayName: text })}
                    value={this.state.displayName}
                />
                <TextInput
                    style={styles.texto}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <Pressable onPress={() => this.onSubmit(this.state.email, this.state.password)} >
                    <Text style={styles.boton2}>Registrate</Text>
                </Pressable>

                <Text>{this.state.email}</Text>
                <Text>{this.state.displayName}</Text>
                <Text>{this.state.password}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fa",
    justifyContent: "center",
    alignItems: "center"
  },
  boton: {
    backgroundColor: "#1da1f2",
    padding: 12,
    marginVertical: 10,
    borderRadius: 24,
    width: "70%",
    alignItems: "center"
  },
  boton2: {
    backgroundColor: "#1da1f2",
    padding: 12,
    marginVertical: 10,
    borderRadius: 24,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold"
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  },
  texto: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#e1e8ed",
    borderRadius: 20,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#ffffff"
  }
});

export default Register;
