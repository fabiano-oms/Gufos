select * from tipo_usuario;
select * from usuario;
select * from localizacao;
select * from categoria;
select * from evento;
select * from presenca;

UPDATE Usuario
SET TipoUsuario = 'Colaborador'
WHERE IdUsuario = 2;