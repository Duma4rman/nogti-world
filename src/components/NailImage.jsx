import { useMemo } from 'react';

// Компонент для генерации реалистичной SVG-визуализации маникюра
const NailImage = ({ nail, isHovered }) => {
  const svg = useMemo(() => {
    const id = nail.id;
    const seed = id.split('-').pop();
    const numIndex = parseInt(seed) || 0;
    const category = id.split('-').slice(0, -1).join('-');

    // Уникальные параметры для каждой карточки
    const hue1 = ((numIndex * 37 + 300) % 360);
    const hue2 = (hue1 + 30) % 360;
    const lightness = 65 + (numIndex % 20);
    const saturation = 70 + (numIndex % 25);

    // Тип маникюра на основе категории и индекса
    const designType = (numIndex + category.length) % 8;

    // Функция для создания цвета
    const color1 = `hsl(${hue1}, ${saturation}%, ${lightness}%)`;
    const color2 = `hsl(${hue2}, ${saturation - 10}%, ${lightness + 10}%)`;
    const color3 = `hsl(${(hue1 + 60) % 360}, ${saturation - 5}%, ${lightness + 5}%)`;

    // Рисуем реалистичные ногти
    const nailShapes = [];

    for (let i = 0; i < 5; i++) {
      const x = 40 + i * 70;
      const y = 180 + Math.sin(i * 0.5 + numIndex) * 30;
      const width = 55;
      const height = 180 + (numIndex % 40);
      const rotation = -5 + i * 2.5 + (numIndex % 5);

      let fill = color1;
      let pattern = '';

      // Разные дизайны для разных ногтей
      switch (designType) {
        case 0: // Французский маникюр
          fill = `url(#french-${numIndex}-${i})`;
          pattern = `<linearGradient id="french-${numIndex}-${i}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="70%" style="stop-color:#fce4ec"/>
            <stop offset="70%" style="stop-color:#ffffff"/>
            <stop offset="100%" style="stop-color:#fff"/>
          </linearGradient>`;
          break;
        case 1: // Омбре
          fill = `url(#ombre-${numIndex}-${i})`;
          pattern = `<linearGradient id="ombre-${numIndex}-${i}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style="stop-color:${color1}"/>
            <stop offset="50%" style="stop-color:${color2}"/>
            <stop offset="100%" style="stop-color:${color3}"/>
          </linearGradient>`;
          break;
        case 2: // С блёстками
          fill = `url(#glitter-${numIndex}-${i})`;
          pattern = `<radialGradient id="glitter-${numIndex}-${i}" cx="${30 + i * 10}%" cy="${20 + numIndex % 30}%" r="60%">
            <stop offset="0%" style="stop-color:${color1}"/>
            <stop offset="100%" style="stop-color:${color2}"/>
          </radialGradient>`;
          break;
        case 3: // Полоски
          fill = `url(#stripes-${numIndex}-${i})`;
          pattern = `<linearGradient id="stripes-${numIndex}-${i}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style="stop-color:${color1}"/>
            <stop offset="25%" style="stop-color:${color1}"/>
            <stop offset="25%" style="stop-color:${color2}"/>
            <stop offset="50%" style="stop-color:${color2}"/>
            <stop offset="50%" style="stop-color:${color1}"/>
            <stop offset="75%" style="stop-color:${color1}"/>
            <stop offset="75%" style="stop-color:${color3}"/>
            <stop offset="100%" style="stop-color:${color3}"/>
          </linearGradient>`;
          break;
        case 4: // Матовый
          fill = color1;
          pattern = '';
          break;
        case 5: // Мрамор
          fill = `url(#marble-${numIndex}-${i})`;
          pattern = `<linearGradient id="marble-${numIndex}-${i}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style="stop-color:#f5f5f5"/>
            <stop offset="30%" style="stop-color:${color1}40"/>
            <stop offset="60%" style="stop-color:#e0e0e0"/>
            <stop offset="100%" style="stop-color:${color2}30"/>
          </linearGradient>`;
          break;
        case 6: // Неон
          fill = `hsl(${(hue1 + i * 20) % 360}, 100%, 60%)`;
          pattern = '';
          break;
        case 7: // Градиент радужный
          fill = `url(#rainbow-${numIndex}-${i})`;
          pattern = `<linearGradient id="rainbow-${numIndex}-${i}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style="stop-color:hsl(${(hue1 + i * 30) % 360}, 80%, 70%)"/>
            <stop offset="100%" style="stop-color:hsl(${(hue1 + i * 30 + 60) % 360}, 80%, 60%)"/>
          </linearGradient>`;
          break;
        default:
          fill = color1;
      }

      nailShapes.push(`
        ${pattern}
        <!-- Палец -->
        <ellipse cx="${x + width/2}" cy="${y - 20}" rx="${width/2 + 8}" ry="${height/3}" fill="#fdbcb4" opacity="0.8"/>
        <!-- Ноготь -->
        <path d="M ${x} ${y + 20} 
                 Q ${x} ${y} ${x + width/2} ${y - 10} 
                 Q ${x + width} ${y} ${x + width} ${y + 20} 
                 L ${x + width} ${y + height} 
                 Q ${x + width} ${y + height + 15} ${x + width/2} ${y + height + 20} 
                 Q ${x} ${y + height + 15} ${x} ${y + height} Z" 
              fill="${fill}" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <!-- Блик -->
        <ellipse cx="${x + width * 0.3}" cy="${y + height * 0.3}" rx="${width * 0.15}" ry="${height * 0.2}" 
                 fill="rgba(255,255,255,0.3)"/>
        ${designType === 2 ? `
          <!-- Блёстки -->
          <circle cx="${x + 15}" cy="${y + 50}" r="3" fill="rgba(255,255,255,0.8)"/>
          <circle cx="${x + 40}" cy="${y + 80}" r="2" fill="rgba(255,255,255,0.6)"/>
          <circle cx="${x + 25}" cy="${y + 120}" r="4" fill="rgba(255,255,255,0.7)"/>
          <circle cx="${x + 10}" cy="${y + 160}" r="2" fill="rgba(255,255,255,0.5)"/>
        ` : ''}
        ${designType === 5 ? `
          <!-- Мраморные прожилки -->
          <path d="M ${x + 10} ${y + 40} Q ${x + 30} ${y + 80} ${x + 15} ${y + 130}" 
                stroke="rgba(0,0,0,0.1)" fill="none" stroke-width="1"/>
          <path d="M ${x + 40} ${y + 60} Q ${x + 25} ${y + 100} ${x + 45} ${y + 150}" 
                stroke="rgba(0,0,0,0.08)" fill="none" stroke-width="1"/>
        ` : ''}
      `);
    }

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="bg-${numIndex}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style="stop-color:hsl(${hue1}, 40%, 92%)"/>
            <stop offset="100%" style="stop-color:hsl(${hue2}, 35%, 88%)"/>
          </linearGradient>
        </defs>
        <!-- Фон -->
        <rect width="400" height="500" fill="url(#bg-${numIndex})"/>
        <!-- Тень под ногтями -->
        <ellipse cx="200" cy="420" rx="160" ry="40" fill="rgba(0,0,0,0.05)"/>
        <!-- Ногти -->
        ${nailShapes.join('')}
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [nail.id]);

  return (
    <img
      src={svg}
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
      }}
    />
  );
};

export default NailImage;
