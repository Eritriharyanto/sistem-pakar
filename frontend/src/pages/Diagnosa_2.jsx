import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

function Diagnosa_2() {
	const navigate = useNavigate();
	const [gejalaData, setGejalaData] = useState([]);
	const [gejala, setGejala] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const userId = localStorage.getItem("user_id");
		const trimesterId = localStorage.getItem("trimester_id");
		const gejala1 = localStorage.getItem("gejala_1");

		if (!userId || !trimesterId || !gejala1) {
			navigate("/FormIdentitas");
			return;
		}

		// Fetch gejala data dari backend
		fetchGejalaData();
	}, [navigate]);

	const fetchGejalaData = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("http://localhost:5000/api/gejala");

			const remainingGejala = response.data.slice(3, 10);
			setGejalaData(remainingGejala);
		} catch (error) {
			console.error("Error fetching gejala data:", error);
			setError("Gagal memuat data gejala");
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (gejaladId, value) => {
		setGejala((prev) => ({ ...prev, [gejaladId]: value }));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const selectedGejala2 = [];
			gejalaData.forEach((item) => {
				if (gejala[item.id] === "ya") {
					selectedGejala2.push(item.id);
				}
			});

			const userId = localStorage.getItem("user_id");
			const trimesterId = localStorage.getItem("trimester_id");
			const gejala1 = JSON.parse(localStorage.getItem("gejala_1") || "[]");
			const allSelectedGejala = [...gejala1, ...selectedGejala2];

			console.log("All selected gejala:", allSelectedGejala);

			if (allSelectedGejala.length === 0) {
				setError("Mohon pilih minimal satu gejala");
				setIsLoading(false);
				return;
			}

			// Kirim diagnosis ke backend
			const diagnosisData = {
				user_id: parseInt(userId),
				trimester_id: parseInt(trimesterId),
				gejala: allSelectedGejala,
			};

			const response = await axios.post(
				"http://localhost:5000/api/diagnosa",
				diagnosisData
			);

			if (response.status === 201) {
				// Simpan
				localStorage.setItem("diagnosa_id", response.data.diagnosa_id);
				localStorage.setItem(
					"diagnosis_result",
					JSON.stringify(response.data.hasil)
				);

				console.log("Diagnosis created successfully:", response.data);
				navigate("/Hasil");
			}
		} catch (error) {
			console.error("Error creating diagnosis:", error);
			if (error.response?.status === 404) {
				setError(
					"Tidak dapat menentukan diagnosis berdasarkan gejala yang dipilih. Silakan konsultasi dengan dokter."
				);
			} else {
				setError(
					"Terjadi kesalahan saat memproses diagnosis. Silakan coba lagi."
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading && gejalaData.length === 0) {
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

	return (
		<div className="bg-white text-dark">
			{/* Header */}
			<div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
				<h2 className="fw-bold mb-4">Diagnosis Penyakit</h2>
				<p className="text-muted" style={{ maxWidth: "600px" }}>
					Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
					dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
					spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
					berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
				</p>
			</div>

			{/* Form */}
			<main className="">
				<h2 className=" fw-bold mb-4">Identifikasi Gejala (Lanjutan)</h2>

				{error && (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					{gejalaData.map((item, i) => (
						<div
							className="row align-items-center border-bottom py-2"
							key={item.id}
						>
							<div className="col-12 col-md-6 mb-2 mb-md-0">
								{`${i + 1}. ${item.nama_gejala}`}
							</div>
							<div className="col-6 col-md-3 text-start text-md-center">
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										name={`gejala-${item.id}`}
										value="ya"
										checked={gejala[item.id] === "ya"}
										onChange={() => handleChange(item.id, "ya")}
										id={`ya-${item.id}`}
										disabled={isLoading}
									/>
									<label className="form-check-label" htmlFor={`ya-${item.id}`}>
										Ya
									</label>
								</div>
							</div>
							<div className="col-6 col-md-3 text-start text-md-center">
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										name={`gejala-${item.id}`}
										value="tidak"
										checked={gejala[item.id] === "tidak"}
										onChange={() => handleChange(item.id, "tidak")}
										id={`tidak-${item.id}`}
										disabled={isLoading}
									/>
									<label
										className="form-check-label"
										htmlFor={`tidak-${item.id}`}
									>
										Tidak
									</label>
								</div>
							</div>
						</div>
					))}

					<div className="d-flex justify-content-end mt-4">
						<button
							type="submit"
							className="btn btn-danger rounded-pill px-4"
							disabled={isLoading}
						>
							{isLoading ? "Memproses Diagnosis..." : "Proses Diagnosis"}
						</button>
					</div>
				</form>
			</main>

			<Footer />
		</div>
	);
}

export default Diagnosa_2;
