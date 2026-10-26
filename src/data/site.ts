// Navigation + section registry, shared by the header, LineSidebar and scroll-spy.
export const SECTIONS = [
  { id: 'nosotros', label: 'Sobre Nosotros' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'estadisticas', label: 'Estadísticas' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'contacto', label: 'Contacto' },
] as const;

export const CONTACT_EMAIL = 'contacto@auno.cl';

// KPI figures. `null` = pending real data (renders as "—" with a pending note).
export const STATS: { value: number | null; suffix?: string; label: string; note: string }[] = [
  { value: 11, suffix: '+', label: 'Años de experiencia', note: 'Desde 2015 construyendo marcas' },
  { value: null, suffix: '+', label: 'Proyectos realizados', note: 'Branding, packaging, web y campañas' },
  { value: null, label: 'Países alcanzados', note: 'Marcas en Chile y Latinoamérica' },
  { value: 49, suffix: '+', label: 'Marcas acompañadas', note: 'Clientes que confían en A1' },
];

export const TEAM = [
  { name: 'Juan Mardones C.', role: 'Dirección Comercial' },
  { name: 'Juan Pablo Martínez R.', role: 'Dirección Creativa General' },
  { name: 'Felipe Aguilar L.', role: 'Director Data · Social Media' },
  { name: 'Pablo Méndez R.', role: 'Diseñador Gráfico' },
  { name: 'Pablo Andrés P.', role: 'Diseñador Gráfico' },
  { name: 'Pablo Martínez F.', role: 'Diseñador Gráfico' },
  { name: 'Agustín Ibarra E.', role: 'Diseñador Gráfico' },
  { name: 'Edith Ruiz', role: 'Community Manager' },
  { name: 'Álvaro Roa C.', role: 'Community Manager' },
  { name: 'Diego Cerda R.', role: 'Content Manager' },
  { name: 'Tomás Roetti', role: 'Web Developer' },
] as { name: string; role: string; photo?: string }[];
