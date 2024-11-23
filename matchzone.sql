#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
    id        INT AUTO_INCREMENT NOT NULL,
    lastName  VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    email     VARCHAR(100) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    phone     VARCHAR(150) NOT NULL,
    role      VARCHAR(50) NOT NULL,
    CONSTRAINT user_PK PRIMARY KEY (id)
) ENGINE=InnoDB;


#------------------------------------------------------------
# Table: tournament
#------------------------------------------------------------

CREATE TABLE tournament(
    id          INT AUTO_INCREMENT NOT NULL,
    name        VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    adress      VARCHAR(255) NOT NULL,
    eventDate   DATETIME NOT NULL,
    image       VARCHAR(255),
    createdAt   DATETIME NOT NULL,
    updatedAt   DATETIME NOT NULL,
    id_user     INT NOT NULL,
    CONSTRAINT tournament_PK PRIMARY KEY (id),
    CONSTRAINT tournament_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
) ENGINE=InnoDB;


#------------------------------------------------------------
# Table: `match`
#------------------------------------------------------------

CREATE TABLE `match`(
    id              INT AUTO_INCREMENT NOT NULL,
    name            VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    numberOfPlayers INT NOT NULL,
    adress          VARCHAR(255) NOT NULL,
    eventDate       DATETIME NOT NULL,
    image           VARCHAR(255),
    createdAt       DATETIME NOT NULL,
    updatedAt       DATETIME NOT NULL,
    id_user         INT NOT NULL,
    id_tournament   INT,
    CONSTRAINT match_PK PRIMARY KEY (id),
    CONSTRAINT match_user_FK FOREIGN KEY (id_user) REFERENCES user(id),
    CONSTRAINT match_tournament0_FK FOREIGN KEY (id_tournament) REFERENCES tournament(id)
) ENGINE=InnoDB;


#------------------------------------------------------------
# Table: team
#------------------------------------------------------------

CREATE TABLE team(
    id              INT AUTO_INCREMENT NOT NULL,
    name            VARCHAR(100) NOT NULL,
    numberOfPlayers INT NOT NULL,
    id_user         INT NOT NULL,
    CONSTRAINT team_PK PRIMARY KEY (id),
    CONSTRAINT team_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
) ENGINE=InnoDB;


#------------------------------------------------------------
# Table: comment
#------------------------------------------------------------

CREATE TABLE comment(
    id            INT AUTO_INCREMENT NOT NULL,
    content       TEXT NOT NULL,
    id_user       INT NOT NULL,
    id_match      INT,
    id_tournament INT,
    CONSTRAINT comment_PK PRIMARY KEY (id),
    CONSTRAINT comment_user_FK FOREIGN KEY (id_user) REFERENCES user(id),
    CONSTRAINT comment_match0_FK FOREIGN KEY (id_match) REFERENCES `match`(id),
    CONSTRAINT comment_tournament1_FK FOREIGN KEY (id_tournament) REFERENCES tournament(id)
) ENGINE=InnoDB;


#------------------------------------------------------------
# Table: have
#------------------------------------------------------------

CREATE TABLE have(
    id       INT NOT NULL,
    id_match INT NOT NULL,
    CONSTRAINT have_PK PRIMARY KEY (id, id_match),
    CONSTRAINT have_team_FK FOREIGN KEY (id) REFERENCES team(id),
    CONSTRAINT have_match0_FK FOREIGN KEY (id_match) REFERENCES `match`(id)
) ENGINE=InnoDB;


#------------------------------------------------------------
# Table: `join`
#------------------------------------------------------------

CREATE TABLE `join`(
    id       INT NOT NULL,
    id_match INT NOT NULL,
    CONSTRAINT join_PK PRIMARY KEY (id, id_match),
    CONSTRAINT join_user_FK FOREIGN KEY (id) REFERENCES user(id),
    CONSTRAINT join_match0_FK FOREIGN KEY (id_match) REFERENCES `match`(id)
) ENGINE=InnoDB;
