-- ------------------------------------------------------------
-- Insertion de données dans la table user
-- ------------------------------------------------------------

INSERT INTO user (lastName, firstName, email, password, phone, role) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', 'password123', '0123456789', 'user'),
('Martin', 'Claire', 'claire.martin@example.com', 'password123', '0123456790', 'user'),
('Durand', 'Pierre', 'pierre.durand@example.com', 'password123', '0123456791', 'admin'),
('Leclerc', 'Sophie', 'sophie.leclerc@example.com', 'password123', '0123456792', 'admin');

-- ------------------------------------------------------------
-- Insertion de données dans la table tournament
-- ------------------------------------------------------------

INSERT INTO tournament (name, description, adress, eventDate, createdAt, updatedAt, id_user) VALUES
('Tournoi de Football', 'Tournoi de football pour amateurs', 'Stade de France, Paris', '2024-12-01 09:00:00', NOW(), NOW(), 3),
('Championnat de Tennis', 'Compétition de tennis ouverte à tous les niveaux', 'Court central, Roland-Garros, Paris', '2024-12-15 10:00:00', NOW(), NOW(), 4);

-- ------------------------------------------------------------
-- Insertion de données dans la table match
-- ------------------------------------------------------------

INSERT INTO `match` (name, description, numberOfPlayers, adress, eventDate, createdAt, updatedAt, id_user, id_tournament) VALUES
('Match de Football', 'Match entre deux équipes de football amateur', 22, 'Stade de France, Paris', '2024-12-01 11:00:00', NOW(), NOW(), 3, 1),
('Match de Tennis', 'Demi-finale du championnat de tennis', 2, 'Court central, Roland-Garros', '2024-12-15 14:00:00', NOW(), NOW(), 4, 2);

-- ------------------------------------------------------------
-- Insertion de données dans la table team
-- ------------------------------------------------------------

INSERT INTO team (name, numberOfPlayers, id_user) VALUES
('Les Aigles', 11, 3),
('Les Tigres', 11, 3),
('Les Raquettes', 2, 4),
('Les Smashers', 2, 4);

-- ------------------------------------------------------------
-- Insertion de données dans la table comment
-- ------------------------------------------------------------

INSERT INTO comment (content, id_user, id_match, id_tournament) VALUES
('Super match, j\'ai adoré!', 1, 1, 1),
('Très bonne organisation!', 2, 2, 2),
('Les deux équipes étaient au top!', 1, 2, 2);

-- ------------------------------------------------------------
-- Insertion de données dans la table have
-- ------------------------------------------------------------

INSERT INTO have (id, id_match) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);

-- ------------------------------------------------------------
-- Insertion de données dans la table join
-- ------------------------------------------------------------

INSERT INTO `join` (id, id_match) VALUES
(1, 1),  -- Jean Dupont participe au match 1
(2, 2),  -- Claire Martin participe au match 2
(3, 1),  -- Pierre Durand participe au match 1
(4, 2);  -- Sophie Leclerc participe au match 2;