//importa uma biblioteca de códigos para classes
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
//importamos uma sub-propriedade com o link
import { Link } from 'react-router-dom';

//é feito uma extensão do Componente (usa a extensão)
class Categorias extends Component {
    //são estados que precisam ser renderizados a cada mudança

    constructor() {
        super();
        this.state = {
            lista: [],
            nome: ""
        }
        //Faz a ligação de todos os metodos
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.deletarCategoria = this.deletarCategoria.bind(this);
    }



    UNSAFE_componentWillMount() {
        //props guarda as informações
        console.log("carregando");
        document.title = this.props.titulo_pagina;
    }
    componentDidMount() {
        console.log("carregado");
        console.log(this.state.lista);
        this.listaAtualizada();
    }
    componentDidUpdate() {
        console.log("Atualizando");
    }
    componentWillUnmount() {
        console.log("saindo");
    }

    listaAtualizada = () => {
        fetch("http://localhost:5000/api/Categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))
    }

    //Metodo Post
    cadastrarCategoria(event) {
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.nome);

        fetch("http://localhost:5000/api/Categoria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tituloCategoria: this.state.nome })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }))
            })
            .catch(error => console.log(error))
    }

    //Metodo Deletar
    deletarCategoria = (id) =>{
        console.log("Excluindo");

        fetch("http://localhost:5000/api/Categoria/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }))
            })
            .catch(error => console.log(error))
    }

    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }


    render() {
        let instituicao = "SENAI";
        //retorno é sempre em parênteses "()" e com uma div abraçando tudo
        // <Footer/> chamamos a componente footer para a pagina        
        return (
            <div>
                <main className="conteudoPrincipal">
                    <Link to="/"> Voltar </Link>
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.lista.map(function (categoria) {
                                            return (
                                                <tr key={categoria.idCategoria}>
                                                    <td>{categoria.idCategoria}</td>
                                                    <td>{categoria.tituloCategoria}</td>
                                                    <td>
                                                        <button onClick={e => deletarCategoria(categoria.idCategoria)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">
                                Cadastrar Tipo de Evento
                            </h2>
                            <form onSubmit={this.cadastrarCategoria}>
                                <div className="container">
                                    <input
                                        type="text"
                                        id="nome-tipo-evento"
                                        placeholder="tipo do evento"

                                        value={this.state.nome}
                                        onChange={this.atualizaNome.bind(this)}
                                    />
                                    <button
                                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>
                <Footer escola={instituicao} />
            </div>
        )
    }
}
export default Categorias;