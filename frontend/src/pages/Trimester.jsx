import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Trimester() {
  const navigate = useNavigate();
  return (
    <div className='bg-white text-dark'>
      {/* Header Section */}
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      {/* Main Section */}
      <main className='container'>
        <section className='py-5 px-3'>
          <h2 className='h5 fw-bold text-center mb-4'>Usia Kehamilan</h2>
          <form className='mx-auto' style={{ maxWidth: "600px" }}>
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className='d-flex justify-content-between align-items-center py-2'
              >
                <label
                  htmlFor={`trimester${num}`}
                  className='form-label mb-0 small'
                >
                  {num}. Trimester {num}
                </label>
                <input
                  type='checkbox'
                  id={`trimester${num}`}
                  name={`trimester${num}`}
                  className='form-check-input'
                />
              </div>
            ))}
            <div className='text-end mt-3'>
              <button
                type='submit'
                className='btn btn-sm text-white'
                style={{ backgroundColor: "#c96a6a" }}
                onClick={() => navigate("/Diagnosa_1")}
                link='/Diagnosa_1'
              >
                Selanjutnya
              </button>
            </div>
          </form>
        </section>

        <section className='px-3 pb-5 mx-auto' style={{ maxWidth: "600px" }}>
          <h2 className='h5 fw-bold mb-3'>Catatan</h2>
          <p className='text-muted small text-justify'>
            Usia kehamilan yang digunakan dibagi berdasarkan periode 40 minggu
            usia kehamilan atau biasa disebut dengan trimester. Trimester 1
            yaitu pada usia kehamilan 1–13 minggu, trimester 2 pada usia
            kehamilan 14–26 minggu, dan trimester 3 yaitu 27–40 minggu. Pada
            Tabel 3 merupakan data usia kehamilan berdasarkan trimester.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default Trimester;
