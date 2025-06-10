import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const DiagnosisResult = () => {
	const navigate = useNavigate();
	const [diagnosisData, setDiagnosisData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		// Check if diagnosis_id exists
		const diagnosisId = localStorage.getItem("diagnosa_id");

		if (!diagnosisId) {
			navigate("/FormIdentitas");
			return;
		}

		// Fetch diagnosis result
		fetchDiagnosisResult(diagnosisId);
	}, [navigate]);

	const fetchDiagnosisResult = async (diagnosisId) => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`http://localhost:5000/api/diagnosa/${diagnosisId}`
			);
			setDiagnosisData(response.data);
		} catch (error) {
			console.error("Error fetching diagnosis result:", error);
			setError("Gagal memuat hasil diagnosis");
		} finally {
			setIsLoading(false);
		}
	};

	const getSolutionText = (penyakitName) => {
		// Define solutions based on disease name
		const solutions = {
			"Morning Sickness": [
				"Makan dalam porsi kecil tapi sering (5-6 kali sehari)",
				"Hindari makanan yang berminyak, pedas, atau berbau menyengat",
				"Konsumsi jahe untuk mengurangi mual",
				"Minum air putih yang cukup untuk mencegah dehidrasi",
				"Istirahat yang cukup dan hindari stress",
			],
			"Amnesia Kehamilan": [
				"Cukup tidur yang cukup dan berkualitas dapat meningkatkan daya ingat dan konsentrasi",
				"Makan makanan sehat. Konsumsi makanan yang baik untuk otak, seperti ikan salmon, telur, tahu, teh hijau, blueberry, brokoli, dan kunyit",
				"Membiasakan diri menaruh benda di tempat yang sama. Dengan begitu, Anda akan selalu ingat di mana benda tersebut berada",
				"Membatasi pikiran terhadap hal-hal yang tidak penting. Siapkan ruang dalam memori untuk hal-hal yang bermanfaat dan digunakan dalam kehidupan sehari-hari",
				"Mintalah dukungan kepada keluarga terdekat. Mintalah bantuan kepada keluarga terdekat agar Anda dapat melewati seluruh proses kehamilan dengan mudah",
			],
			"Infeksi Saluran Kemih": [
				"Minum air putih yang banyak (minimal 8 gelas per hari)",
				"Jangan menahan keinginan buang air kecil",
				"Bersihkan area kemaluan dari depan ke belakang setelah buang air",
				"Hindari penggunaan produk kewanitaan yang mengandung parfum",
				"Konsultasi dengan dokter untuk pengobatan yang tepat",
			],
			"Flu Kehamilan": [
				"Istirahat yang cukup dan minum banyak cairan",
				"Konsumsi makanan bergizi untuk meningkatkan daya tahan tubuh",
				"Hindari kontak dengan orang yang sedang sakit",
				"Cuci tangan secara teratur",
				"Konsultasi dengan dokter sebelum mengonsumsi obat apapun",
			],
			"Migrain Kehamilan": [
				"Istirahat di ruangan yang gelap dan tenang",
				"Kompres dingin pada dahi atau belakang leher",
				"Kelola stress dengan teknik relaksasi",
				"Hindari pemicu migrain seperti makanan tertentu atau kurang tidur",
				"Konsultasi dengan dokter untuk penanganan yang aman selama kehamilan",
			],
			"Gangguan Pencernaan": [
				"Makan dalam porsi kecil tapi sering",
				"Hindari makanan pedas, asam, dan berminyak",
				"Konsumsi makanan tinggi serat seperti buah dan sayuran",
				"Minum air putih yang cukup",
				"Hindari berbaring langsung setelah makan",
			],
			"Insomnia Kehamilan": [
				"Buat rutinitas tidur yang teratur",
				"Hindari kafein dan makanan berat sebelum tidur",
				"Ciptakan lingkungan tidur yang nyaman",
				"Lakukan teknik relaksasi sebelum tidur",
				"Konsultasi dengan dokter jika gangguan tidur berlanjut",
			],
		};

		return (
			solutions[penyakitName] || [
				"Konsultasi dengan dokter untuk penanganan yang tepat",
				"Jaga pola makan yang sehat dan bergizi",
				"Istirahat yang cukup",
				"Minum air putih yang cukup",
				"Hindari stress berlebihan",
			]
		);
	};

	const handleDownload = () => {
		// Simple implementation to download result as text
		if (!diagnosisData) return;

		const { diagnosa, gejala } = diagnosisData;
		const solutions = getSolutionText(diagnosa.nama_penyakit);

		const content = `
HASIL DIAGNOSIS PENYAKIT IBU HAMIL
==================================

IDENTITAS PASIEN:
- Nama Lengkap: ${diagnosa.nama}
- Nomor HP: ${diagnosa.no_hp}
- Pekerjaan: ${diagnosa.pekerjaan}
- Alamat: ${diagnosa.alamat}
- Trimester: ${diagnosa.nama_trimester}

GEJALA YANG DIALAMI:
${gejala.map((g) => `- ${g.nama_gejala}`).join("\n")}

HASIL DIAGNOSIS:
${diagnosa.nama_penyakit}

DESKRIPSI:
${diagnosa.deskripsi}

SOLUSI DAN SARAN:
${solutions.map((sol, index) => `${index + 1}. ${sol}`).join("\n")}

Tanggal Diagnosis: ${new Date(diagnosa.tanggal_diagnosa).toLocaleDateString(
			"id-ID"
		)}
    `;

		const blob = new Blob([content], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `diagnosis-${diagnosa.nama}-${new Date().getTime()}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	if (isLoading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: "400px" }}
			>
				<div className="spinner-border text-danger" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container my-5">
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			</div>
		);
	}

	if (!diagnosisData) {
		return (
			<div className="container my-5">
				<div className="alert alert-warning" role="alert">
					Data diagnosis tidak ditemukan
				</div>
			</div>
		);
	}

	const { diagnosa, gejala } = diagnosisData;
	const solutions = getSolutionText(diagnosa.nama_penyakit);

	return (
		<div className="container my-5">
			<div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
				<h2 className="fw-bold mb-4">Diagnosis Penyakit</h2>
				<p className="text-muted" style={{ maxWidth: "600px" }}>
					Berikut adalah hasil diagnosis berdasarkan gejala yang Anda alami.
					Hasil ini bersifat sementara dan disarankan untuk tetap berkonsultasi
					dengan dokter spesialis untuk pemeriksaan lebih lanjut.
				</p>
			</div>

			<section className="border-top pt-5">
				<h3 className="fw-bold">Hasil Diagnosa</h3>

				<div className="mt-4">
					<h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
						Identitas
					</h5>
					<table className="table table-borderless">
						<tbody>
							<tr>
								<th scope="row">Nama Lengkap</th>
								<td>{diagnosa.nama}</td>
							</tr>
							<tr>
								<th scope="row">Nomor HP / Usia Kandungan</th>
								<td>{diagnosa.no_hp}</td>
							</tr>
							<tr>
								<th scope="row">Pekerjaan</th>
								<td>{diagnosa.pekerjaan}</td>
							</tr>
							<tr>
								<th scope="row">Alamat</th>
								<td>{diagnosa.alamat}</td>
							</tr>
							<tr>
								<th scope="row">Trimester</th>
								<td>{diagnosa.nama_trimester}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="mt-4">
					<h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
						Gejala yang Dialami
					</h5>
					<ul className="ps-4">
						{gejala.map((g, index) => (
							<li key={index}>{g.nama_gejala}</li>
						))}
					</ul>
				</div>

				<div className="mt-4">
					<h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
						Penyakit
					</h5>
					<div className="ps-2">
						<h6 className="fw-bold">{diagnosa.nama_penyakit}</h6>
						<p className="text-muted">{diagnosa.deskripsi}</p>
					</div>
				</div>

				<div className="mt-4">
					<h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
						Solusi dan Saran
					</h5>
					<ul>
						{solutions.map((solution, index) => (
							<li key={index}>{solution}</li>
						))}
					</ul>
					<div className="alert alert-info mt-3" role="alert">
						<strong>Catatan:</strong> Hasil diagnosis ini bersifat sementara
						berdasarkan gejala yang dilaporkan. Disarankan untuk tetap
						berkonsultasi dengan dokter spesialis untuk pemeriksaan dan
						penanganan yang lebih tepat.
					</div>
				</div>

				<div className="mt-4">
					<button className="btn btn-danger" onClick={handleDownload}>
						Download Hasil
					</button>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default DiagnosisResult;
