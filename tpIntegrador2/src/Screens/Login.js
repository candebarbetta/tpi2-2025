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
                this.setState({ loggedIn: true });
                this.props.navigation.navigate('HomeMenu', { screen: 'Home' })
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
                    <Text style={styles.text}>Registrate</Text>
                </Pressable>

                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('HomeMenu', { screen: 'Home' })}>
                    <Text style={styles.text}>Home</Text>
                </Pressable>

                <Text>{this.state.mail}</Text>
                <Text>{this.state.password}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        width: '100%',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffe6f0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boton: {
        backgroundColor: '#f4a9c6',
        padding: 12,
        marginVertical: 10,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center'
    },
    boton2: {
        backgroundColor: '#f4a9c6',
        padding: 12,
        marginVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },

    text: {
        color: '#fff',
        fontWeight: 'bold'
    },
    texto: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#f4a9c6',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#fff'
    }
})

export default Login;
