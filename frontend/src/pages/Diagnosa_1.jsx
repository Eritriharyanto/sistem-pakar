import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

function Diagnosa_1() {
	const navigate = useNavigate();
	const [gejalaData, setGejalaData] = useState([]);
	const [gejala, setGejala] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		// Check if user_id and trimester_id exist
		const userId = localStorage.getItem("user_id");
		const trimesterId = localStorage.getItem("trimester_id");

		if (!userId || !trimesterId) {
			navigate("/FormIdentitas");
			return;
		}

		// Fetch gejala data from backend
		fetchGejalaData();
	}, [navigate]);

	const fetchGejalaData = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("http://localhost:5000/api/gejala");

			// Take first 3 symptoms for Diagnosa_1
			const firstThreeGejala = response.data.slice(0, 3);
			setGejalaData(firstThreeGejala);
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

	const handleSubmit = (e) => {
		e.preventDefault();

		// Collect selected symptoms for Diagnosa_1
		const selectedGejala1 = [];
		gejalaData.forEach((item) => {
			if (gejala[item.id] === "ya") {
				selectedGejala1.push(item.id);
			}
		});

		// Save to localStorage to combine with Diagnosa_2 later
		localStorage.setItem("gejala_1", JSON.stringify(selectedGejala1));

		console.log("Selected gejala from Diagnosa_1:", selectedGejala1);
		navigate("/Diagnosa_2");
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
				<h2 className=" fw-bold mb-4">Identifikasi Gejala</h2>

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
							{isLoading ? "Memproses..." : "Selanjutnya"}
						</button>
					</div>
				</form>
			</main>

			<Footer />
		</div>
	);
}

export default Diagnosa_1;
