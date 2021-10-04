CREATE DATABASE ask_it;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  answers INTEGER NOT NULL
  PRIMARY KEY(user_id)
);

INSERT INTO users (firstname, lastname, email, user_password, answers) VALUES ('milica', 'djokic', 'milica16.djokic@gmail.com', 'milica16', 0);


CREATE TABLE questions(
  question_id SERIAL,
  title VARCHAR(255) NOT NULL,
  question_text VARCHAR(255) NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  user_id UUID ,
  question_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE answers(
  answer_id SERIAL,
  answer_text VARCHAR(255) NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  user_id UUID ,
  answer_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  question_id SERIAL
  PRIMARY KEY (answer_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);