CREATE TABLE session(
"id" SERIAL PRIMARY KEY,
"token" VARCHAR(50) NOT NULL,
"email" VARCHAR(30) NOT NULL,
"time" TIMESTAMP NOT NULL DEFAULT NOW()/* ,
CONSTRAINT "FK_SESSION_USER" FOREIGN KEY ("email")
    REFERENCES usuario("email")
    ON DELETE CASCADE */
);
