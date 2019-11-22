//cria constantes para verificar o login do usuário
//Verifica se há um token no localStorage
export const usuarioAutenticado = () => localStorage.getItem('usuario-gufos') !== null

//Define a constante parseJwt
export const parseJwt = () => {
    //Que define a variável base64, que recebe o payload do token
    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

    //Retorna o PAYLOAD convertido de base64 para string e de string para JSON
    return JSON.parse(window.atob(base64))
}