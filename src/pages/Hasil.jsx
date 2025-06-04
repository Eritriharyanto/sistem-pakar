import React from "react";

const DiagnosisResult = () => {
  return (
    <div className='container my-5'>
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      <section className='border-top pt-5'>
        <h3 className='fw-bold'>Hasil Diagnosa</h3>

        <div className='mt-4 '>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Identitas
          </h5>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th scope='row'>Nama Lengkap</th>
                <td>Nana ains</td>
              </tr>
              <tr>
                <th scope='row'>Nomor Telepon</th>
                <td>081234567890</td>
              </tr>
              <tr>
                <th scope='row'>Pekerjaan</th>
                <td>Guru</td>
              </tr>
              <tr>
                <th scope='row'>Alamat</th>
                <td>Sleman, Yogyakarta</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-4'>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Penyakit
          </h5>
          <p className='ps-2'>Amnesia</p>
        </div>

        <div className='mt-4'>
          <h5 style={{ backgroundColor: "#fef4e9", padding: "1rem" }}>
            Solusi
          </h5>
          <ul>
            <li>
              Cukup tidur yang cukup dan berkualitas dapat meningkatkan daya
              ingat dan konsentrasi.
            </li>
            <li>
              Makan makanan sehat. Konsumsi makanan yang baik untuk otak,
              seperti ikan salmon, telur, tahu, teh hijau, blueberry, brokoli,
              dan kunyit.
            </li>
            <li>
              Membiasakan diri menaruh benda di tempat yang sama. Dengan begitu,
              Anda akan selalu ingat di mana benda tersebut berada.
            </li>
            <li>
              Membatasi pikiran terhadap hal-hal yang tidak penting. Siapkan
              ruang dalam memori untuk hal-hal yang bermanfaat dan digunakan
              dalam kehidupan sehari-hari.
            </li>
            <li>
              Mintalah dukungan kepada keluarga terdekat. Mintalah bantuan
              kepada keluarga terdekat agar Anda dapat melewati seluruh proses
              kehamilan dengan mudah.
            </li>
          </ul>
        </div>

        <div className='mt-4'>
          <button className='btn btn-danger'>Download</button>
        </div>
      </section>
    </div>
  );
};

export default DiagnosisResult;
