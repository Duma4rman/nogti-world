// Скрипт для автоматического распределения фото маникюра по категориям
// Запуск: node scripts/distribute-photos.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const ALL_PHOTOS_DIR = path.join(ROOT_DIR, 'public', 'manicure', 'all');
const CATEGORIES_DIR = path.join(ROOT_DIR, 'public', 'manicure');

// Категории с ключевыми словами для распознавания
const CATEGORIES = {
  classic: {
    name: 'Классический',
    keywords: ['red', 'pink', 'classic', 'simple', 'solid', 'nude', 'beige', 'розов', 'красн', 'классич', 'однотон'],
  },
  french: {
    name: 'Французский',
    keywords: ['french', 'white tip', 'белый кончик', 'френч', 'французск'],
  },
  matte: {
    name: 'Матовый',
    keywords: ['matte', 'dark matte', 'матов', 'темн'],
  },
  glossy: {
    name: 'Глянцевый',
    keywords: ['glossy', 'shiny', 'glitter', 'sparkle', 'блестк', 'сиян', 'глянц'],
  },
  'nail-art': {
    name: 'Дизайн и Арт',
    keywords: ['art', 'design', 'pattern', 'drawing', 'дизайн', 'арт', 'рисунок', 'узор', 'картин'],
  },
  ombre: {
    name: 'Омбре',
    keywords: ['ombre', 'gradient', 'transition', 'омбре', 'градиент', 'переход'],
  },
  glitter: {
    name: 'С блёстками',
    keywords: ['glitter', 'sparkle', 'sequin', 'shimmer', 'блестк', 'сверк', 'мерц', 'блеск'],
  },
  minimalist: {
    name: 'Минимализм',
    keywords: ['minimal', 'simple', 'clean', 'nude', 'минимал', 'прост', 'нюд'],
  },
  gel: {
    name: 'Гелевый',
    keywords: ['gel', 'acrylic', 'long', 'гелев', 'акрил', 'длинн'],
  },
  seasonal: {
    name: 'Сезонный',
    keywords: ['season', 'autumn', 'winter', 'summer', 'spring', 'christmas', 'halloween', 'сезон', 'осень', 'зима', 'лето', 'весн', 'праздн', 'новогод'],
  },
  bridal: {
    name: 'Свадебный',
    keywords: ['bridal', 'wedding', 'white', 'свадеб', 'белый', 'невест'],
  },
  neon: {
    name: 'Неоновый',
    keywords: ['neon', 'fluorescent', 'bright', 'неон', 'ярк'],
  },
  chrome: {
    name: 'Хром',
    keywords: ['chrome', 'mirror', 'metallic', 'silver', 'gold', 'хром', 'зеркальн', 'металл'],
  },
  marble: {
    name: 'Мраморный',
    keywords: ['marble', 'stone', 'мрамор', 'камень'],
  },
  'animal-print': {
    name: 'Животный принт',
    keywords: ['animal', 'leopard', 'zebra', 'tiger', 'животн', 'леопард', 'зебр', 'принт'],
  },
  floral: {
    name: 'Цветочный',
    keywords: ['flower', 'floral', 'rose', 'bloom', 'цветоч', 'роз', 'цветок', 'растен'],
  },
  geometric: {
    name: 'Геометрический',
    keywords: ['geometric', 'line', 'stripe', 'shape', 'геометр', 'лини', 'полос', 'фигур'],
  },
  '3d': {
    name: '3D Дизайн',
    keywords: ['3d', 'rhinestone', 'gem', 'crystal', 'volume', 'объемн', '3d', 'камн', 'страз', 'кристал'],
  },
  pastel: {
    name: 'Пастельный',
    keywords: ['pastel', 'soft', 'light pink', 'baby', 'пастельн', 'нежн', 'светл', 'розов'],
  },
  dark: {
    name: 'Тёмный',
    keywords: ['dark', 'black', 'gothic', 'vamp', 'темн', 'чёрн', 'готич'],
  },
};

function distributePhotos() {
  console.log('🔍 Ищем фото в папке:', ALL_PHOTOS_DIR);

  if (!fs.existsSync(ALL_PHOTOS_DIR)) {
    console.error('❌ Папка не найдена:', ALL_PHOTOS_DIR);
    console.log('Создайте папку и положите туда фото маникюра.');
    process.exit(1);
  }

  const files = fs.readdirSync(ALL_PHOTOS_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));

  if (files.length === 0) {
    console.error('❌ В папке нет изображений!');
    console.log('Положите фото маникюра в:', ALL_PHOTOS_DIR);
    process.exit(1);
  }

  console.log(`📸 Найдено фото: ${files.length}`);

  // Создаём папки для категорий
  for (const [catId, catInfo] of Object.entries(CATEGORIES)) {
    const catDir = path.join(CATEGORIES_DIR, catId);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
      console.log(`📁 Создана папка: /manicure/${catId}/`);
    }
  }

  // Распределяем фото
  const stats = {};
  let unassigned = 0;

  for (const file of files) {
    const fileName = file.toLowerCase();
    let assigned = false;
    let bestCategory = null;
    let bestScore = 0;

    // Определяем лучшую категорию по количеству совпадений ключевых слов
    for (const [catId, catInfo] of Object.entries(CATEGORIES)) {
      let score = 0;
      for (const keyword of catInfo.keywords) {
        if (fileName.includes(keyword.toLowerCase())) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestCategory = catId;
      }
    }

    // Если не удалось определить — распределяем случайно
    if (!bestCategory) {
      const catIds = Object.keys(CATEGORIES);
      bestCategory = catIds[Math.floor(Math.random() * catIds.length)];
      unassigned++;
    }

    // Копируем файл в папку категории
    const srcPath = path.join(ALL_PHOTOS_DIR, file);
    const destDir = path.join(CATEGORIES_DIR, bestCategory);
    const destPath = path.join(destDir, file);

    fs.copyFileSync(srcPath, destPath);

    stats[bestCategory] = (stats[bestCategory] || 0) + 1;
    assigned = true;
  }

  // Выводим статистику
  console.log('\n✅ Распределение завершено!\n');
  console.log('📊 Статистика по категориям:');
  console.log('─'.repeat(40));

  for (const [catId, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
    const catName = CATEGORIES[catId]?.name || catId;
    console.log(`  ${catName.padEnd(20)} ${count} фото`);
  }

  console.log('─'.repeat(40));
  console.log(`  Всего распределено: ${files.length} фото`);
  if (unassigned > 0) {
    console.log(`  ⚠️ Случайно распределено: ${unassigned} фото (без ключевых слов)`);
  }

  console.log('\n💡 Теперь запустите сайт — фото появятся автоматически!');
}

distributePhotos();
