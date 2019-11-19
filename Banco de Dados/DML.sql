insert into tipo_usuario (Tipo_Usuario) values
('Administrador'),
('Aluno');

insert into usuario (Usuario, Email, Senha, Id_Tipo_Usuario) values
('Administrador','adm@adm.com','senha123','1'),
('Ariel','ariel@gmail.com','arielzinhodev','2');

insert into localizacao (Endereco, CNPJ, Razao_Social) values
('Alameda Barão de Limeira, 539','','Escola SENAI de Informática');

insert into categoria (Titulo_Categoria) values
('Desenvolvimento'),
('HTML + CSS'),
('Marketing');

insert into evento (Titulo_Evento, Data_Evento, Acesso_Livre, Id_Categoria, Id_Localizacao) values
('C#','2019-08-07T18:00:00',0,2,1),
('Estrutura Semântica',getdate(),1,2,1);

insert into presenca (Status_Pesenca, Id_Usuario, Id_Evento) values
('AGUARDANDO',2,1),
('CONFIRMADO',1,1);



delete from evento where id_Evento=3;