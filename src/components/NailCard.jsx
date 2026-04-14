import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/nails';

const NailCard = ({ nail, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const category = categories.find(c => c.id === nail.category);

  // Генерация красивого градиента-заглушки
  const gradientSeed = nail.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const hue1 = (gradientSeed * 37) % 360;
  const hue2 = (hue1 + 40) % 360;

  return (
    <div
      className="nail-card"
      style={{
        animationDelay: `${index * 0.05}s`,
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/category/${nail.category}`)}
    >
      <div className="nail-image">
        {/* Градиент-заглушка (пока фото не загрузилось) */}
        {!imageLoaded && (
          <div
            className="img-placeholder"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, hsl(${hue1}, 70%, 80%), hsl(${hue2}, 65%, 75%))`,
            }}
          >
            <span style={{ fontSize: '64px' }}>
              {category?.icon || '💅'}
            </span>
          </div>
        )}

        {/* Реальное фото */}
        {nail.image && !imageError && (
          <img
            src={nail.image}
            alt={nail.title}
            loading="lazy"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              opacity: imageLoaded ? 1 : 0,
            }}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
          />
        )}

        {/* Оверлей при наведении */}
        <div className="nail-overlay">
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
            Подробнее
          </button>
        </div>
      </div>

      <div className="nail-info">
        <h4>{nail.title}</h4>
        <div className="nail-meta">
          <span className="category-badge" style={{ background: category?.color || '#e91e8c' }}>
            {category?.name}
          </span>
          <span className="likes">❤️ {nail.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NailCard;
