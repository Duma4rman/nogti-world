// Скрипт для генерации nails.js с реальными фото из папки public/manicure
// Запуск: node scripts/generate-nails-data.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const MANICURE_DIR = path.join(ROOT_DIR, 'public', 'manicure');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'data', 'nails.js');

// Категории
const CATEGORIES = [
  { id: 'classic', name: 'Классический', icon: '💅', description: 'Элегантная классика на все времена', color: '#e91e8c' },
  { id: 'french', name: 'Французский', icon: '🤍', description: 'Изысканный френч для любого случая', color: '#ec4899' },
  { id: 'matte', name: 'Матовый', icon: '✨', description: 'Стильный матовый маникюр', color: '#8b5cf6' },
  { id: 'glossy', name: 'Глянцевый', icon: '💎', description: 'Яркий блеск и сияние', color: '#f59e0b' },
  { id: 'nail-art', name: 'Дизайн и Арт', icon: '🎨', description: 'Уникальные рисунки и узоры', color: '#10b981' },
  { id: 'ombre', name: 'Омбре', icon: '🌈', description: 'Плавные переходы цветов', color: '#3b82f6' },
  { id: 'glitter', name: 'С блёстками', icon: '⭐', description: 'Праздничный мерцающий маникюр', color: '#f472b6' },
  { id: 'minimalist', name: 'Минимализм', icon: '🤍', description: 'Лаконичность и простота', color: '#6b7280' },
  { id: 'gel', name: 'Гелевый', icon: '💫', description: 'Стойкое гелевое покрытие', color: '#a855f7' },
  { id: 'seasonal', name: 'Сезонный', icon: '🍂', description: 'Подходящий к времени года', color: '#f97316' },
  { id: 'bridal', name: 'Свадебный', icon: '👰', description: 'Для самого важного дня', color: '#fbcfe8' },
  { id: 'neon', name: 'Неоновый', icon: '💜', description: 'Яркий и бросающийся в глаза', color: '#a855f7' },
  { id: 'chrome', name: 'Хром', icon: '🪞', description: 'Зеркальный эффект', color: '#94a3b8' },
  { id: 'marble', name: 'Мраморный', icon: '🏛️', description: 'Эффект натурального камня', color: '#d1d5db' },
  { id: 'animal-print', name: 'Животный принт', icon: '🐆', description: 'Леопард, зебра и другие', color: '#92400e' },
  { id: 'floral', name: 'Цветочный', icon: '🌸', description: 'Нежные цветочные мотивы', color: '#f472b6' },
  { id: 'geometric', name: 'Геометрический', icon: '📐', description: 'Чёткие линии и формы', color: '#6366f1' },
  { id: '3d', name: '3D Дизайн', icon: '💎', description: 'Объёмчные украшения', color: '#06b6d4' },
  { id: 'pastel', name: 'Пастельный', icon: '🎀', description: 'Нежные пастельные тона', color: '#c4b5fd' },
  { id: 'dark', name: 'Тёмный', icon: '🖤', description: 'Готический и дерзкий стиль', color: '#1f2937' },
];

function getPhotosInCategory(categoryId) {
  const catDir = path.join(MANICURE_DIR, categoryId);
  if (!fs.existsSync(catDir)) return [];

  return fs.readdirSync(catDir)
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
}

function generateNailsData() {
  console.log('🔍 Сканируем папки с фото...');

  let totalNails = 0;
  const nailsByCategory = {};

  for (const category of CATEGORIES) {
    const photos = getPhotosInCategory(category.id);
    const nails = photos.map((photo, index) => ({
      id: `${category.id}-${index}`,
      category: category.id,
      title: `${category.name} #${index + 1}`,
      likes: Math.floor(Math.random() * 500) + 50,
      isFavorite: false,
      image: `/manicure/${category.id}/${photo}`,
    }));

    nailsByCategory[category.id] = nails;
    totalNails += nails.length;
    console.log(`  ${category.name}: ${nails.length} фото`);
  }

  console.log(`\n📸 Всего фото: ${totalNails}`);

  // Генерируем код nails.js
  const categoriesCode = JSON.stringify(CATEGORIES, null, 2);

  // Создаём массив allNails
  let allNailsCode = '[]';
  if (totalNails > 0) {
    const allNails = Object.values(nailsByCategory).flat();
    allNailsCode = JSON.stringify(allNails, null, 2);
  }

  const jsCode = `// Данные категорий и маникюров — АВТОМАТИЧЕСКИ СГЕНЕРИРОВАНО
// НЕ РЕДАКТИРУЙТЕ ВРУЧНУЮ — запустите node scripts/generate-nails-data.js

export const categories = ${categoriesCode};

export const allNails = ${allNailsCode};

// Функция для получения маникюров по категории
export const getNailsByCategory = (categoryId) => {
  return allNails.filter(nail => nail.category === categoryId);
};

// Функция для получения всех маникюров
export const getAllNails = () => {
  return allNails;
};

// Функция для поиска маникюров
export const searchNails = (query) => {
  const lowerQuery = query.toLowerCase();
  return allNails.filter(nail =>
    nail.title.toLowerCase().includes(lowerQuery)
  );
};

// Функция для получения популярных маникюров
export const getPopularNails = (limit = 20) => {
  return [...allNails]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
};

// Функция для получения случайных маникюров
export const getRandomNails = (limit = 20) => {
  const shuffled = [...allNails].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};
`;

  fs.writeFileSync(OUTPUT_FILE, jsCode);
  console.log(`\n✅ Файл сохранён: ${OUTPUT_FILE}`);
  console.log('💡 Теперь запустите сайт — всё работает!');
}

generateNailsData();
