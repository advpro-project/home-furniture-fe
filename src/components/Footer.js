import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="footer bg-light text-center text-lg-start mt-auto">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="fw-bold">🏠 HoomGroom 🛠️</h5>
                        <p>
                            HoomGroom adalah platform e-commerce yang memampukan pengguna untuk mencari dan membeli peralatan rumah dan perabotan yang sesuai dengan kebutuhan mereka
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-2 mb-4 mb-md-0">
                        <h5 className="fw-bold">👥 Kelompok A06</h5>
                        <p>
                            Proyek ini dibuat untuk memenuhi tugas kelompok pada mata kuliah Pemrograman Lanjut (CSCM602223) yang diselenggarakan oleh Fakultas Ilmu Komputer, Universitas Indonesia Tahun Ajaran 2023/2024 Semester Genap.
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center p-3 text-light bg-dark">
                Copyright © 2024 A06
            </div>
        </footer>
    );
}

export default Footer;
