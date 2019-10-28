-- TO DO create the schema for the database
CREATE DATABASE checkout;

USE checkout;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  full_name CHAR(20),
  email CHAR(200),
  user_password CHAR(200),
  primary key (id)
) ENGINE = InnoDB;

CREATE TABLE addresses (
  id INT NOT NULL AUTO_INCREMENT,
  user INT,
  line_1 CHAR(200),
  line_2 CHAR(200),
  city CHAR(100),
  state_abb CHAR(100),
  zip INT,
  foreign key (user)
    references users(id)
    ON DELETE CASCADE,
  primary key (id)
) ENGINE = InnoDB;

CREATE TABLE credit (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  user INT,
  card_number INT,
  expiry INT,
  CVV INT,
  billing_zip INT,
  -- the user is linked to the users table
  room INT,
  foreign key (user)
    references users(id)
    ON DELETE CASCADE,
  primary key (id)
) ENGINE = InnoDB;