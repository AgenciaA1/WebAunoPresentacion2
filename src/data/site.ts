// Navigation + section registry, shared by the header, LineSidebar and scroll-spy.
export const SECTIONS = [
  { id: 'nosotros', label: 'Sobre Nosotros' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'estadisticas', label: 'Estadísticas' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'contacto', label: 'Contacto' },
] as const;

export const CONTACT_EMAIL = 'contacto@auno.cl'; // TODO: confirmar

// Footer contact block. Empty values are hidden. TODO: completar con los datos reales.
export const CONTACT = {
  email: CONTACT_EMAIL,
  phone: '', // ej. '+56 9 1234 5678'
  location: 'Santiago, Chile · Remote-first',
  web: 'auno.cl',
};

// TODO: reemplazar '#' por las URLs reales de cada red
export const SOCIALS = [
  { name: 'Instagram', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'Facebook', url: '#' },
  { name: 'Behance', url: '#' },
];

// KPI figures. `null` = pending real data (renders as "—" with a pending note).
export const STATS: { value: number | null; suffix?: string; label: string; note: string }[] = [
  { value: 11, suffix: '+', label: 'Años de experiencia', note: 'Desde 2015 construyendo marcas' },
  { value: null, suffix: '+', label: 'Proyectos realizados', note: 'Branding, packaging, web y campañas' },
  { value: null, label: 'Países alcanzados', note: 'Marcas en Chile y Latinoamérica' },
  { value: 49, suffix: '+', label: 'Marcas acompañadas', note: 'Clientes que confían en A1' },
];

export const TEAM = [
  { name: 'Juan Mardones C.', role: 'Dirección Comercial', photo: '/team/juan-mardones.webp' },
  { name: 'Juan Pablo Martínez R.', role: 'Dirección Creativa General', photo: '/team/juan-pablo-martinez.webp' },
  { name: 'Felipe Aguilar L.', role: 'Director Data · Social Media', photo: '/team/felipe-aguilar.webp' },
  { name: 'Pablo Méndez R.', role: 'Diseñador Gráfico', photo: '/team/pablo-mendez.webp' },
  { name: 'Pablo Andrés P.', role: 'Diseñador Gráfico', photo: '/team/pablo-andres.webp' },
  { name: 'Pablo Martínez F.', role: 'Diseñador Gráfico', photo: '/team/pablo-martinez.webp' },
  { name: 'Agustín Ibarra E.', role: 'Diseñador Gráfico' },
  { name: 'Edith Ruiz', role: 'Community Manager', photo: '/team/edith-ruiz.webp' },
  { name: 'Álvaro Roa C.', role: 'Community Manager', photo: '/team/alvaro-roa.webp' },
  { name: 'Diego Cerda R.', role: 'Content Manager', photo: '/team/diego-cerda.webp' },
  { name: 'Tomás Roetti', role: 'Web Developer' },
] as { name: string; role: string; photo?: string }[];
