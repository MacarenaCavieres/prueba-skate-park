drop table if exists skaters;

CREATE TABLE skaters (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(50) NOT NULL, 
	nombre VARCHAR(25) NOT NULL, 
	password VARCHAR(25) NOT NULL, 
	anos_experiencia INT NOT NULL, 
	especialidad VARCHAR(50) NOT NULL, 
	foto VARCHAR(255) NOT NULL, 
	estado BOOLEAN NOT NULL default false
);
	
select * from skaters;

insert into skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado) values
('tony@mail.com', 'Tony Hawk', '123', 12, 'Kickflip', '../imgs/tony.jpg', true);