import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/a0d805f8-257e-43ae-a8bd-774ba2edfa27.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/files/1768deb3-2985-4c01-ba2f-a92190189a79.jpg";
const AERIAL_IMG = "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/a0d805f8-257e-43ae-a8bd-774ba2edfa27.jpg";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function QuizModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: "min(85vh, 700px)" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors"
        >
          <Icon name="X" size={18} />
        </button>
        <iframe
          src="https://mrqz.me/kviz_7nebo"
          className="w-full h-full border-0"
          title="Подбор квартиры"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}

const plans = [
  { type: "1-комнатная", area: "38–47 м²", price: "от 5,8 млн ₽", floor: "2–26 этаж", emoji: "🛋️", badge: "Хит продаж", badgeColor: "bg-amber-500" },
  { type: "2-комнатная", area: "55–68 м²", price: "от 8,4 млн ₽", floor: "2–26 этаж", emoji: "🏠", badge: "", badgeColor: "" },
  { type: "3-комнатная", area: "72–95 м²", price: "от 8,9 млн ₽", floor: "10–26 этаж", emoji: "🌆", badge: "", badgeColor: "" },
];

const advantages = [
  { icon: "Mountain", title: "Одна из высших точек города", desc: "26 этажей — панорамные виды на весь Ижевск, леса и водоёмы прямо из вашего окна" },
  { icon: "CalendarCheck", title: "Ключи в 2026 году", desc: "Сдача объекта в 2026 году. Успейте выбрать лучшую квартиру по выгодным ценам" },
  { icon: "Eye", title: "Видовые квартиры", desc: "С верхних этажей открывается незабываемая панорама города" },
  { icon: "Trees", title: "Природа рядом", desc: "Жилой комплекс у зелёных зон и водоёмов — свежий воздух и прогулки каждый день" },
  { icon: "Shield", title: "Застройщик Литум", desc: "Надёжный застройщик с многолетним опытом. Более 10 успешных проектов в Ижевске" },
  { icon: "Car", title: "Развитая инфраструктура", desc: "Школы, детские сады, магазины, поликлиники и транспорт — всё в пешей доступности" },
];

const RENDER_IMG = "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/a0d805f8-257e-43ae-a8bd-774ba2edfa27.jpg";

const gallery = [
  { src: RENDER_IMG, label: "Фасад ЖК — вечерний вид" },
  { src: "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/8ceb6228-3ef8-45f9-a2c3-ad3a9500affc.png", label: "Холл жилого этажа" },
  { src: "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/ae80c658-551c-44cb-ae06-37d835aef547.png", label: "Вид с балкона" },
  { src: "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/7fbb9c41-0510-42d1-9125-7c56f9fe1c03.png", label: "Фасад ЖК — утренний вид" },
  { src: "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/5ab7a673-d494-444b-af20-eeb8a129e774.png", label: "Входная группа" },
  { src: "https://cdn.poehali.dev/projects/e7d132dc-1de9-4803-aefe-e1ef907cdec3/bucket/f4e4cdab-9474-40bb-8caf-12a56aa79b4c.png", label: "Благоустройство территории" },
];

const QUIZ_URL = "https://mrqz.me/kviz_7nebo";

export default function Index() {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroS = useInView(0.01);
  const advS = useInView();
  const plansS = useInView();
  const galleryS = useInView();
  const locationS = useInView();
  const contactS = useInView();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    ["advantages", "Преимущества"],
    ["plans", "Планировки"],
    ["gallery", "Галерея"],
    ["location", "Локация"],
    ["contact", "Контакты"],
  ];

  const openQuiz = () => setQuizOpen(true);

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif" }} className="bg-slate-50 text-slate-900 min-h-screen overflow-x-hidden">

      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}

      {/* GOOGLE FONT */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── NAV ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-2xl" : "bg-slate-900/80 backdrop-blur"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-black">7Н</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm leading-none tracking-wider">СЕДЬМОЕ НЕБО</div>
              <div className="text-sky-400 text-[10px] leading-none mt-0.5 tracking-widest">ИЖЕВСК</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
            {navLinks.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors hover:text-sky-300">{label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+73412970505" className="hidden sm:flex items-center gap-1.5 text-sky-400 text-sm font-semibold hover:text-white transition-colors">
              <Icon name="Phone" size={13} />
              +7 (3412) 97-05-05
            </a>
            <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/10 px-5 py-4 flex flex-col gap-1">
            {navLinks.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2.5 text-white/70 hover:text-sky-300 text-sm border-b border-white/5 last:border-0 transition-colors">{label}</button>
            ))}
            <a href="tel:+73412970505" className="mt-2 text-sky-400 font-semibold py-2 flex items-center gap-2 text-sm">
              <Icon name="Phone" size={14} />+7 (3412) 97-05-05
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="ЖК Дом природы" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>

        {/* Floating pill */}
        <div className="absolute top-24 right-6 sm:right-14 z-10">
          <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl animate-pulse">
            🔑 КЛЮЧИ В 2026
          </div>
        </div>

        <div
          ref={heroS.ref}
          className={`relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-2 gap-12 items-center py-20 transition-all duration-1000 ${heroS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 rounded-full px-4 py-1.5 text-sky-300 text-xs font-semibold mb-3 tracking-wider">
              <Icon name="MapPin" size={12} />
              ИЖЕВСК · КОМФОРТ-КЛАСС
            </div>

            <div className="text-white/40 text-xs mb-5">ПСК: 6,301% — 23,612%</div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] mb-5">
              Жилой комплекс<br />
              <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                Седьмое Небо
              </span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl mb-2 font-light">
              26 этажей · Видовые квартиры · Ижевск
            </p>
            <p className="text-white/50 text-base mb-8 max-w-md leading-relaxed">
              Одна из самых высоких точек города. Панорамные виды на Ижевск и природу. Комфорт-класс от проверенного застройщика.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-9">
              {[
                { label: "ЦЕНА ОТ", val: "5,8 млн ₽" },
                { label: "ЭТАЖЕЙ", val: "26" },
                { label: "СДАЧА", val: "2026" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-4 py-3">
                  <div className="text-sky-400 text-[10px] font-bold tracking-wider mb-0.5">{s.label}</div>
                  <div className="text-white font-black text-xl">{s.val}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openQuiz}
                className="bg-amber-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-amber-400 transition-all hover:scale-105 shadow-2xl shadow-amber-500/40 text-base text-center"
              >
                Получить консультацию
              </button>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 sm:p-8 shadow-2xl">
            <p className="text-sky-300 text-xs font-bold tracking-wider mb-1">БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</p>
            <h3 className="text-white font-black text-2xl mb-1">Узнайте цену</h3>
            <p className="text-white/50 text-sm mb-6">Ответьте на несколько вопросов — подберём лучший вариант</p>
            <button
              onClick={openQuiz}
              className="block w-full text-center bg-amber-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-amber-400 transition-all hover:scale-[1.02] shadow-xl shadow-amber-500/30 text-base mb-3"
            >
              Подобрать квартиру →
            </button>
            <div className="mt-2 flex items-center gap-2 text-white/30 text-xs justify-center">
              <Icon name="Lock" size={12} />
              Данные защищены и не передаются третьим лицам
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30">
          <span className="text-[10px] tracking-[0.3em] font-medium">ЛИСТАЙТЕ</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" style={{ animation: "bounce 1.5s infinite" }} />
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            ref={advS.ref}
            className={`transition-all duration-700 ${advS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-full px-4 py-1.5 mb-5 tracking-wider">
                <Icon name="Star" size={12} />
                ПОЧЕМУ ВЫБИРАЮТ НАС
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Преимущества ЖК</h2>
              <p className="text-slate-500 max-w-lg mx-auto">Продуманный проект комфорт-класса в одной из лучших точек Ижевска</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {advantages.map((adv, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 bg-slate-50/80"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon name={adv.icon} fallback="Star" size={22} className="text-blue-600" />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2 text-[15px]">{adv.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Strip */}
          <div className="mt-14 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-black text-xl mb-1">Хотите узнать подробности?</p>
              <p className="text-white/50 text-sm">Наш менеджер ответит на все вопросы и подберёт квартиру</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button onClick={openQuiz} className="bg-amber-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-amber-400 transition-all whitespace-nowrap shadow-lg shadow-amber-500/30 text-center">
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            ref={plansS.ref}
            className={`transition-all duration-700 ${plansS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-full px-4 py-1.5 mb-5 tracking-wider">
                <Icon name="LayoutGrid" size={12} />
                ВАРИАНТЫ КВАРТИР
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Планировки и цены</h2>
              <p className="text-slate-500 max-w-lg mx-auto">1, 2 и 3-комнатные квартиры на любой вкус и бюджет</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 group flex flex-col"
                >
                  <div className="relative bg-gradient-to-br from-sky-50 to-blue-100 p-8 text-center text-5xl">
                    {plan.emoji}
                    {plan.badge && (
                      <span className={`absolute top-3 right-3 ${plan.badgeColor} text-white text-[10px] font-black px-2 py-1 rounded-lg`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-slate-900 text-lg mb-3">{plan.type}</h3>
                    <div className="space-y-2 text-sm text-slate-500 mb-4 flex-1">
                      <div className="flex justify-between">
                        <span>Площадь:</span>
                        <span className="font-bold text-slate-700">{plan.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Этаж:</span>
                        <span className="font-bold text-slate-700">{plan.floor}</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <div className="text-blue-600 font-black text-lg mb-3">{plan.price}</div>
                      <button
                        onClick={openQuiz}
                        className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm text-center"
                      >
                        Узнать детали →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-slate-400 text-sm mb-4">Не нашли подходящий вариант? Подберём квартиру под ваш бюджет</p>
              <button
                onClick={openQuiz}
                className="bg-amber-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-amber-500/30"
              >
                Подобрать квартиру бесплатно
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-20 sm:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            ref={galleryS.ref}
            className={`transition-all duration-700 ${galleryS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-white/10 text-sky-400 text-xs font-bold rounded-full px-4 py-1.5 mb-5 tracking-wider">
                <Icon name="Images" size={12} />
                ФОТОГРАФИИ
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Галерея проекта</h2>
              <p className="text-white/40 max-w-lg mx-auto">Фасад, интерьеры, виды с высоты птичьего полёта</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {gallery.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[4/3]"
                  onClick={() => setGalleryOpen(i)}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {item.label}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ZoomIn" size={14} className="text-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={openQuiz}
                className="bg-amber-500 text-white font-bold py-4 px-10 rounded-xl hover:bg-amber-400 transition-all hover:scale-105 shadow-xl shadow-amber-500/30 text-base"
              >
                Хочу такую квартиру
              </button>
            </div>
          </div>
        </div>

        {galleryOpen !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setGalleryOpen(null)}
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors">
              <Icon name="X" size={28} />
            </button>
            <img
              src={gallery[galleryOpen].src}
              alt={gallery[galleryOpen].label}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            ref={locationS.ref}
            className={`transition-all duration-700 ${locationS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-full px-4 py-1.5 mb-5 tracking-wider">
                <Icon name="MapPin" size={12} />
                РАСПОЛОЖЕНИЕ
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Локация и инфраструктура</h2>
              <p className="text-slate-500 max-w-lg mx-auto">Всё необходимое для комфортной жизни — в шаговой доступности</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-2xl">
                <img src={AERIAL_IMG} alt="Район" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
                      <Icon name="MapPin" size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">ЖК Седьмое Небо</p>
                      <p className="text-slate-400 text-xs">г. Ижевск · Комфорт-класс · 26 этажей</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infra */}
              <div className="space-y-3">
                {[
                  { icon: "GraduationCap", label: "Школы и детские сады", val: "3–7 мин пешком" },
                  { icon: "ShoppingCart", label: "Торговые центры", val: "5–10 мин" },
                  { icon: "Cross", label: "Медицинские учреждения", val: "10 мин" },
                  { icon: "Trees", label: "Парки и скверы", val: "Рядом с домом" },
                  { icon: "Bus", label: "Остановки транспорта", val: "2–3 мин пешком" },
                  { icon: "Dumbbell", label: "Спортивные объекты", val: "7–15 мин" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-blue-200 transition-colors bg-slate-50/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center shrink-0">
                      <Icon name={item.icon} fallback="MapPin" size={18} className="text-blue-600" />
                    </div>
                    <span className="flex-1 font-medium text-slate-700 text-sm">{item.label}</span>
                    <span className="text-blue-600 text-sm font-bold whitespace-nowrap">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border-2 border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-900 font-black text-lg mb-1">Хотите посмотреть вживую?</p>
                <p className="text-slate-500 text-sm">Запишитесь на экскурсию — покажем объект, ответим на вопросы</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button onClick={openQuiz} className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors whitespace-nowrap shadow-lg">
                  Записаться на экскурсию
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div
            ref={contactS.ref}
            className={`transition-all duration-700 ${contactS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-white/10 text-sky-400 text-xs font-bold rounded-full px-4 py-1.5 mb-5 tracking-wider">
                <Icon name="MessageSquare" size={12} />
                СВЯЗАТЬСЯ С НАМИ
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Получите консультацию</h2>
              <p className="text-white/40 max-w-lg mx-auto">Оставьте заявку — менеджер перезвонит в течение 15 минут и ответит на все вопросы</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Quiz CTA */}
              <div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-7 sm:p-8 flex flex-col justify-center">
                <p className="text-sky-400 text-xs font-bold tracking-wider mb-1">БЕСПЛАТНО · 2 МИНУТЫ</p>
                <h3 className="text-white font-black text-2xl mb-2">Подберём квартиру для вас</h3>
                <p className="text-white/40 text-sm mb-6">Ответьте на несколько вопросов — поможем выбрать лучший вариант под ваш бюджет и пожелания</p>
                <button
                  onClick={openQuiz}
                  className="block w-full text-center bg-amber-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-amber-400 transition-all hover:scale-[1.02] shadow-xl shadow-amber-500/30 text-base mb-3"
                >
                  Узнать цену →
                </button>
                <p className="text-white/25 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>

              {/* Contacts */}
              <div className="flex flex-col gap-4">
                <div className="bg-white/8 backdrop-blur border border-white/15 rounded-2xl p-6">
                  <p className="text-white/40 text-xs tracking-wider mb-3">ТЕЛЕФОН ОТДЕЛА ПРОДАЖ</p>
                  <a href="tel:+73412970505" className="text-white font-black text-2xl hover:text-sky-300 transition-colors block mb-1">
                    +7 (3412) 97-05-05
                  </a>
                </div>

                <div className="bg-white/8 backdrop-blur border border-white/15 rounded-2xl p-6 space-y-4">
                  <h4 className="text-white font-black text-base">Офис продаж — Литум</h4>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name="MapPin" fallback="Info" size={14} className="text-sky-400" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] tracking-wider">АДРЕС</p>
                      <p className="text-white text-sm font-medium">г. Ижевск, М. Горького, 152</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name="Clock" fallback="Info" size={14} className="text-sky-400" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] tracking-wider">РЕЖИМ РАБОТЫ</p>
                      <p className="text-white text-sm font-medium">ПН — ПТ: 9:00 — 19:00</p>
                      <p className="text-white text-sm font-medium">СБ: 10:00 — 16:00</p>
                      <p className="text-white/50 text-sm">ВС: выходной день</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/8 backdrop-blur border border-white/15 rounded-2xl p-5 flex items-center gap-4">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <p className="text-white font-black text-sm">Надёжный застройщик</p>
                    <p className="text-white/40 text-xs leading-relaxed">Более 10 лет на рынке недвижимости Ижевска. Все объекты сдаются в срок.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="bg-slate-950 border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-5">
          <p className="text-white/30 text-[11px] leading-relaxed">
            ЖК «Седьмое Небо». Застройщик: ООО «СЗ «Монолит», ОГРН 1151831000265. Программа трейд-ин* с выгодой 3% от стоимости квартиры, представленной на сайте застройщика. Данное предложение не суммируется с другими скидками и акциями. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. *Трейд-ин — обмен недвижимости. Не является офертой. Реклама.
          </p>
          <p className="text-white/30 text-[11px] leading-relaxed">
            ЖК «Седьмое Небо», дом 5. Застройщик: ООО «СЗ «Монолит». ОГРН 1151831000265. Однокомнатные квартиры (планировка 1Е, малая секция) доступны при первоначальном взносе 0% (при соблюдении условий программ «Семейная ипотека» и «ИТ-ипотека»). Ставка 6% годовых предоставляется по указанным программам. На ограниченный пул двухкомнатных квартир действует ставка 6% годовых по программе «ИТ-ипотека». Банковские услуги оказывает ПАО «Сбербанк». Ставка может быть снижена за счет субсидирования застройщиком. Полная стоимость кредита (займа): от 2,631% до 13,364% годовых. Первоначальный взнос — от 0% (при соблюдении условий программы). Сумма кредита — в соответствии с условиями программы. Срок кредита — до 30 лет. Подробности на сайте банка: https://www.sberbank.ru/ru/person/credit... Предложение действует при бронировании указанных квартир до 30.04.2026 и оформлении сделки в течение 7 дней с даты бронирования. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. Не является публичной офертой. Реклама.
          </p>
          <p className="text-white/30 text-[11px] leading-relaxed">
            Квартиры: 1-17-3 и 1-14-2. ЖК «Седьмое Небо», дом 5. Застройщик: ООО «СЗ «Монолит». ОГРН 1151831000265. Ставка 5% годовых на весь срок кредитования предоставляется при покупке однокомнатных квартир планировки 1Б (17 этаж) и 1А (14 этаж) по программам «Семейная ипотека» и «ИТ-ипотека» (при соблюдении условий программ). Банковские услуги оказывает ПАО «Сбербанк». Ставка может быть снижена за счет субсидирования застройщиком. Полная стоимость кредита (займа): от 2,631% до 13,364% годовых. Первоначальный взнос — от 20,1%. Сумма кредита — в соответствии с условиями программы. Срок кредита — до 30 лет. Подробности на сайте банка: https://www.sberbank.ru/ru/person/credit... Предложение действует при бронировании указанных квартир до 30.04.2026 и оформлении сделки в течение 7 дней с даты бронирования. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. Не является публичной офертой. Реклама.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-black">7Н</span>
            </div>
            <span className="text-white/40 text-xs">ЖК Седьмое Небо · г. Ижевск</span>
          </div>
          <p className="text-white/25 text-xs">Не является публичной офертой</p>
        </div>
      </footer>
    </div>
  );
}