import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronRight, ChevronLeft, Zap, Globe, Pen,
  Monitor, ShoppingBag, MessageSquare, Ruler, Settings2,
  Sparkles, Search, ChevronDown, ChevronUp
} from 'lucide-react';
import { StepIndicator } from './components/StepIndicator';
import { OptionCard } from './components/OptionCard';
import { ToggleSwitch } from './components/ToggleSwitch';
import { PromptOutput } from './components/PromptOutput';
import {
  IDIOMAS_CONTENIDO, IDIOMAS_EXPLICACION, EDITORES,
  TEMAS_EJEMPLO, TEMAS_CATEGORIAS, PLATAFORMAS_VENTA, TONOS, LONGITUDES,
  generateMegaPrompt,
} from './data/promptData';
import { cn } from './utils/cn';

const STEPS = ['Tema', 'Idioma', 'Editor', 'Venta', 'Tono', 'Extras', 'Generar'];

interface Config {
  tema: string;
  temaCustom: string;
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
}

const defaultConfig: Config = {
  tema: '',
  temaCustom: '',
  idiomaContenido: 'es',
  idiomaExplicacion: 'es',
  editor: 'vscode',
  plataforma: 'kdp',
  tono: 'amigo',
  longitud: 'medio',
  incluirEjercicios: true,
  incluirHistorias: true,
  incluirCitas: false,
  incluirRecursos: true,
  audiencia: '',
};

export function App() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [searchTema, setSearchTema] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const filteredCategories = useMemo(() => {
    if (!searchTema.trim()) return TEMAS_CATEGORIAS;
    const q = searchTema.toLowerCase();
    return TEMAS_CATEGORIAS
      .map(cat => ({
        ...cat,
        temas: cat.temas.filter(t =>
          t.label.toLowerCase().includes(q) || t.emoji.includes(q)
        ),
      }))
      .filter(cat => cat.temas.length > 0);
  }, [searchTema]);

  const update = useCallback(<K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const canProceed = () => {
    switch (step) {
      case 0: return config.tema !== '' && (config.tema !== 'custom' || config.temaCustom.trim() !== '');
      case 1: return config.idiomaContenido !== '' && config.idiomaExplicacion !== '';
      case 2: return config.editor !== '';
      case 3: return config.plataforma !== '';
      case 4: return config.tono !== '' && config.longitud !== '';
      case 5: return true;
      default: return true;
    }
  };

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleGenerate = () => {
    const prompt = generateMegaPrompt(config);
    setGeneratedPrompt(prompt);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setStep(0);
    setGeneratedPrompt(null);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepContainer
            icon={<BookOpen className="h-5 w-5" />}
            title="¿Sobre qué va tu libro?"
            subtitle="Elige un tema de la lista o escribe el tuyo propio. Este será el corazón de todo."
          >
            <div className="space-y-4">
              {/* Custom topic input - always visible and prominent */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-brand-500/20 blur-sm" />
                <div className={cn(
                  "relative rounded-2xl border-2 p-4 transition-all duration-300",
                  config.tema === 'custom'
                    ? "border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/20"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                )}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">✏️</span>
                    <span className="text-sm font-semibold text-white">Escribe tu propio tema</span>
                    {config.tema === 'custom' && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-xs bg-brand-500/30 text-brand-300 px-2 py-0.5 rounded-full"
                      >
                        ✓ Seleccionado
                      </motion.span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={config.temaCustom}
                    onFocus={() => update('tema', 'custom')}
                    onChange={e => {
                      update('tema', 'custom');
                      update('temaCustom', e.target.value);
                    }}
                    placeholder="Ej: Cómo superar la procrastinación, Trading de criptomonedas, Cocina vegana fácil..."
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white text-sm placeholder:text-white/25 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/30 uppercase tracking-widest">o elige un tema popular</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  value={searchTema}
                  onChange={e => setSearchTema(e.target.value)}
                  placeholder="Buscar tema..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/20 transition-all"
                />
                {searchTema && (
                  <button
                    onClick={() => setSearchTema('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredCategories.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-white/30 text-sm">No se encontraron temas con "{searchTema}"</p>
                    <p className="text-white/20 text-xs mt-1">Prueba con otra palabra o escribe tu tema arriba ☝️</p>
                  </div>
                )}
                {filteredCategories.map(cat => {
                  const isExpanded = expandedCategories[cat.id] !== false; // default open
                  const hasSelectedTema = cat.temas.some(t => t.id === config.tema);
                  return (
                    <div key={cat.id} className={cn(
                      "rounded-xl border transition-all duration-200",
                      hasSelectedTema ? "border-brand-500/30 bg-brand-500/5" : "border-white/5 bg-white/[0.02]"
                    )}>
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <span className="text-sm font-semibold text-white/80">{cat.nombre}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/20">{cat.temas.length}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5 text-white/30" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-white/30" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 px-2 pb-2">
                              {cat.temas.map(t => (
                                <OptionCard
                                  key={t.id}
                                  selected={config.tema === t.id}
                                  onClick={() => {
                                    update('tema', t.id);
                                    update('temaCustom', '');
                                  }}
                                  emoji={t.emoji}
                                  label={t.label}
                                  compact
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Selected topic indicator */}
              {config.tema && config.tema !== 'custom' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-brand-500/20 bg-brand-500/5 px-4 py-2.5"
                >
                  <span className="text-lg">{TEMAS_EJEMPLO.find(t => t.id === config.tema)?.emoji}</span>
                  <div>
                    <span className="text-xs text-white/40">Tema seleccionado:</span>
                    <p className="text-sm font-semibold text-brand-300">{TEMAS_EJEMPLO.find(t => t.id === config.tema)?.label}</p>
                  </div>
                  <button
                    onClick={() => update('tema', '')}
                    className="ml-auto text-white/30 hover:text-white/60 text-xs"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </div>
          </StepContainer>
        );

      case 1:
        return (
          <StepContainer
            icon={<Globe className="h-5 w-5" />}
            title="Idiomas"
            subtitle="El libro se escribe en un idioma, pero las instrucciones pueden ser en otro. La magia bilingüe."
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-brand-300 mb-3 flex items-center gap-2">
                  <Pen className="h-4 w-4" />
                  Idioma del CONTENIDO del libro (lo que lee el comprador)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                  {IDIOMAS_CONTENIDO.map(i => (
                    <OptionCard
                      key={i.code}
                      selected={config.idiomaContenido === i.code}
                      onClick={() => update('idiomaContenido', i.code)}
                      flag={i.flag}
                      label={i.label}
                      compact
                    />
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <label className="text-sm font-semibold text-brand-300 mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Idioma de las EXPLICACIONES (cómo te habla la IA a ti)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {IDIOMAS_EXPLICACION.map(i => (
                    <OptionCard
                      key={i.code}
                      selected={config.idiomaExplicacion === i.code}
                      onClick={() => update('idiomaExplicacion', i.code)}
                      flag={i.flag}
                      label={i.label}
                      compact
                    />
                  ))}
                </div>
              </div>
              {config.idiomaContenido !== config.idiomaExplicacion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-accent-400/30 bg-accent-400/5 p-3"
                >
                  <p className="text-xs text-accent-400">
                    ✨ El libro se escribirá en <strong>{IDIOMAS_CONTENIDO.find(i => i.code === config.idiomaContenido)?.label}</strong>, pero la IA te explicará todo en <strong>{IDIOMAS_EXPLICACION.find(i => i.code === config.idiomaExplicacion)?.label}</strong>.
                  </p>
                </motion.div>
              )}
            </div>
          </StepContainer>
        );

      case 2:
        return (
          <StepContainer
            icon={<Monitor className="h-5 w-5" />}
            title="¿Dónde vas a trabajar?"
            subtitle="Las instrucciones se adaptan a tu editor. Sin complicaciones."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EDITORES.map(e => (
                <OptionCard
                  key={e.id}
                  selected={config.editor === e.id}
                  onClick={() => update('editor', e.id)}
                  emoji={e.icon}
                  label={e.label}
                  desc={e.desc}
                />
              ))}
            </div>
          </StepContainer>
        );

      case 3:
        return (
          <StepContainer
            icon={<ShoppingBag className="h-5 w-5" />}
            title="¿Dónde vas a vender?"
            subtitle="El formato, márgenes y especificaciones se ajustan a la plataforma."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PLATAFORMAS_VENTA.map(p => (
                <OptionCard
                  key={p.id}
                  selected={config.plataforma === p.id}
                  onClick={() => update('plataforma', p.id)}
                  emoji={p.emoji}
                  label={p.label}
                />
              ))}
            </div>
          </StepContainer>
        );

      case 4:
        return (
          <StepContainer
            icon={<MessageSquare className="h-5 w-5" />}
            title="Tono y longitud"
            subtitle="Define la personalidad del libro y cuánto quieres que se extienda."
          >
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-brand-300 mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  ¿Cómo quieres que suene?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {TONOS.map(t => (
                    <OptionCard
                      key={t.id}
                      selected={config.tono === t.id}
                      onClick={() => update('tono', t.id)}
                      emoji={t.emoji}
                      label={t.label}
                      desc={t.desc}
                    />
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <label className="text-sm font-semibold text-brand-300 mb-3 flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Longitud del libro
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  {LONGITUDES.map(l => (
                    <OptionCard
                      key={l.id}
                      selected={config.longitud === l.id}
                      onClick={() => update('longitud', l.id)}
                      label={l.label}
                      desc={l.desc}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepContainer>
        );

      case 5:
        return (
          <StepContainer
            icon={<Settings2 className="h-5 w-5" />}
            title="Toques finales"
            subtitle="Personaliza los extras y define tu audiencia ideal."
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ToggleSwitch
                  checked={config.incluirEjercicios}
                  onChange={v => update('incluirEjercicios', v)}
                  label="Ejercicios prácticos por capítulo"
                  emoji="✍️"
                />
                <ToggleSwitch
                  checked={config.incluirHistorias}
                  onChange={v => update('incluirHistorias', v)}
                  label="Historias al inicio de cada capítulo"
                  emoji="📖"
                />
                <ToggleSwitch
                  checked={config.incluirCitas}
                  onChange={v => update('incluirCitas', v)}
                  label="Citas de expertos"
                  emoji="💬"
                />
                <ToggleSwitch
                  checked={config.incluirRecursos}
                  onChange={v => update('incluirRecursos', v)}
                  label="Sección de recursos adicionales"
                  emoji="🔗"
                />
              </div>
              <div className="border-t border-white/10 pt-6">
                <label className="text-sm font-semibold text-brand-300 mb-2 block">
                  🎯 ¿Quién es tu lector ideal? (opcional)
                </label>
                <input
                  type="text"
                  value={config.audiencia}
                  onChange={e => update('audiencia', e.target.value)}
                  placeholder="Ej: mujeres de 30-45 años que luchan con la ansiedad laboral..."
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
                <p className="text-xs text-white/30 mt-2">Si lo dejas vacío, usaremos una audiencia general.</p>
              </div>
            </div>
          </StepContainer>
        );

      case 6:
        return (
          <StepContainer
            icon={<Sparkles className="h-5 w-5" />}
            title="Todo listo. ¿Generamos tu Mega Prompt?"
            subtitle="Aquí tienes el resumen de lo que configuraste."
          >
            <div className="space-y-4">
              <SummaryRow label="Tema" value={config.tema === 'custom' ? config.temaCustom : TEMAS_EJEMPLO.find(t => t.id === config.tema)?.label || ''} emoji={TEMAS_EJEMPLO.find(t => t.id === config.tema)?.emoji || '📝'} />
              <SummaryRow label="Contenido en" value={IDIOMAS_CONTENIDO.find(i => i.code === config.idiomaContenido)?.label || ''} emoji={IDIOMAS_CONTENIDO.find(i => i.code === config.idiomaContenido)?.flag || '🌐'} />
              <SummaryRow label="Explicaciones en" value={IDIOMAS_EXPLICACION.find(i => i.code === config.idiomaExplicacion)?.label || ''} emoji={IDIOMAS_EXPLICACION.find(i => i.code === config.idiomaExplicacion)?.flag || '🌐'} />
              <SummaryRow label="Editor" value={EDITORES.find(e => e.id === config.editor)?.label || ''} emoji={EDITORES.find(e => e.id === config.editor)?.icon || '💻'} />
              <SummaryRow label="Plataforma" value={PLATAFORMAS_VENTA.find(p => p.id === config.plataforma)?.label || ''} emoji={PLATAFORMAS_VENTA.find(p => p.id === config.plataforma)?.emoji || '📦'} />
              <SummaryRow label="Tono" value={TONOS.find(t => t.id === config.tono)?.label || ''} emoji={TONOS.find(t => t.id === config.tono)?.emoji || '🤝'} />
              <SummaryRow label="Longitud" value={LONGITUDES.find(l => l.id === config.longitud)?.label || ''} emoji="📏" />
              
              <div className="flex flex-wrap gap-2 pt-2">
                {config.incluirEjercicios && <Tag label="Ejercicios" />}
                {config.incluirHistorias && <Tag label="Historias" />}
                {config.incluirCitas && <Tag label="Citas" />}
                {config.incluirRecursos && <Tag label="Recursos" />}
              </div>

              {config.audiencia && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 mt-2">
                  <span className="text-xs text-white/40">Audiencia:</span>
                  <p className="text-sm text-white/80 mt-1">{config.audiencia}</p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                className="w-full mt-6 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow animate-pulse-glow"
              >
                <Zap className="h-5 w-5" />
                Generar Mega Prompt 🔥
              </motion.button>
            </div>
          </StepContainer>
        );

      default:
        return null;
    }
  };

  if (generatedPrompt) {
    return (
      <div className="min-h-screen bg-surface-950 text-white">
        <Background />
        <div className="relative z-10 px-4 py-8 sm:py-12">
          <PromptOutput prompt={generatedPrompt} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-hidden">
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-white/5 px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 shadow-lg shadow-brand-500/30">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">Prompt Forge</h1>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Mega Prompt Generator</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <StepIndicator steps={STEPS} currentStep={step} />
            </div>
          </div>
          <div className="sm:hidden mt-3">
            <StepIndicator steps={STEPS} currentStep={step} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="border-t border-white/5 px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goBack}
              disabled={step === 0}
              className={cn(
                'flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all',
                step === 0
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              Atrás
            </motion.button>

            <div className="text-xs text-white/20">
              {step + 1} / {STEPS.length}
            </div>

            {step < STEPS.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goNext}
                disabled={!canProceed()}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
                  canProceed()
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                )}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            )}

            {step === STEPS.length - 1 && <div className="w-24" />}
          </div>
        </footer>
      </div>
    </div>
  );
}

function StepContainer({ icon, title, subtitle, children }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400">
            {icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-sm text-white/50 ml-[42px]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function SummaryRow({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
      <span className="text-lg">{emoji}</span>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-white/40 block">{label}</span>
        <span className="text-sm font-medium text-white truncate block">{value}</span>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-300">
      ✓ {label}
    </span>
  );
}

function Background() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-brand-500/8 blur-[120px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/8 blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-[40%] right-[20%] h-[300px] w-[300px] rounded-full bg-brand-600/5 blur-[100px] animate-float" style={{ animationDelay: '-1.5s' }} />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
