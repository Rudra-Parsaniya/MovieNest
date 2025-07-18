create database MovieDB

CREATE TABLE Movies (
    MovieId INT PRIMARY KEY IDENTITY(1,1),
    MovieTitle VARCHAR(255) NOT NULL,
    MovieGenre VARCHAR(100),
    ReleaseYear INT,
    ImgUrl TEXT,
	Rating DECIMAL(3,1) CHECK (Rating BETWEEN 0 AND 10),
    Description TEXT,
	Duration INT CHECK (Duration > 0)
);


CREATE TABLE RecMovies (
    RecId INT PRIMARY KEY IDENTITY(1,1),
    MovieId INT,
    FOREIGN KEY (MovieId) REFERENCES movies(MovieId)
);


CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName VARCHAR(100),
    Age INT,
    Email VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE WatchList (
    WatchlistId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    MovieId INT,
	UNIQUE(UserId, MovieId),
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (MovieId) REFERENCES movies(MovieId)
);

CREATE TABLE Favorites (
    FavoriteId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    MovieId INT,
	UNIQUE(UserId, MovieId),
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (MovieId) REFERENCES movies(MovieId)
);



INSERT INTO RecMovies (MovieId) VALUES (1);
INSERT INTO RecMovies (MovieId) VALUES (101);
INSERT INTO RecMovies (MovieId) VALUES (105);
INSERT INTO RecMovies (MovieId) VALUES (107);
INSERT INTO RecMovies (MovieId) VALUES (111);
INSERT INTO RecMovies (MovieId) VALUES (116);
INSERT INTO RecMovies (MovieId) VALUES (126);
INSERT INTO RecMovies (MovieId) VALUES (128);
INSERT INTO RecMovies (MovieId) VALUES (147);
INSERT INTO RecMovies (MovieId) VALUES (151);
INSERT INTO RecMovies (MovieId) VALUES (153);
INSERT INTO RecMovies (MovieId) VALUES (155);
INSERT INTO RecMovies (MovieId) VALUES (160);
INSERT INTO RecMovies (MovieId) VALUES (161);
INSERT INTO RecMovies (MovieId) VALUES (169);
INSERT INTO RecMovies (MovieId) VALUES (170);
INSERT INTO RecMovies (MovieId) VALUES (172);
INSERT INTO RecMovies (MovieId) VALUES (177);
INSERT INTO RecMovies (MovieId) VALUES (3);
INSERT INTO RecMovies (MovieId) VALUES (4);
INSERT INTO RecMovies (MovieId) VALUES (8);
INSERT INTO RecMovies (MovieId) VALUES (10);
INSERT INTO RecMovies (MovieId) VALUES (80);
INSERT INTO RecMovies (MovieId) VALUES (81);
INSERT INTO RecMovies (MovieId) VALUES (84);
INSERT INTO RecMovies (MovieId) VALUES (92);
INSERT INTO RecMovies (MovieId) VALUES (98);
INSERT INTO RecMovies (MovieId) VALUES (15);
INSERT INTO RecMovies (MovieId) VALUES (17);
INSERT INTO RecMovies (MovieId) VALUES (20);
INSERT INTO RecMovies (MovieId) VALUES (21);
INSERT INTO RecMovies (MovieId) VALUES (23);
INSERT INTO RecMovies (MovieId) VALUES (24);
INSERT INTO RecMovies (MovieId) VALUES (25);
INSERT INTO RecMovies (MovieId) VALUES (34);
INSERT INTO RecMovies (MovieId) VALUES (38);
INSERT INTO RecMovies (MovieId) VALUES (49);
INSERT INTO RecMovies (MovieId) VALUES (57);
INSERT INTO RecMovies (MovieId) VALUES (60);
INSERT INTO RecMovies (MovieId) VALUES (70);
INSERT INTO RecMovies (MovieId) VALUES (74);
INSERT INTO RecMovies (MovieId) VALUES (77);
INSERT INTO RecMovies (MovieId) VALUES (79)



SELECT 
    r.RecId,
    m.MovieTitle,
    m.MovieGenre,
    m.ReleaseYear,
    m.Rating,
    m.Description,
    m.Duration,
    m.ImgUrl
FROM 
    RecMovies r
INNER JOIN 
    Movies m
    ON r.MovieId = m.MovieId
ORDER BY 
    r.RecId;