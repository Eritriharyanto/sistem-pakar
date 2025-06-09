CREATE TABLE gejala (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kode_gejala VARCHAR(10) NOT NULL UNIQUE,
  nama_gejala VARCHAR(100) NOT NULL
);

CREATE TABLE penyakit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kode VARCHAR(10) NOT NULL UNIQUE,
  nama_penyakit VARCHAR(100) NOT NULL,
  deskripsi TEXT
);

CREATE TABLE trimester (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_trimester VARCHAR(20) NOT NULL
);

CREATE TABLE pengguna (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(50) NOT NULL,
  no_hp VARCHAR(15),
  pekerjaan VARCHAR(50),
  alamat VARCHAR(100),
);

CREATE TABLE diagnosa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_pengguna INT NOT NULL,
  id_trimester INT NOT NULL,
  id_penyakit INT NOT NULL,
  tanggal_diagnosa DATE NOT NULL,
  FOREIGN KEY (id_pengguna) REFERENCES pengguna(id),
  FOREIGN KEY (id_trimester) REFERENCES trimester(id),
  FOREIGN KEY (id_penyakit) REFERENCES penyakit(id)
);

CREATE TABLE diagnosis_gejala (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_diagnosa INT NOT NULL,
  id_gejala INT NOT NULL,
  FOREIGN KEY (id_diagnosa) REFERENCES diagnosa(id),
  FOREIGN KEY (id_gejala) REFERENCES gejala(id)
);

CREATE TABLE aturan (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_penyakit INT NOT NULL,
  id_gejala INT NOT NULL,
  FOREIGN KEY (id_penyakit) REFERENCES penyakit(id),
  FOREIGN KEY (id_gejala) REFERENCES gejala(id)
);


- Insert trimester data
INSERT INTO trimester (nama_trimester) VALUES 
('Trimester 1'),
('Trimester 2'),
('Trimester 3');

-- Insert gejala data
INSERT INTO gejala (kode_gejala, nama_gejala) VALUES 
('G001', 'Mual berlebihan'),
('G002', 'Sakit kepala'),
('G003', 'Sering buang air'),
('G004', 'Batuk'),
('G005', 'Pilek'),
('G006', 'Kencing berlebihan'),
('G007', 'Sering berak'),
('G008', 'Migren'),
('G009', 'Bersin'),
('G010', 'Muntah'),
('G011', 'Kelelahan'),
('G012', 'Pusing'),
('G013', 'Demam'),
('G014', 'Nyeri perut'),
('G015', 'Susah tidur');

-- Insert penyakit data
INSERT INTO penyakit (kode, nama_penyakit, deskripsi) VALUES 
('P001', 'Morning Sickness', 'Kondisi mual dan muntah yang umum terjadi pada awal kehamilan'),
('P002', 'Amnesia Kehamilan', 'Kondisi pelupa atau susah berkonsentrasi selama kehamilan'),
('P003', 'Infeksi Saluran Kemih', 'Infeksi yang terjadi pada saluran kemih ibu hamil'),
('P004', 'Flu Kehamilan', 'Gejala flu yang terjadi selama kehamilan'),
('P005', 'Migrain Kehamilan', 'Sakit kepala berat yang terjadi selama kehamilan'),
('P006', 'Gangguan Pencernaan', 'Masalah pencernaan yang umum terjadi saat hamil'),
('P007', 'Insomnia Kehamilan', 'Gangguan tidur yang terjadi selama kehamilan');

-- Insert aturan (rules) for forward chaining
-- Morning Sickness
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(1, 1),  -- Mual berlebihan
(1, 10), -- Muntah
(1, 11); -- Kelelahan

-- Amnesia Kehamilan
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(2, 2),  -- Sakit kepala
(2, 12), -- Pusing
(2, 15); -- Susah tidur

-- Infeksi Saluran Kemih
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(3, 3),  -- Sering buang air
(3, 6),  -- Kencing berlebihan
(3, 13); -- Demam

-- Flu Kehamilan
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(4, 4),  -- Batuk
(4, 5),  -- Pilek
(4, 9),  -- Bersin
(4, 13); -- Demam

-- Migrain Kehamilan
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(5, 2),  -- Sakit kepala
(5, 8),  -- Migren
(5, 12); -- Pusing

-- Gangguan Pencernaan
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(6, 7),  -- Sering berak
(6, 14), -- Nyeri perut
(6, 10); -- Muntah

-- Insomnia Kehamilan
INSERT INTO aturan (id_penyakit, id_gejala) VALUES 
(7, 15), -- Susah tidur
(7, 11), -- Kelelahan
(7, 2);  -- Sakit kepala