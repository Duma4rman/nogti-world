import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, getPopularNails, getRandomNails } from '../data/nails';
import NailCard from '../components/NailCard';

const HomePage = () => {
  const navigate = useNavigate();
  const popularNails = getPopularNails(12);
  const randomNails = getRandomNails(16);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="sparkle" style={{ top: '10%', left: '10%' }}></div>
          <div className="sparkle" style={{ top: '20%', right: '15%', animationDelay: '0.5s' }}></div>
          <div className="sparkle" style={{ bottom: '30%', left: '20%', animationDelay: '1s' }}></div>
          <div className="sparkle" style={{ bottom: '20%', right: '10%', animationDelay: '1.5s' }}></div>
        </div>
        <div className="hero-content animate-fadeIn">
          <h1>
            <span className="hero-icon animate-float">💅</span>
            Мир Маникюра
          </h1>
          <p>Найдите идеальный маникюр для любого случая</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">3000+</span>
              <span className="stat-label">вариантов</span>
            </div>
            <div className="stat">
              <span className="stat-number">20</span>
              <span className="stat-label">категорий</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">вдохновения</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Категории</h2>
          <p className="section-subtitle">Выберите стиль, который подходит именно вам</p>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="category-card"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <div 
                  className="category-icon-bg"
                  style={{ background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)` }}
                >
                  <span className="category-emoji">{category.icon}</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="category-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Nails Section */}
      <section className="popular-section">
        <div className="container">
          <h2 className="section-title">🔥 Популярные</h2>
          <p className="section-subtitle">Самые любимые варианты наших пользователей</p>
          
          <div className="nails-grid">
            {popularNails.map((nail, index) => (
              <NailCard key={nail.id} nail={nail} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="inspiration-section">
        <div className="container">
          <h2 className="section-title">✨ Вдохновение</h2>
          <p className="section-subtitle">Случайные идеи для вашего нового образа</p>
          
          <div className="nails-grid">
            {randomNails.map((nail, index) => (
              <NailCard key={nail.id} nail={nail} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Готовы найти свой идеальный маникюр?</h2>
            <p>Просмотрите тысячи вариантов и найдите вдохновение</p>
            <button className="btn btn-primary btn-large" onClick={() => {
              document.querySelector('.categories-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Начать просмотр 🚀
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
