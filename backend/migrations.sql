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