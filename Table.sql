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

CREATE TABLE UpcomingMovies (
    UpcomingId INT PRIMARY KEY IDENTITY(1,1),
    MovieTitle VARCHAR(255) NOT NULL,
    MovieGenre VARCHAR(100),
    ReleaseYear INT,
    ImgUrl TEXT,
    Description TEXT,
    Duration INT CHECK (Duration > 0),
    ReleaseDate DATE NOT NULL,
    TrailerUrl TEXT
);

CREATE TABLE TrendingMovies (
    TrendingId INT PRIMARY KEY IDENTITY(1,1),
    MovieId INT UNIQUE,
    TrendingScore DECIMAL(5,2) CHECK (TrendingScore >= 0),
    FOREIGN KEY (MovieId) REFERENCES Movies(MovieId)
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


INSERT INTO UpcomingMovies (MovieTitle, MovieGenre, ReleaseYear, ImgUrl, Description, Duration, ReleaseDate, TrailerUrl)
VALUES 
(
  'Avatar 3',
  'Sci-Fi',
  2025,
  'https://images.hdqwalls.com/wallpapers/avatar-fire-and-ash-4k-poster-a4.jpg',
  'The next chapter in James Cameron’s Avatar saga, continuing the journey of the Navi on Pandora.',
  180,
  '2025-12-19',
  'https://youtu.be/nb_fFj_0rq8?si=Y3k1HIt5uP16vpmN'
),
(
  'The Conjuring: Last Rites',
  'Horror',
  2025,
  'https://ntvb.tmsimg.com/assets/p27846446_v_h10_aa.jpg?w=960&h=540',
  'The Warrens return for their final battle against evil in the chilling conclusion to The Conjuring saga.',
  115,
  '2025-09-19',
  'https://youtu.be/bMgfsdYoEEo?si=YAw1Aqdxah7BIGBm'
),
(
  'Zootopia 2',
  'Animation, Comedy',
  2025,
  'https://i.ytimg.com/vi/xo4rkcC7kFc/maxresdefault.jpg',
  'Returning duo Judy Hopps and Nick Wilde are now official police partners and enter partner counseling with Dr. Fuzzby while tracking down a new threat—Gary De\'Snake—in the vibrant and expanding world of Zootopia.',
  110,
  '2025-11-26',
  'https://youtu.be/BjkIOU5PhyQ?si=EVL1jfo7s3kyVSWM'
),
(
  'Project Hail Mary',
  'Adventure, Sci‑Fi',
  2026,
  'https://ticketdirect.co.nz/wp-content/uploads/2025/06/project-hail-mary-poster-cropped-banner.jpg',
  'Ryan Gosling stars as Ryland Grace, a middle‑school science teacher turned reluctant astronaut who wakes from a coma aboard a ship 11.9 light‑years from Earth with no memory, tasked to save humanity by investigating a dying sun and forming an unlikely friendship with an alien.',
  135,
  '2026-03-20',
  'https://youtu.be/OUwp1F5babE?si=49Tw1dUGq-a_1e36'
),
(
   'Tron: Ares',
  'Sci-Fi, Action',
  2025,
  'https://4kwallpapers.com/images/wallpapers/tron-ares-poster-3840x2160-22060.jpg',
  'When the AI program Ares (Jared Leto) crosses over from the digital Grid into the real world, humanity faces its first contact with sentient AI. Packed with lightcycle chases, digital assassins, and Jeff Bridges reprising Kevin Flynn, it blends cyberpunk thrills with high‑stakes spectacle.',
  150,
  '2025-10-10',
  'https://youtu.be/YShVEXb7-ic?si=LpfjQjOgmWcIU2Zy'
)

INSERT INTO UpcomingMovies (
  MovieTitle, MovieGenre, ReleaseYear, ImgUrl, Description, Duration, ReleaseDate, TrailerUrl
)
VALUES 
(
  'Avatar 3',
  'Sci-Fi',
  2025,
  'https://images.hdqwalls.com/wallpapers/avatar-fire-and-ash-4k-poster-a4.jpg',
  'The next chapter in James Cameron''s Avatar saga, continuing the journey of the Navi on Pandora.',
  180,
  '2025-12-19',
  'https://youtu.be/nb_fFj_0rq8?si=Y3k1HIt5uP16vpmN'
),
(
  'The Conjuring: Last Rites',
  'Horror',
  2025,
  'https://ntvb.tmsimg.com/assets/p27846446_v_h10_aa.jpg?w=960&h=540',
  'The Warrens return for their final battle against evil in the chilling conclusion to The Conjuring saga.',
  115,
  '2025-09-19',
  'https://youtu.be/bMgfsdYoEEo?si=YAw1Aqdxah7BIGBm'
),
(
  'Zootopia 2',
  'Animation, Comedy',
  2025,
  'https://i.ytimg.com/vi/xo4rkcC7kFc/maxresdefault.jpg',
  'Returning duo Judy Hopps and Nick Wilde are now official police partners and enter partner counseling with Dr. Fuzzby while tracking down a new threat—Gary De''Snake—in the vibrant and expanding world of Zootopia.',
  110,
  '2025-11-26',
  'https://youtu.be/BjkIOU5PhyQ?si=EVL1jfo7s3kyVSWM'
),
(
  'Project Hail Mary',
  'Adventure, Sci-Fi',
  2026,
  'https://ticketdirect.co.nz/wp-content/uploads/2025/06/project-hail-mary-poster-cropped-banner.jpg',
  'Ryan Gosling stars as Ryland Grace, a middle-school science teacher turned reluctant astronaut who wakes from a coma aboard a ship 11.9 light-years from Earth with no memory, tasked to save humanity by investigating a dying sun and forming an unlikely friendship with an alien.',
  135,
  '2026-03-20',
  'https://youtu.be/OUwp1F5babE?si=49Tw1dUGq-a_1e36'
),
(
  'Tron: Ares',
  'Sci-Fi, Action',
  2025,
  'https://4kwallpapers.com/images/wallpapers/tron-ares-poster-3840x2160-22060.jpg',
  'When the AI program Ares (Jared Leto) crosses over from the digital Grid into the real world, humanity faces its first contact with sentient AI. Packed with light-cycle chases, digital assassins, and Jeff Bridges reprising Kevin Flynn, it blends cyberpunk thrills with high-stakes spectacle.',
  150,
  '2025-10-10',
  'https://youtu.be/YShVEXb7-ic?si=LpfjQjOgmWcIU2Zy'
);
