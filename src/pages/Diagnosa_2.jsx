import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import Footer from "../components/Footer";

function Diagnosa_2() {
  const navigate = useNavigate();
  const gejalaList = [
    "batuk",
    "pilek",
    "kencing berlebihan",
    "sering berak",
    "migren",
    "bersin",
    "muntah",
  ];

  const [gejala, setGejala] = useState({});

  const handleChange = (index, value) => {
    setGejala((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gejala yang dipilih:", gejala);
  };

  return (
    <div className='bg-white text-dark'>
      {/* Header */}
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      {/* Form */}
      <main className=''>
        <h2 className=' fw-bold mb-4'>Identifikasi Gejala</h2>
        <form onSubmit={handleSubmit}>
          {gejalaList.map((item, i) => (
            <div className='row align-items-center border-bottom py-2' key={i}>
              <div className='col-12 col-md-6 mb-2 mb-md-0'>
                {`${i + 1}. ${item}`}
              </div>
              <div className='col-6 col-md-3 text-start text-md-center'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name={`gejala-${i}`}
                    value='ya'
                    checked={gejala[i] === "ya"}
                    onChange={() => handleChange(i, "ya")}
                    id={`ya-${i}`}
                  />
                  <label className='form-check-label' htmlFor={`ya-${i}`}>
                    Ya
                  </label>
                </div>
              </div>
              <div className='col-6 col-md-3 text-start text-md-center'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name={`gejala-${i}`}
                    value='tidak'
                    checked={gejala[i] === "tidak"}
                    onChange={() => handleChange(i, "tidak")}
                    id={`tidak-${i}`}
                  />
                  <label className='form-check-label' htmlFor={`tidak-${i}`}>
                    Tidak
                  </label>
                </div>
              </div>
            </div>
          ))}

          <div className='d-flex justify-content-end mt-4'>
            <button
              type='submit'
              className='btn btn-danger rounded-pill px-4'
              onClick={() => navigate("/Hasil")}
              link='/Hasil'
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
export default Diagnosa_2;
