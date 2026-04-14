import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">💅</span>
              <span className="logo-text">NogtiWorld</span>
            </Link>
            <p>Ваш путеводитель в мире красивых маникюров</p>
          </div>
          
          <div className="footer-links">
            <h4>Категории</h4>
            <ul>
              <li><Link to="/category/classic">Классический</Link></li>
              <li><Link to="/category/french">Французский</Link></li>
              <li><Link to="/category/nail-art">Дизайн и Арт</Link></li>
              <li><Link to="/category/gel">Гелевый</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Популярное</h4>
            <ul>
              <li><Link to="/category/ombre">Омбре</Link></li>
              <li><Link to="/category/glitter">С блёстками</Link></li>
              <li><Link to="/category/minimalist">Минимализм</Link></li>
              <li><Link to="/category/bridal">Свадебный</Link></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">💬</a>
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">🎵</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NogtiWorld. Все права защищены.</p>
          <p>Сделано с ❤️ для любительниц красивых ногтей</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
