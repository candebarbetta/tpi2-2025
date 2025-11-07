import React, { Component } from "react"
import { View, Pressable, Text, StyleSheet, TextInput } from "react-native"
import { auth } from "../firebase/config";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            error: ""
        }
    }
    
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log('Usuario ya logueado');
            if (user) {
                this.props.navigation.navigate('HomeMenu', {
                    screen: "StackNav",
                    params: { screen: 'Home' }
                });
            }
        });
    }

    onSubmit(email, password) {
        if (!email.includes("@")) {
            this.setState({ error: 'El mail esta mal formateado' })
            return
        }
        if (password.length < 6) {
            this.setState({ error: 'La contraseña debe tener un minimo de 6 caracteres' })
            return
        }
        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => {
                this.setState({ error: 'Credenciales inválidas.' })

            })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Login</Text>


                <TextInput
                    style={styles.texto}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ mail: text })}
                    value={this.state.mail}
                />
                <TextInput
                    style={styles.texto}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <Text>{this.state.error}</Text>

                <Pressable onPress={() => this.onSubmit(this.state.mail, this.state.password)}>
                    <Text style={styles.boton2}>Inicia Sesión</Text>
                </Pressable>

                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.text}>No tengo cuenta</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        width: "100%",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        color: "#000000ff",
        marginBottom: 12,
    },
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


export default Login;
