export const IDIOMAS_CONTENIDO = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'Inglés', flag: '🇺🇸' },
  { code: 'de', label: 'Alemán', flag: '🇩🇪' },
  { code: 'fr', label: 'Francés', flag: '🇫🇷' },
  { code: 'pt', label: 'Portugués', flag: '🇧🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', label: 'Chino Mandarín', flag: '🇨🇳' },
  { code: 'ja', label: 'Japonés', flag: '🇯🇵' },
  { code: 'ko', label: 'Coreano', flag: '🇰🇷' },
  { code: 'ar', label: 'Árabe', flag: '🇸🇦' },
  { code: 'ru', label: 'Ruso', flag: '🇷🇺' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
];

export const IDIOMAS_EXPLICACION = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'Inglés', flag: '🇺🇸' },
  { code: 'de', label: 'Alemán', flag: '🇩🇪' },
  { code: 'fr', label: 'Francés', flag: '🇫🇷' },
  { code: 'pt', label: 'Portugués', flag: '🇧🇷' },
];

export const EDITORES = [
  { id: 'vscode', label: 'Visual Studio Code', icon: '💻', desc: 'Editor local con terminal integrada' },
  { id: 'antigravity', label: 'Antigravity', icon: '🚀', desc: 'Editor online sin instalación' },
];

export interface TemaCategoria {
  id: string;
  nombre: string;
  temas: { id: string; label: string; emoji: string }[];
}

export const TEMAS_CATEGORIAS: TemaCategoria[] = [
  {
    id: 'salud',
    nombre: '🧠 Salud y Bienestar',
    temas: [
      { id: 'ansiedad', label: 'Ansiedad y Salud Mental', emoji: '🧠' },
      { id: 'fitness', label: 'Fitness y Nutrición', emoji: '💪' },
      { id: 'meditacion', label: 'Meditación y Mindfulness', emoji: '🧘' },
      { id: 'sueno', label: 'Sueño y Descanso', emoji: '😴' },
      { id: 'estres', label: 'Manejo del Estrés', emoji: '🌿' },
      { id: 'autoestima', label: 'Autoestima y Confianza', emoji: '💎' },
    ],
  },
  {
    id: 'dinero',
    nombre: '💰 Dinero y Negocios',
    temas: [
      { id: 'finanzas', label: 'Finanzas Personales', emoji: '💰' },
      { id: 'inversiones', label: 'Inversiones y Bolsa', emoji: '📈' },
      { id: 'emprendimiento', label: 'Emprendimiento', emoji: '🚀' },
      { id: 'freelance', label: 'Freelancing y Trabajo Remoto', emoji: '🏠' },
      { id: 'ecommerce', label: 'E-commerce y Ventas Online', emoji: '🛍️' },
      { id: 'criptomonedas', label: 'Criptomonedas y Web3', emoji: '🪙' },
      { id: 'bienes_raices', label: 'Bienes Raíces', emoji: '🏢' },
    ],
  },
  {
    id: 'desarrollo',
    nombre: '⚡ Desarrollo Personal',
    temas: [
      { id: 'habitos', label: 'Hábitos y Productividad', emoji: '⚡' },
      { id: 'liderazgo', label: 'Liderazgo', emoji: '👑' },
      { id: 'espiritualidad', label: 'Espiritualidad', emoji: '✨' },
      { id: 'inteligencia_emocional', label: 'Inteligencia Emocional', emoji: '❤️‍🔥' },
      { id: 'hablar_publico', label: 'Hablar en Público', emoji: '🎤' },
      { id: 'mentalidad', label: 'Mentalidad de Crecimiento', emoji: '🌱' },
      { id: 'estoicismo', label: 'Estoicismo Moderno', emoji: '🏛️' },
    ],
  },
  {
    id: 'relaciones_cat',
    nombre: '💬 Relaciones y Familia',
    temas: [
      { id: 'relaciones', label: 'Relaciones y Comunicación', emoji: '💬' },
      { id: 'crianza', label: 'Crianza y Familia', emoji: '👨‍👩‍👧‍👦' },
      { id: 'parejas', label: 'Relaciones de Pareja', emoji: '💕' },
      { id: 'sexualidad', label: 'Sexualidad y Conexión', emoji: '🔥' },
      { id: 'duelo', label: 'Duelo y Pérdida', emoji: '🕊️' },
      { id: 'amistad', label: 'Amistades y Redes Sociales', emoji: '🤝' },
    ],
  },
  {
    id: 'tech',
    nombre: '👨‍💻 Tecnología y Digital',
    temas: [
      { id: 'programacion', label: 'Programación', emoji: '👨‍💻' },
      { id: 'ia', label: 'Inteligencia Artificial', emoji: '🤖' },
      { id: 'marketing', label: 'Marketing Digital', emoji: '📊' },
      { id: 'redes_sociales', label: 'Redes Sociales y Branding', emoji: '📱' },
      { id: 'ciberseguridad', label: 'Ciberseguridad', emoji: '🔐' },
      { id: 'nocode', label: 'No-Code y Automatización', emoji: '⚙️' },
      { id: 'datos', label: 'Ciencia de Datos', emoji: '📉' },
    ],
  },
  {
    id: 'creativo',
    nombre: '🎨 Creatividad y Arte',
    temas: [
      { id: 'escritura', label: 'Escritura Creativa', emoji: '✍️' },
      { id: 'fotografia', label: 'Fotografía', emoji: '📸' },
      { id: 'musica', label: 'Música y Producción', emoji: '🎵' },
      { id: 'dibujo', label: 'Dibujo e Ilustración', emoji: '🎨' },
      { id: 'cine', label: 'Cine y Guionismo', emoji: '🎬' },
      { id: 'diseno', label: 'Diseño Gráfico', emoji: '🖌️' },
    ],
  },
  {
    id: 'educacion_cat',
    nombre: '📚 Educación y Aprendizaje',
    temas: [
      { id: 'idiomas', label: 'Aprender Idiomas', emoji: '🗣️' },
      { id: 'estudio', label: 'Técnicas de Estudio', emoji: '📖' },
      { id: 'matematicas', label: 'Matemáticas Prácticas', emoji: '🔢' },
      { id: 'historia', label: 'Historia Fascinante', emoji: '🏺' },
      { id: 'filosofia', label: 'Filosofía para la Vida', emoji: '🤔' },
      { id: 'ciencia', label: 'Ciencia para Todos', emoji: '🔬' },
    ],
  },
  {
    id: 'lifestyle',
    nombre: '🌍 Estilo de Vida',
    temas: [
      { id: 'viajes', label: 'Viajes y Aventura', emoji: '✈️' },
      { id: 'cocina', label: 'Cocina y Gastronomía', emoji: '🍳' },
      { id: 'minimalismo', label: 'Minimalismo', emoji: '🪴' },
      { id: 'moda', label: 'Moda y Estilo Personal', emoji: '👗' },
      { id: 'jardineria', label: 'Jardinería y Plantas', emoji: '🌻' },
      { id: 'mascotas', label: 'Mascotas y Cuidado Animal', emoji: '🐾' },
      { id: 'sostenibilidad', label: 'Vida Sostenible', emoji: '♻️' },
    ],
  },
];

// Flat list for backward compatibility and lookups
export const TEMAS_EJEMPLO = [
  ...TEMAS_CATEGORIAS.flatMap(cat => cat.temas),
  { id: 'custom', label: 'Tema Personalizado', emoji: '✏️' },
];

export const PLATAFORMAS_VENTA = [
  { id: 'kdp', label: 'Amazon KDP', emoji: '📦' },
  { id: 'hotmart', label: 'Hotmart', emoji: '🔥' },
  { id: 'gumroad', label: 'Gumroad', emoji: '🛒' },
  { id: 'lulu', label: 'Lulu', emoji: '📚' },
  { id: 'personal', label: 'Venta Directa / Web Personal', emoji: '🌐' },
];

export const TONOS = [
  { id: 'amigo', label: 'Como un amigo cercano', emoji: '🤝', desc: 'Casual, cercano, con humor' },
  { id: 'mentor', label: 'Mentor inspirador', emoji: '🌟', desc: 'Motivacional pero auténtico' },
  { id: 'coach', label: 'Coach profesional', emoji: '🎯', desc: 'Directo, práctico, orientado a resultados' },
  { id: 'storyteller', label: 'Narrador de historias', emoji: '📖', desc: 'Narrativo, envolvente, con anécdotas' },
];

export const LONGITUDES = [
  { id: 'corto', label: '80-120 páginas', desc: 'Libro compacto y directo' },
  { id: 'medio', label: '150-200 páginas', desc: 'Libro estándar comercial' },
  { id: 'largo', label: '250-350 páginas', desc: 'Libro extenso y profundo' },
];

export function generateMegaPrompt(config: {
  tema: string;
  temaCustom?: string;
  idiomaContenido: string;
  idiomaExplicacion: string;
  editor: string;
  plataforma: string;
  tono: string;
  longitud: string;
  incluirEjercicios: boolean;
  incluirHistorias: boolean;
  incluirCitas: boolean;
  incluirRecursos: boolean;
  audiencia: string;
}): string {
  const temaFinal = config.tema === 'custom' ? config.temaCustom || '[TU TEMA]' : 
    TEMAS_EJEMPLO.find(t => t.id === config.tema)?.label || config.tema;
  
  const idiomaContLabel = IDIOMAS_CONTENIDO.find(i => i.code === config.idiomaContenido)?.label || 'Español';
  const idiomaExpLabel = IDIOMAS_EXPLICACION.find(i => i.code === config.idiomaExplicacion)?.label || 'Español';
  const editorLabel = EDITORES.find(e => e.id === config.editor)?.label || 'VS Code';
  const plataformaLabel = PLATAFORMAS_VENTA.find(p => p.id === config.plataforma)?.label || 'Amazon KDP';
  const tonoObj = TONOS.find(t => t.id === config.tono);
  const longitudObj = LONGITUDES.find(l => l.id === config.longitud);
  const audienciaTexto = config.audiencia || 'adultos de 25-45 años que buscan transformar su vida';

  const editorInstructions = config.editor === 'vscode' 
    ? `Uso VS Code con terminal integrada. Dame los comandos exactos para terminal (mkdir, touch, etc.) para crear toda la estructura del proyecto.`
    : `Uso Antigravity (editor online). Dame instrucciones claras para crear la estructura del proyecto dentro de esa plataforma, sin depender de terminal local.`;

  const idiomaNote = config.idiomaContenido !== config.idiomaExplicacion
    ? `\n\n⚠️ REGLA CRÍTICA DE IDIOMA: Todo el CONTENIDO del libro (texto que leerá el comprador) debe estar escrito en ${idiomaContLabel}. Pero TODAS tus instrucciones, explicaciones, comentarios y guías para mí deben estar en ${idiomaExpLabel}. Nunca mezcles esto. El lector final solo verá ${idiomaContLabel}. Yo solo entiendo tus explicaciones en ${idiomaExpLabel}.`
    : `\n\nIdioma: Todo en ${idiomaContLabel} — tanto el contenido del libro como tus explicaciones.`;

  const extras: string[] = [];
  if (config.incluirEjercicios) extras.push('ejercicios prácticos al final de cada capítulo (mínimo 3 por capítulo, que el lector pueda hacer HOY mismo)');
  if (config.incluirHistorias) extras.push('historias reales o basadas en realidad al inicio de cada capítulo (que enganchen emocionalmente, nada inventado que suene falso)');
  if (config.incluirCitas) extras.push('citas relevantes de expertos o figuras reconocidas (bien integradas en el texto, no puestas al azar)');
  if (config.incluirRecursos) extras.push('sección de recursos adicionales al final del libro (libros, podcasts, herramientas, sitios web)');

  const extrasText = extras.length > 0 
    ? `\n\nELEMENTOS ESPECIALES QUE QUIERO EN CADA CAPÍTULO:\n${extras.map((e, i) => `${i + 1}. ${e}`).join('\n')}`
    : '';

  return `# 🔥 MEGA PROMPT — CREACIÓN DE LIBRO PROFESIONAL EN LATEX
# Generado por Prompt Forge | promptforge.dev

---

## TU ROL (Esto es lo que eres, no lo que "actúas")

Eres tres personas en una:

1. **Un maestro de LaTeX** que ha maquetado más de 500 libros comerciales. Conoces cada paquete, cada truco, cada detalle tipográfico que hace que un libro se vea de $30 USD y no de $3.
2. **Un editor de bestsellers** que sabe exactamente qué hace que un libro se venda. Has trabajado con autores reales. Sabes que el 90% de los libros autoeditados fracasan porque parecen genéricos — y tú no vas a permitir eso.
3. **Un escritor que escribe como habla la gente real.** Nada de frases robóticas tipo "en esta sección exploraremos" o "es importante destacar que". Escribes como ${tonoObj?.label || 'un amigo cercano'} — ${tonoObj?.desc || 'natural, directo, con personalidad'}.

---

## EL PROYECTO

**Tema del libro:** ${temaFinal}
**Audiencia:** ${audienciaTexto}
**Plataforma de venta:** ${plataformaLabel}
**Longitud objetivo:** ${longitudObj?.label || '150-200 páginas'} (${longitudObj?.desc || 'libro estándar comercial'})
**Editor que uso:** ${editorLabel}
${idiomaNote}

---

## MI NIVEL TÉCNICO

Soy principiante total en LaTeX. Necesito:
- Cada comando explicado brevemente (una línea, no un párrafo)
- Código COMPLETO, nunca parcial, nunca "agrega aquí tu contenido"
- Si algo puede salir mal, avísame ANTES de que pase
- ${editorInstructions}

---

## CÓMO VAMOS A TRABAJAR (EL SISTEMA)

### FASE 1: ESTRUCTURA TÉCNICA (Empezamos por aquí)

Dame TODO esto de una vez:

1. **Comandos exactos** para crear la estructura del proyecto completa
2. **Estructura de carpetas y archivos** profesional (no la típica de tutorial)
3. **Código completo** de estos archivos:
   - \`main.tex\` — archivo maestro que jala todo
   - \`preamble.tex\` — configuración PRO (tamaño 6×9 para ${plataformaLabel}, tipografía premium, headers/footers elegantes, colores de marca, espaciado perfecto)
   - \`titlepage.tex\` — portada interior que impresione
   - \`copyright.tex\` — página legal profesional
   - \`dedication.tex\` — dedicatoria
   - \`about-author.tex\` — sobre el autor (con placeholder inteligente)
   - \`bibliography.tex\` — bibliografía
4. **Estructura del libro** con 12 capítulos recomendados (título + descripción de una línea de cada uno)
   - Los títulos deben ser MAGNÉTICOS, no genéricos
   - Ejemplo de título genérico (MAL): "Capítulo 1: Introducción a la Ansiedad"
   - Ejemplo de título magnético (BIEN): "El Monstruo Invisible: Por Qué Tu Mente Te Ataca"
5. **Tabla de contenido** automática y profesional

### FASE 2: CONTENIDO (Capítulo por capítulo)

Cuando yo escriba: **"listo capítulo [número]"** — tú haces esto:

1. Escribes el capítulo COMPLETO en LaTeX
2. El contenido debe ser:
   - **Original** — nada que suene a Wikipedia o a ChatGPT genérico
   - **Emocional** — que el lector sienta algo en los primeros 3 párrafos
   - **Práctico** — cada capítulo deja al lector con algo que PUEDE HACER hoy
   - **Con personalidad** — como si ${tonoObj?.label || 'un amigo'} te estuviera explicando
   - **Con ritmo** — párrafos cortos, frases que golpean, espacios para respirar
3. Longitud: cada capítulo debe tener entre ${config.longitud === 'corto' ? '2,000-3,000' : config.longitud === 'largo' ? '5,000-7,000' : '3,000-5,000'} palabras
4. Estructura interna de cada capítulo:
   - Apertura con gancho (historia, pregunta provocadora, dato impactante)
   - Desarrollo del tema con subtemas claros
   - Ejemplos reales o realistas
   - Cierre memorable (no resumen aburrido)
${extrasText}

### FASE 3: FINALIZACIÓN

Cuando yo escriba **"finalizar libro"**, haces esto:

1. **Revisión de coherencia** — que el libro fluya como UNA pieza, no como 12 artículos pegados
2. **Optimización de redacción** — nivel de escritor profesional nativo en ${idiomaContLabel}
3. **Pulido de diseño** — que el PDF final se vea premium (márgenes, tipografía, espaciado)
4. **Portada interior** definitiva
5. **Contraportada** con texto de venta que enganche
6. **Verificación de compilación** — que compile sin errores
7. **Checklist final** para ${plataformaLabel}

---

## REGLAS INQUEBRANTABLES

1. ❌ **NUNCA** escribas contenido genérico. Si suena a que cualquier IA lo podría haber escrito, reescríbelo.
2. ❌ **NUNCA** dejes código incompleto. Todo debe funcionar al copiar y pegar.
3. ❌ **NUNCA** uses frases tipo: "Es importante mencionar que...", "Cabe destacar...", "En este capítulo veremos...". Eso es basura robótica.
4. ✅ **SIEMPRE** escribe como si le hablaras a una persona real que está sentada frente a ti.
5. ✅ **SIEMPRE** prioriza claridad sobre sofisticación. Si una palabra simple funciona mejor que una elegante, usa la simple.
6. ✅ **SIEMPRE** incluye algo inesperado en cada capítulo — un dato raro, una perspectiva diferente, algo que haga decir "wow, eso no lo sabía".
7. ✅ **SIEMPRE** que yo diga "más" sobre algo, profundiza al doble sin que yo tenga que especificar.
8. ✅ El libro debe poder competir visualmente con cualquier libro de editorial profesional.
9. ✅ Todo el código LaTeX debe compilar limpio, sin warnings, sin errores.

---

## FORMATO DE TUS RESPUESTAS

Cuando me des código:
\`\`\`latex
% 📄 Nombre del archivo: [nombre.tex]
% 📁 Ubicación: [ruta/del/archivo]
[código completo aquí]
\`\`\`

Cuando me expliques algo:
- Máximo 2-3 líneas
- Directo al grano
- Sin rodeos

---

## EMPEZAMOS AHORA

👉 **Dame la FASE 1 completa.** Estructura del proyecto, todos los archivos base, los 12 capítulos propuestos con títulos magnéticos, y todo el código LaTeX listo para copiar en mi ${editorLabel}.

No me preguntes nada. No me pidas confirmación. Simplemente empieza. Si necesitas asumir algo, asume la mejor opción y dime qué asumiste al final.`;
}
