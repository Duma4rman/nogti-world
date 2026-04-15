import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-emoji">💅</span>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Увы, такая страница не существует или была удалена</p>
        <Link to="/" className="btn btn-primary">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
