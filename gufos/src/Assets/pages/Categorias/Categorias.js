//importa uma biblioteca de códigos para classes
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
//importamos uma sub-propriedade com o link
// import { Link } from 'react-router-dom'; retiramos o LINK, portanto o import não é necessário

// Import da biblioteca Material Design Bootstrap React
// npm install --save mdbreact
// npm audit fix
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

//é feito uma extensão do Componente (usa a extensão)
class Categorias extends Component {

    // São estados que precisam ser renderizados a cada mudança
    // Usado para poder criar nossos "states"
    constructor() {
        // Usado para poder manipular os "states", que são herdados de Component (obrigatório para usar o State)
        super();
        this.state = {
            // Definimos uma lista inicial vazia
            lista: [],
            // Variável vazia para: pegar o valor do input de cadastro
            nome: "",
            //  MDB
            modal: false,
            // Usamos para armazenar os dados a serem alterados
            // Se tem formulário, basicamente tem atributo para manipular
            editarModal: {
                idCategoria: "",
                tituloCategoria: ""
            },
            // Criando um estado para verificar o carregament
            loading: false,
            // Mensagem de erro
            erroMsg: ""
        }

        // *Faz a ligação de todos os Métodos
        // Damos o ".bind" quando não utilizamos o "arrow function"
        // Nesse caso "cadastrarCategoria (parâmetro)"
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        // Não precisa disso, porque o método foi feito com "arrow function"
        // Nesse caso "deletarCategoria = (parâmetro) => {}"
        // this.deletarCategoria = this.deletarCategoria.bind(this);
    }

    // Abrir e Fechar o Modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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

    // Método GET - Listar
    listaAtualizada = () => {

        // Habilita o ícone de carregando
        this.setState({ loading: true })

        fetch("http://localhost:5000/api/Categoria")
            .then(response => response.json())
            // Preenche a lista vazia com dados do Banco
            .then(data => this.setState({ lista: data }))

        // Desabilita o ícone de carregando após 2 segundos
        setTimeout(() => {
            this.setState({ loading: false })
        }, 2000);
    }

    // Metodo POST - Cadastrar
    cadastrarCategoria(evento) {
        // Se utiliza para evitar o recarregamento da página
        evento.preventDefault();

        // Usado para poder ver as ações sendo executadas (uma forma de debug)
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
            // Retorno de erro
            .catch(error => console.log(error))
    }

    // Método DELETE - Excluir
    deletarCategoria = (id) => {
        console.log("Excluindo");

        this.setState({ erroMsg: "" })

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
                // deve ser comentada para evitar chamar a lista com o valor que foi deletado
                // this.setState(() => ({ lista: this.state.lista }))
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    erroMsg: "Não é possível excluir esta categoria, verifique se não há eventos que a utilizem"
                })
            })
    }

    // Acionado quando clicamos no botão Editar para capturar e salvar no state os dados atuais
    alterarCategoria = (categoria) => {
        console.log(categoria);

        this.setState({
            editarModal: {
                idCategoria: categoria.idCategoria,
                tituloCategoria: categoria.tituloCategoria
            }
        })
        //abrir modal
        this.toggle();
    }

    // Método PUT - Update    
    salvarAlteracoes = (evento) => {
        // Previne que a página seja recarregada, a fim de não perder informações ja preenchidas
        evento.preventDefault();

        // Rodar a aplicação na porta 5000 e em http
        fetch("http://localhost:5000/api/Categoria/" + this.state.editarModal.idCategoria, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.editarModal)
        })
            .then(response => response.json())
            .catch(error => console.log(error))

        // Atraso na requisição, "carregamento muito rápido pode quebrar o código" pois são assíncronos, e este código não pode carregar primeiro
        setTimeout(() => {
            this.listaAtualizada();
        }, 1000)

        // fechar o modal
        this.toggle();
    }

    // Utilizamos para poder alterar o input de cadastro (manipulando com o setState)
    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }

    // Utilizamos para atualizar os states dos inputs dentro do modal
    // linkado com o evento onChange no INPUT, com .bind, para pegar ele mesmo
    atualizaEditarModalTituloCategoria(input) {
        this.setState({
            editarModal: {
                idCategoria: this.state.editarModal.idCategoria,
                tituloCategoria: input.target.value
            }
        })
    }


    render() {
        let instituicao = "SENAI";
        //retorno é sempre em parênteses "()" e com uma div abraçando tudo
        // <Footer/> chamamos a componente footer para a pagina        
        return (
            <div>
                <Header />
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        {/* Terceira coluna para o botão de Excluir */}
                                        <th>Excluir</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        // Percorrer a lista de Categorias
                                        this.state.lista.map(function (categoria) {
                                            return (
                                                // Colocamos uma "key" pois cada linha em JSX precisa de um ID único
                                                <tr key={categoria.idCategoria}>
                                                    <td>{categoria.idCategoria}</td>
                                                    <td>{categoria.tituloCategoria}</td>
                                                    <td>
                                                        <button onClick={e => this.alterarCategoria(categoria)}>Alterar</button>
                                                        <button onClick={e => this.deletarCategoria(categoria.idCategoria)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                            // Usamos para vincular todo o contexto do "map()"
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>

                            {/* Verifica e caso haja uma msg de erro ele mostra abaixo da tabela */}
                            {this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div>}

                            {/* Verifica se o estado de loading está como true e mostra o ícone de carregando */}
                            {/* EXIBE O ÍCONE DE LOADING */}
                            {/* fas fa-spinner é o ícone de loading & fa-spin faz ele girar & fa-2x é tamanho */}
                            {this.state.loading && <i className="fas fa-spinner fa-spin fa-2x blue-text"></i>}

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

                            {/* Utilizamos o Modal da biblioteca para fazer o UPDATE */}
                            <MDBContainer>
                                {/* Abraçamos os inputs do container com um form, para poder utilizar o onSubmit */}
                                <form onSubmit={this.salvarAlteracoes}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.tituloCategoria}</MDBModalHeader>
                                        <MDBModalBody>
                                            {/* input do modal - com tratamento*/}
                                            <MDBInput
                                                label="Categoria"
                                                value={this.state.editarModal.tituloCategoria}
                                                onChange={this.atualizaEditarModalTituloCategoria.bind(this)}
                                            />
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                            {/* Inclúimos o "type = submit" no botão para enviar o formulário */}
                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </form>
                            </MDBContainer>

                        </div>
                    </section>
                </main>
                <Footer escola={instituicao} />
            </div>
        )
    }
}
export default Categorias;