import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories, getNailsByCategory } from '../data/nails';
import NailCard from '../components/NailCard';

// Компонент страницы категории
const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(20);
  
  const category = categories.find(c => c.id === categoryId);
  const nails = useMemo(() => getNailsByCategory(categoryId), [categoryId]);
  const visibleNails = nails.slice(0, visibleCount);

  if (!category) {
    return <div className="not-found">Категория не найдена</div>;
  }

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, nails.length));
  };

  return (
    <div className="category-page">
      <div className="category-header" style={{
        background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`,
      }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <div className="category-header-content">
          <span className="category-icon-large">{category.icon}</span>
          <div>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <span className="count-badge">{nails.length} вариантов</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="nails-grid">
          {visibleNails.map((nail, index) => (
            <NailCard key={nail.id} nail={nail} index={index} />
          ))}
        </div>

        {visibleCount < nails.length && (
          <div className="load-more">
            <button className="btn btn-primary" onClick={loadMore}>
              Загрузить ещё ({nails.length - visibleCount} осталось)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
