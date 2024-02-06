import React from 'react';

function Footer() {
  return (
    <>
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className='bb2'>À propos de nous</h3>
          <p><span className='point'>.</span>Site des encheres en ligne halal.</p>
        </div>

        <div className="footer-section">
          <h3 className='bb2'>Contact</h3>
          <p> <span className='point'>.</span>contact@example.com</p>
          <p><span className='point'>.</span> +2127 666 567 890</p>
        </div>

        <div className="footer-section">
          <h3 className='bb2'>Liens utiles</h3>
          <ul>
            <li><a href="/mentions-legales"><span className='point'>.</span>Mentions légales</a></li>
            <li><a href="/politique-de-confidentialite"><span className='point'>.</span>Politique de confidentialité</a></li>
          </ul>
        </div>
      </div>
    </footer>
    <div className="footer-bottom" style={{ textAlign: 'center' }}>
        <p>&copy; 2024 ENSAM</p>
      </div>
    </>
  );
}

export default Footer;
