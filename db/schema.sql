
CREATE DATABASE rutgers;
USE rutgers;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE shows
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	watched BOOLEAN DEFAULT false,
    genre varchar(255) NOT NULL,
    released varchar(255) NOT NULL,
    rating varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM users;

SELECT * FROM shows