//importa uma biblioteca de códigos para classes
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import icon_login from '../../img/icon-login.png';
//importa o axios
// import Axios from 'axios'; comentado pq componentizamos
//importa o services
import {parseJwt} from '../../../Services/auth';
import api from '../../../Services/api';

//é feito uma extensão do Componente (usa a extensão)
class Login extends Component {

    constructor() 
    {
        super();

        this.state = {
            email: "",
            senha: "",
            erroMensagem: "",
            isLoading : false
        }
    }

    atualizaEstado = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    //npm install --save axios
    realizarLogin = (event) => {
        event.preventDefault();

        //
        this.setState({ ErroMensagem: ""})
        
        //----------------------------componentizado em API.JS
        // let config = {
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Access-Control-Allow-Origin":"*" //Cors
        //     }
        // }

        //subistitiu o fetch, fetch:nativo / axios:biblioteca
        // Axios.post("http://localhost:5000/api/Login", {
        //     email:this.state.email,
        //     senha:this.state.senha
        // }, config)
        //-------------------------------------------------------

        // Mostra o loading da requisição, para evitar várias tentativas
        this.setState({
            isLoading : true
        })

        api.post("/login", {
            email:this.state.email,
            senha:this.state.senha
        })
        .then(response => {
            // console.log("Retorno do Login:", response);
            // console.log("Retorno do Login:", response.status;
            // Caso a requisição retorne um status code 200
            // salva o token no localStorage
            // e define que a requisição terminou
            if (response.status === 200){
                localStorage.setItem('usuario-gufos', response.data.token)
                this.setState({ isLoading : false })

                // Exibe no console somente o token
                console.log("TOKEN:" + response.data.token)

                // recebendo o payload do token
                var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

                // // valor de base64
                console.log("PAYLOAD:" + base64)

                // // valor de payload convertido em string
                console.log("PAYLOAD STRING:" + window.atob(base64))

                // valor do payload convertido para JSON
                console.log("PAYLOAD JSON:" + JSON.parse(window.atob(base64)))

                // tipo do usuário logado
                console.log("ROLE:" + parseJwt().Role)

                if (parseJwt().Role === "1"){
                // console.log(this.props)
                this.props.history.push("/Categorias")
                } else {
                this.props.history.push("/Eventos")
                }
            }

        })
        // Caso ocorra algum erro, define o state erroMensagem como 'E-mail ou senha inválidos!'
        .catch(erro => {
            console.log("Erro: ", erro)
            this.setState({ erroMensagem: 'E-mail ou Senha inválidos!' })
            this.setState({ isLoading : false })
        })
    }

    UNSAFE_componentWillMount() {
        //props guarda as informações
        console.log("Carregando");
        document.title = this.props.titulo_pagina;
    }



    //são estados que precisam ser renderizados a cada mudança
    render() {
        //retorno é sempre em parênteses "()"
        // <Footer/> chamamos a componente footer para a pagina        
        return (
            <div>
                <Header />
                <section className="container flex">
                    <div className="img__login">
                        <div className="img__overlay">
                        </div>
                    </div>

                    <div className="item__login">
                        <div className="row">
                            <div className="item">
                                <img src={icon_login} className="icone__login" alt="imagem" />
                            </div>
                            <div className="item" id="item__title">
                                <p className="text__login" id="item__description">
                                    Bem-vindo! Faça login para acessar sua conta.
                                </p>
                            </div>
                            {/* Realizamos o Login */}
                            <form onSubmit={this.realizarLogin}>
                                <div className="item">

                                    {/* LOGIN */}
                                    <input
                                        className="input__login"
                                        placeholder="username"
                                        type="text"
                                        id="login__email"

                                        name="email"
                                        value={this.state.email}
                                        onChange={this.atualizaEstado}
                                    />
                                </div>
                                <div className="item">

                                    {/* SENHA */}
                                    <input
                                        className="input__login"
                                        placeholder="password"
                                        type="password"
                                        id="login__password"

                                        name="senha"
                                        value={this.state.senha}
                                        onChange={this.atualizaEstado}
                                    />
                                </div>
                                {/* <p style={{ color:'red'}}>{this.state.erroMensagem}</p> */}
                                {
                                    this.state.isLoading === true &&
                                <div className="item">
                                    <button type="submit" className="btn btn__login" id="btn__login" disabled>
                                        Loading...
                                    </button>
                                </div>
                                }
                                {
                                    this.state.isLoading === false &&
                                <div className="item">
                                    <button type="submit" className="btn btn__login" id="btn__login">
                                        Login
                                    </button>
                                </div>
                                }

                            </form>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}
export default Login;


