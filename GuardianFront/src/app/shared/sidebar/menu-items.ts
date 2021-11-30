import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Menú',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/component/login',
    title: 'Iniciar sesión',
    icon: 'mdi mdi-login',
    class: '',
    user:["VISITANTE"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/pago',
    title: 'Suscribirse',
    icon: 'bi bi-credit-card',
    class: '',
    user:["VISITANTE"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/medicos',
    title: 'Médicos',
    icon: 'mdi mdi-account-outline',
    class: '',
    user:["ADMIN", "ADMINISTRATIVO"],
    extralink: false,
    submenu:[]
  },
  {
    path: '/component/administrativos',
    title: 'Administrativos',
    icon: 'bi bi-person-circle',
    class: '',
    user:["ADMIN", "ADMINISTRATIVO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/panel',
    title: 'Dashboard',
    icon: 'mdi mdi-calendar-clock',
    class: '',
    user:["ADMINISTRATIVO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/edificios',
    title: 'Edificios',
    icon: 'bi bi-building',
    class: '',
    user:["ADMIN"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/especialidades',
    title: 'Especialidades',
    icon: 'mdi mdi-note-plus',
    class: '',
    user:["ADMIN"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/publicarguardia',
    title: 'Asignar guardia',
    icon: 'bi bi-calendar-check-fill',
    class: '',
    user:["ADMINISTRATIVO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/servicios',
    title: 'Servicios',
    icon: 'bi bi-file-earmark-medical-fill',
    class: '',
    user:["ADMIN", "ADMINISTRATIVO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/serviciosdomicilio',
    title: 'Servicios a domicilio',
    icon: 'mdi mdi-ambulance',
    class: '',
    user:["ADMIN", "ADMINISTRATIVO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/tiposervicio',
    title: 'Tipo de servicio',
    icon: 'mdi mdi-cards-variant',
    class: '',
    user:["ADMIN"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/ubicaciones',
    title: 'Ubicaciones',
    icon: 'bi bi-house',
    class: '',
    user:["ADMIN"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/zonas',
    title: 'Zonas',
    icon: 'bi bi-geo',
    class: '',
    user:["ADMIN"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/guardiasdisponibles',
    title: 'Guardias Disponibles',
    icon: 'bi bi-journal-arrow-up',
    class: '',
    user:["MEDICO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/guardiascompletadas',
    title: 'Guardias Completadas',
    icon: 'bi bi-journal-check',
    class: '',
    user:["MEDICO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/misguardias',
    title: 'Guardias asignadas',
    icon: 'bi bi-bookmark-check-fill',
    class: '',
    user:["MEDICO"],
    extralink: false,
    submenu: [
    
    ]
  },
  {
    path: '/component/miperfil',
    title: 'Perfil',
    icon: 'bi bi-person-circle',
    class: '',
    user:["MEDICO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/mispostulaciones',
    title: 'Mis postulaciones',
    icon: 'bi bi-card-checklist',
    class: '',
    user:["MEDICO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/eventualidades',
    title: 'Eventualidades',
    icon: 'bi bi-exclamation-circle-fill',
    class: '',
    user:["MEDICO"],
    extralink: false,
    submenu: []
  },
  {
    path: '/component/card',
    title: 'Card',
    icon: 'mdi mdi-blur-radial',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard',
    title: 'Estadísticas',
    icon: 'bi bi-bar-chart-fill',
    class: '',
    user:["ADMIN","ADMINISTRATIVO"],
    extralink: false,
    submenu: []
  },
  
];
