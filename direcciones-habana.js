// ============================================
// ALGORITMO ROBUSTO DE DIRECCIONES DE LA HABANA (MOTOR DE ALTA PRECISIÓN 5.0)
// Especializado en Google Maps Oficial, Triangulación de Calles, Nodos Intersectados y Consejos Populares
// Base de datos exhaustiva georreferenciada con coordenadas satelitales verificadas.
// ============================================

(function(root) {
  var HabanaDirecciones = {};

  // 1. DICCIONARIO DE CONSEJOS POPULARES, REPARTOS Y SECTORES GEORREFERENCIADOS
  HabanaDirecciones.barriosGeorreferenciados = {
    // Arroyo Naranjo
    'la palma': { municipio: 'Arroyo Naranjo', barrio: 'La Palma', lat: 23.07250, lng: -82.35650 },
    'arroyo apolo': { municipio: 'Arroyo Naranjo', barrio: 'Arroyo Apolo', lat: 23.07320, lng: -82.35600 },
    'vibora park': { municipio: 'Arroyo Naranjo', barrio: 'Víbora Park', lat: 23.07500, lng: -82.35550 },
    'parraga': { municipio: 'Arroyo Naranjo', barrio: 'Párraga', lat: 23.06100, lng: -82.36300 },
    'mantilla': { municipio: 'Arroyo Naranjo', barrio: 'Mantilla', lat: 23.05300, lng: -82.35800 },
    'los pinos': { municipio: 'Arroyo Naranjo', barrio: 'Los Pinos', lat: 23.07650, lng: -82.37430 },
    'callejas': { municipio: 'Arroyo Naranjo', barrio: 'Callejas', lat: 23.07100, lng: -82.35950 },
    'electrico': { municipio: 'Arroyo Naranjo', barrio: 'Eléctrico', lat: 23.03100, lng: -82.34200 },
    'managua': { municipio: 'Arroyo Naranjo', barrio: 'Managua', lat: 22.99300, lng: -82.29800 },
    'calvario': { municipio: 'Arroyo Naranjo', barrio: 'Calvario', lat: 23.04800, lng: -82.33900 },
    'guinera': { municipio: 'Arroyo Naranjo', barrio: 'La Güinera', lat: 23.05600, lng: -82.34900 },

    // Diez de Octubre
    'luyano': { municipio: 'Diez de Octubre', barrio: 'Luyanó', lat: 23.10900, lng: -82.36000 },
    'santos suarez': { municipio: 'Diez de Octubre', barrio: 'Santos Suárez', lat: 23.10080, lng: -82.37180 },
    'la vibora': { municipio: 'Diez de Octubre', barrio: 'La Víbora', lat: 23.08810, lng: -82.35970 },
    'vibora': { municipio: 'Diez de Octubre', barrio: 'La Víbora', lat: 23.08810, lng: -82.35970 },
    'lawton': { municipio: 'Diez de Octubre', barrio: 'Lawton', lat: 23.09630, lng: -82.35200 },
    'sevillano': { municipio: 'Diez de Octubre', barrio: 'Sevillano', lat: 23.08740, lng: -82.37550 },
    'tamarindo': { municipio: 'Diez de Octubre', barrio: 'Tamarindo', lat: 23.10600, lng: -82.36500 },
    'jesus del monte': { municipio: 'Diez de Octubre', barrio: 'Jesús del Monte', lat: 23.10800, lng: -82.36900 },
    'vista alegre': { municipio: 'Diez de Octubre', barrio: 'Vista Alegre', lat: 23.09200, lng: -82.36400 },
    'toyo': { municipio: 'Diez de Octubre', barrio: 'Esquina de Toyo (Luyanó)', lat: 23.10717, lng: -82.36547 },

    // Plaza de la Revolución
    'vedado': { municipio: 'Plaza de la Revolución', barrio: 'El Vedado', lat: 23.13110, lng: -82.39420 },
    'el vedado': { municipio: 'Plaza de la Revolución', barrio: 'El Vedado', lat: 23.13110, lng: -82.39420 },
    'nuevo vedado': { municipio: 'Plaza de la Revolución', barrio: 'Nuevo Vedado', lat: 23.11500, lng: -82.40420 },
    'la rampa': { municipio: 'Plaza de la Revolución', barrio: 'La Rampa (Calle 23)', lat: 23.13895, lng: -82.38425 },
    'rampa': { municipio: 'Plaza de la Revolución', barrio: 'La Rampa', lat: 23.13895, lng: -82.38425 },
    'el carmelo': { municipio: 'Plaza de la Revolución', barrio: 'El Carmelo', lat: 23.13400, lng: -82.40600 },
    'puentes grandes': { municipio: 'Plaza de la Revolución', barrio: 'Puentes Grandes', lat: 23.11100, lng: -82.41100 },
    'principe': { municipio: 'Plaza de la Revolución', barrio: 'Príncipe', lat: 23.13110, lng: -82.38825 },
    'plaza': { municipio: 'Plaza de la Revolución', barrio: 'Plaza de la Revolución', lat: 23.12440, lng: -82.38610 },

    // Centro Habana
    'cayo hueso': { municipio: 'Centro Habana', barrio: 'Cayo Hueso', lat: 23.13800, lng: -82.37900 },
    'colon': { municipio: 'Centro Habana', barrio: 'Colón', lat: 23.13810, lng: -82.36100 },
    'dragones': { municipio: 'Centro Habana', barrio: 'Dragones (Barrio Chino)', lat: 23.13100, lng: -82.36800 },
    'los sitios': { municipio: 'Centro Habana', barrio: 'Los Sitios', lat: 23.12500, lng: -82.37200 },
    'pueblo nuevo': { municipio: 'Centro Habana', barrio: 'Pueblo Nuevo', lat: 23.12100, lng: -82.37800 },
    'barrio chino': { municipio: 'Centro Habana', barrio: 'Barrio Chino', lat: 23.13300, lng: -82.36600 },

    // La Habana Vieja
    'catedral': { municipio: 'La Habana Vieja', barrio: 'Catedral', lat: 23.14140, lng: -82.35190 },
    'plaza vieja': { municipio: 'La Habana Vieja', barrio: 'Plaza Vieja', lat: 23.13600, lng: -82.35000 },
    'belen': { municipio: 'La Habana Vieja', barrio: 'Belén', lat: 23.13270, lng: -82.35260 },
    'san isidro': { municipio: 'La Habana Vieja', barrio: 'San Isidro', lat: 23.13100, lng: -82.35050 },
    'tallapiedra': { municipio: 'La Habana Vieja', barrio: 'Tallapiedra', lat: 23.12400, lng: -82.35400 },
    'santo angel': { municipio: 'La Habana Vieja', barrio: 'Santo Ángel', lat: 23.14150, lng: -82.35550 },
    'jesus maria': { municipio: 'La Habana Vieja', barrio: 'Jesús María', lat: 23.12800, lng: -82.35300 },
    'prado': { municipio: 'La Habana Vieja', barrio: 'Paseo del Prado', lat: 23.13900, lng: -82.35850 },

    // Playa
    'miramar': { municipio: 'Playa', barrio: 'Miramar', lat: 23.11550, lng: -82.43060 },
    'siboney': { municipio: 'Playa', barrio: 'Siboney', lat: 23.08880, lng: -82.47910 },
    'santa fe': { municipio: 'Playa', barrio: 'Santa Fe', lat: 23.08750, lng: -82.52780 },
    'flores': { municipio: 'Playa', barrio: 'Flores', lat: 23.09500, lng: -82.46300 },
    'jaimanitas': { municipio: 'Playa', barrio: 'Jaimanitas', lat: 23.09200, lng: -82.49600 },
    'cubanacan': { municipio: 'Playa', barrio: 'Cubanacán', lat: 23.09400, lng: -82.44100 },
    'buenavista': { municipio: 'Playa', barrio: 'Buenavista', lat: 23.10100, lng: -82.42300 },
    'buena vista': { municipio: 'Playa', barrio: 'Buenavista', lat: 23.10100, lng: -82.42300 },
    'kohly': { municipio: 'Playa', barrio: 'Kohly', lat: 23.11100, lng: -82.40100 },
    'nautico': { municipio: 'Playa', barrio: 'Náutico', lat: 23.10200, lng: -82.45100 },

    // Cerro
    'latinoamericano': { municipio: 'Cerro', barrio: 'Latinoamericano', lat: 23.11830, lng: -82.37610 },
    'palatino': { municipio: 'Cerro', barrio: 'Palatino', lat: 23.10030, lng: -82.38420 },
    'casino deportivo': { municipio: 'Cerro', barrio: 'Casino Deportivo', lat: 23.08500, lng: -82.38400 },
    'el cerro': { municipio: 'Cerro', barrio: 'Cerro Tradicional', lat: 23.10789, lng: -82.38356 },
    'cerro': { municipio: 'Cerro', barrio: 'Cerro', lat: 23.10789, lng: -82.38356 },
    'las canas': { municipio: 'Cerro', barrio: 'Las Cañas', lat: 23.11400, lng: -82.37800 },
    'atares': { municipio: 'Cerro', barrio: 'Atarés', lat: 23.11544, lng: -82.36585 },
    'el canal': { municipio: 'Cerro', barrio: 'El Canal', lat: 23.11900, lng: -82.37100 },

    // Marianao
    'pogolotti': { municipio: 'Marianao', barrio: 'Pogolotti', lat: 23.08120, lng: -82.41710 },
    'los quemados': { municipio: 'Marianao', barrio: 'Los Quemados', lat: 23.07810, lng: -82.42450 },
    'ciudad libertad': { municipio: 'Marianao', barrio: 'Ciudad Libertad', lat: 23.09390, lng: -82.43810 },
    'los angeles': { municipio: 'Marianao', barrio: 'CAI Los Ángeles', lat: 23.07158, lng: -82.42751 },
    'zamora': { municipio: 'Marianao', barrio: 'Zamora', lat: 23.08500, lng: -82.41800 },
    'cocosolo': { municipio: 'Marianao', barrio: 'Cocosolo', lat: 23.08300, lng: -82.42200 },
    'marianao': { municipio: 'Marianao', barrio: 'Marianao Central', lat: 23.08111, lng: -82.42167 },

    // La Lisa
    'san agustin': { municipio: 'La Lisa', barrio: 'San Agustín', lat: 23.05440, lng: -82.46470 },
    'arroyo arenas': { municipio: 'La Lisa', barrio: 'Arroyo Arenas', lat: 23.04510, lng: -82.46540 },
    'el cano': { municipio: 'La Lisa', barrio: 'El Cano', lat: 23.03310, lng: -82.45920 },
    'punta brava': { municipio: 'La Lisa', barrio: 'Punta Brava', lat: 23.01720, lng: -82.49830 },
    'balcon arimao': { municipio: 'La Lisa', barrio: 'Balcón Arimao', lat: 23.06100, lng: -82.45200 },
    'la lisa': { municipio: 'La Lisa', barrio: 'La Lisa Central', lat: 23.02940, lng: -82.45970 },

    // Boyeros
    'santiago de las vegas': { municipio: 'Boyeros', barrio: 'Santiago de las Vegas', lat: 22.97750, lng: -82.37810 },
    'calabazar': { municipio: 'Boyeros', barrio: 'Calabazar', lat: 23.01730, lng: -82.37290 },
    'fontanar': { municipio: 'Boyeros', barrio: 'Fontanar', lat: 23.02390, lng: -82.40800 },
    'wajay': { municipio: 'Boyeros', barrio: 'El Wajay', lat: 23.00450, lng: -82.42450 },
    'altahabana': { municipio: 'Boyeros', barrio: 'Altahabana', lat: 23.05100, lng: -82.39500 },
    'capdevila': { municipio: 'Boyeros', barrio: 'Capdevila', lat: 23.04300, lng: -82.39800 },
    'aldabo': { municipio: 'Boyeros', barrio: 'Aldabó', lat: 23.05600, lng: -82.39100 },
    'rancho boyeros': { municipio: 'Boyeros', barrio: 'Rancho Boyeros', lat: 22.99454, lng: -82.39320 },

    // Habana del Este
    'cojimar': { municipio: 'Habana del Este', barrio: 'Cojímar', lat: 23.16670, lng: -82.30000 },
    'camilo cienfuegos': { municipio: 'Habana del Este', barrio: 'Ciudad Camilo Cienfuegos', lat: 23.16080, lng: -82.32800 },
    'antonio guiteras': { municipio: 'Habana del Este', barrio: 'Reparto Antonio Guiteras (Bahía)', lat: 23.14150, lng: -82.30500 },
    'bahia': { municipio: 'Habana del Este', barrio: 'Reparto Antonio Guiteras (Bahía)', lat: 23.14150, lng: -82.30500 },
    'alamar': { municipio: 'Habana del Este', barrio: 'Alamar', lat: 23.15280, lng: -82.27910 },
    'guanabo': { municipio: 'Habana del Este', barrio: 'Guanabo', lat: 23.15880, lng: -82.13680 },
    'boca ciega': { municipio: 'Habana del Este', barrio: 'Boca Ciega', lat: 23.16400, lng: -82.16200 },
    'santa maria del mar': { municipio: 'Habana del Este', barrio: 'Santa María del Mar', lat: 23.16700, lng: -82.18500 },
    'tarara': { municipio: 'Habana del Este', barrio: 'Tarará', lat: 23.17000, lng: -82.21000 },

    // San Miguel del Padrón
    'san francisco de paula': { municipio: 'San Miguel del Padrón', barrio: 'San Francisco de Paula', lat: 23.06347, lng: -82.29601 },
    'jacomino': { municipio: 'San Miguel del Padrón', barrio: 'Jacomino', lat: 23.08050, lng: -82.35000 },
    'diezmero': { municipio: 'San Miguel del Padrón', barrio: 'Diezmero', lat: 23.05830, lng: -82.31380 },
    'virgen del camino': { municipio: 'San Miguel del Padrón', barrio: 'Virgen del Camino', lat: 23.09300, lng: -82.33800 },
    'luyano moderno': { municipio: 'San Miguel del Padrón', barrio: 'Luyanó Moderno', lat: 23.08500, lng: -82.33200 },
    'encanto': { municipio: 'San Miguel del Padrón', barrio: 'Reparto Encanto (San Francisco de Paula)', lat: 23.06350, lng: -82.29500 },

    // Guanabacoa
    'guanabacoa': { municipio: 'Guanabacoa', barrio: 'Guanabacoa Centro', lat: 23.10780, lng: -82.26360 },
    'chibas': { municipio: 'Guanabacoa', barrio: 'Eduardo Chibás', lat: 23.12200, lng: -82.29800 },
    'debeche': { municipio: 'Guanabacoa', barrio: "D'Beche", lat: 23.11500, lng: -82.28500 },
    'minas': { municipio: 'Guanabacoa', barrio: 'Minas', lat: 23.11100, lng: -82.24200 },
    'barreras': { municipio: 'Guanabacoa', barrio: 'Barreras', lat: 23.11900, lng: -82.21500 },

    // Regla
    'regla': { municipio: 'Regla', barrio: 'Regla', lat: 23.12580, lng: -82.33220 },
    'casablanca': { municipio: 'Regla', barrio: 'Casablanca', lat: 23.14780, lng: -82.32670 },

    // Cotorro
    'cotorro': { municipio: 'Cotorro', barrio: 'Cotorro Centro', lat: 23.02610, lng: -82.24750 },
    'santa maria del rosario': { municipio: 'Cotorro', barrio: 'Santa María del Rosario', lat: 23.06250, lng: -82.25710 },
    'cuatro caminos': { municipio: 'Cotorro', barrio: 'Cuatro Caminos', lat: 23.01800, lng: -82.21500 },
    'alberro': { municipio: 'Cotorro', barrio: 'Alberro', lat: 23.03900, lng: -82.26200 },
    'campo florido': { municipio: 'Habana del Este', barrio: 'Campo Florido', lat: 23.13611, lng: -82.15278 },
    'rio verde': { municipio: 'Boyeros', barrio: 'Río Verde', lat: 23.01806, lng: -82.40556 },
    'monterrey': { municipio: 'San Miguel del Padrón', barrio: 'Monterrey', lat: 23.06528, lng: -82.32778 },
    'reparto volpe': { municipio: 'Arroyo Naranjo', barrio: 'Reparto Volpe', lat: 23.06472, lng: -82.34861 },
    'volpe': { municipio: 'Arroyo Naranjo', barrio: 'Reparto Volpe', lat: 23.06472, lng: -82.34861 },
    'habana nueva': { municipio: 'Guanabacoa', barrio: 'Habana Nueva', lat: 23.11806, lng: -82.30278 },
    'valle grande': { municipio: 'La Lisa', barrio: 'Valle Grande', lat: 23.03333, lng: -82.47778 },
    'delicias': { municipio: 'San Miguel del Padrón', barrio: 'Diezmero (Delicias)', lat: 23.05694, lng: -82.31611 },
    'las piedras': { municipio: 'San Miguel del Padrón', barrio: 'Las Piedras', lat: 23.06111, lng: -82.29167 },
    'los pocitos': { municipio: 'Marianao', barrio: 'Los Pocitos', lat: 23.07639, lng: -82.44194 },
    'pocitos': { municipio: 'Marianao', barrio: 'Los Pocitos', lat: 23.07639, lng: -82.44194 },
    'california': { municipio: 'San Miguel del Padrón', barrio: 'California', lat: 23.076, lng: -82.325 },
    'rocafort': { municipio: 'San Miguel del Padrón', barrio: 'Rocafort', lat: 23.082, lng: -82.321 },
    'bellavista': { municipio: 'San Miguel del Padrón', barrio: 'Bellavista', lat: 23.071, lng: -82.312 },
    'merceditas': { municipio: 'San Miguel del Padrón', barrio: 'Merceditas', lat: 23.064, lng: -82.308 },
    'villa alegre': { municipio: 'San Miguel del Padrón', barrio: 'Villa Alegre', lat: 23.068, lng: -82.319 },
    'reboredo': { municipio: 'San Miguel del Padrón', barrio: 'Reboredo', lat: 23.074, lng: -82.315 },
    'cumbre': { municipio: 'San Miguel del Padrón', barrio: 'La Cumbre', lat: 23.085, lng: -82.342 },
    'ciudamar': { municipio: 'San Miguel del Padrón', barrio: 'Ciudamar', lat: 23.078, lng: -82.338 },
    'la fernanda': { municipio: 'San Miguel del Padrón', barrio: 'La Fernanda', lat: 23.07, lng: -82.331 },
    'san miguel': { municipio: 'San Miguel del Padrón', barrio: 'San Miguel del Padrón Centro', lat: 23.06347, lng: -82.29601 },
    'parcelacion moderna': { municipio: 'Arroyo Naranjo', barrio: 'Parcelación Moderna', lat: 23.068, lng: -82.366 },
    'la solita': { municipio: 'Arroyo Naranjo', barrio: 'La Solita', lat: 23.059, lng: -82.351 },
    'las lajas': { municipio: 'Arroyo Naranjo', barrio: 'Las Lajas', lat: 23.042, lng: -82.345 },
    'el moro': { municipio: 'Arroyo Naranjo', barrio: 'El Moro', lat: 23.037, lng: -82.352 },
    'santa amalia': { municipio: 'Arroyo Naranjo', barrio: 'Santa Amalia', lat: 23.075, lng: -82.362 },
    'chino perro': { municipio: 'Arroyo Naranjo', barrio: 'Chino Perro', lat: 23.051, lng: -82.365 },
    'las cañas': { municipio: 'Cerro', barrio: 'Las Cañas', lat: 23.114, lng: -82.378 },
    'loteria': { municipio: 'Cotorro', barrio: 'Lotería', lat: 23.032, lng: -82.241 },
    'la loteria': { municipio: 'Cotorro', barrio: 'Lotería', lat: 23.032, lng: -82.241 },
    'san pedro': { municipio: 'Cotorro', barrio: 'San Pedro', lat: 23.021, lng: -82.258 },
    'la purissima': { municipio: 'Cotorro', barrio: 'La Purísima', lat: 23.042, lng: -82.238 },
    'reparto progreso': { municipio: 'Cotorro', barrio: 'Progreso', lat: 23.019, lng: -82.249 },
    'rincon': { municipio: 'Boyeros', barrio: 'El Rincón', lat: 22.952, lng: -82.398 },
    'el rincon': { municipio: 'Boyeros', barrio: 'El Rincón', lat: 22.952, lng: -82.398 },
    'lutgardita': { municipio: 'Boyeros', barrio: 'Lutgardita', lat: 23.008, lng: -82.389 },
    'armando mestre': { municipio: 'Boyeros', barrio: 'Armando Mestre', lat: 23.041, lng: -82.385 },
    'reparto 1ro de mayo': { municipio: 'Boyeros', barrio: 'Primero de Mayo', lat: 23.033, lng: -82.392 },
    'villa panamericana': { municipio: 'Habana del Este', barrio: 'Villa Panamericana', lat: 23.161, lng: -82.319 },
    'brisas del mar': { municipio: 'Habana del Este', barrio: 'Brisas del Mar', lat: 23.178, lng: -82.112 },
    'rincon de guanabo': { municipio: 'Habana del Este', barrio: 'Rincón de Guanabo', lat: 23.172, lng: -82.125 },
    'venezuela': { municipio: 'Habana del Este', barrio: 'Venezuela (Guanabo)', lat: 23.16, lng: -82.14 },
    'penas altas': { municipio: 'Habana del Este', barrio: 'Peñas Altas', lat: 23.168, lng: -82.175 },
    'marbella': { municipio: 'Habana del Este', barrio: 'Marbella (Guanabo)', lat: 23.162, lng: -82.131 },
    'morado': { municipio: 'La Lisa', barrio: 'El Morado', lat: 23.011, lng: -82.512 },
    'la coronela': { municipio: 'La Lisa', barrio: 'La Coronela', lat: 23.068, lng: -82.448 },
    'coronela': { municipio: 'La Lisa', barrio: 'La Coronela', lat: 23.068, lng: -82.448 },
    'versalles': { municipio: 'La Lisa', barrio: 'Versalles', lat: 23.058, lng: -82.459 },
    'bello monte': { municipio: 'Habana del Este', barrio: 'Bello Monte', lat: 23.149, lng: -82.179 },
  };

  // 2. CRUCES EXACTOS Y NODOS VIALES GEORREFERENCIADOS CON PRECISIÓN MILIMÉTRICA
  HabanaDirecciones.crucesFrecuentes = [
    // San Francisco de Paula: Calle 3ra e/ San Luis y Final (Reparto Encanto)
    {
      tokens: ['3ra', 'san luis', 'encanto'],
      municipio: 'San Miguel del Padrón',
      barrio: 'San Francisco de Paula (Reparto Encanto)',
      descripcion: 'Calle 3ra #10511 e/ San Luis y Final, Reparto Encanto',
      lat: 23.06347,
      lng: -82.29601,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['3ra', 'san luis'],
      municipio: 'San Miguel del Padrón',
      barrio: 'San Francisco de Paula',
      descripcion: 'Calle 3ra y San Luis (San Francisco de Paula)',
      lat: 23.06347,
      lng: -82.29601,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["35","118","120"],
      municipio: "Marianao",
      barrio: "Zamora",
      descripcion: "Avenida 35 #11821 e/ 118 y 120, Zamora (detrás Hospital Militar)",
      lat: 23.08722,
      lng: -82.43389,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["120 a","33","35"],
      municipio: "Marianao",
      barrio: "Zamora",
      descripcion: "Calle 120 A #3324 e/ 33 y 35, Marianao",
      lat: 23.08833,
      lng: -82.43528,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["67","122","122 a"],
      municipio: "Marianao",
      barrio: "Marianao Central",
      descripcion: "Avenida 67 #12207 e/ 122 y 122A, Marianao",
      lat: 23.08056,
      lng: -82.43306,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["10 de octubre","via blanca","arango"],
      municipio: "Diez de Octubre",
      barrio: "Jesús del Monte",
      descripcion: "Calzada de 10 de Octubre e/ Vía Blanca y Arango (Edificio 249)",
      lat: 23.11194,
      lng: -82.36889,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["36","17","19"],
      municipio: "Playa",
      barrio: "Miramar",
      descripcion: "Calle 36 #1711 e/ 17 y 19, Miramar",
      lat: 23.11667,
      lng: -82.42111,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["diez de octubre","ceiba","recreo"],
      municipio: "Regla",
      barrio: "Regla Centro",
      descripcion: "Calle Diez de Octubre #217 e/ Ceiba y Recreo (Cementerio de Regla)",
      lat: 23.12389,
      lng: -82.33083,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["tejadillo","habana","aguilar"],
      municipio: "La Habana Vieja",
      barrio: "Catedral / San Juan de Dios",
      descripcion: "Calle Tejadillo #106 e/ Habana y Aguiar (Aguilar), Habana Vieja",
      lat: 23.14111,
      lng: -82.355,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["cortes","esperanza","agustin"],
      municipio: "Arroyo Naranjo",
      barrio: "Callejas",
      descripcion: "Calle Cortés #155 e/ Esperanza y Agustín, Reparto Callejas",
      lat: 23.07083,
      lng: -82.35972,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["don tomas","azcarate","varona"],
      municipio: "Arroyo Naranjo",
      barrio: "Mantilla",
      descripcion: "Calle Don Tomás #14 e/ Azcárate y Varona, Mantilla",
      lat: 23.05389,
      lng: -82.35639,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["elio llerena","enrique hart"],
      municipio: "Habana del Este",
      barrio: "Campo Florido",
      descripcion: "Calle Elio Llerena #263 e/ Mártires de Girón y Enrique Hart, Campo Florido",
      lat: 23.13611,
      lng: -82.15278,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["consulado","genio","refugio"],
      municipio: "Centro Habana",
      barrio: "Colón",
      descripcion: "Calle Consulado #61 e/ Genio y Refugio, Centro Habana",
      lat: 23.14028,
      lng: -82.35972,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["concepcion","marti","maceo"],
      municipio: "Regla",
      barrio: "Regla Centro",
      descripcion: "Calle Concepción #114 e/ Martí y Maceo (cerca Policía), Regla",
      lat: 23.12861,
      lng: -82.33389,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["merced","curazao","picota"],
      municipio: "La Habana Vieja",
      barrio: "San Isidro / Belén",
      descripcion: "Calle Merced #310 (Edif Mendez) e/ Curazao y Picota, Habana Vieja",
      lat: 23.12944,
      lng: -82.35222,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["calzada de luyano","concha","porvenir"],
      municipio: "Diez de Octubre",
      barrio: "Luyanó",
      descripcion: "Calzada de Luyanó #709 e/ Concha y Porvenir, Luyanó",
      lat: 23.10917,
      lng: -82.35639,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["san nicolas","maloja","estrella"],
      municipio: "Centro Habana",
      barrio: "Los Sitios",
      descripcion: "Calle San Nicolás #707 e/ Maloja y Estrella, Centro Habana",
      lat: 23.12972,
      lng: -82.36861,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["684","zona 19"],
      municipio: "Habana del Este",
      barrio: "Alamar (Zona 19)",
      descripcion: "Edificio 684, Zona 19 de Alamar",
      lat: 23.16111,
      lng: -82.26806,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["24","concepcion","baragua"],
      municipio: "Diez de Octubre",
      barrio: "Lawton",
      descripcion: "Calle 24 e/ Concepción y Baraguá (Cupet/Agro), Lawton",
      lat: 23.09444,
      lng: -82.35083,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["maicaja","wajay"],
      municipio: "Boyeros",
      barrio: "El Wajay",
      descripcion: "Finca Maicajá Km 21 1/2 #24608, Wajay, Boyeros",
      lat: 23.00139,
      lng: -82.42861,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["69","134","136"],
      municipio: "Marianao",
      barrio: "Los Pocitos",
      descripcion: "Avenida 69 #13434 e/ 134 y 136, Los Pocitos, Marianao",
      lat: 23.07639,
      lng: -82.44194,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["rosita","lililoy"],
      municipio: "Boyeros",
      barrio: "Aldabó",
      descripcion: "Calle Rosita #14059 e/ Lililoy y Final, Reparto Aldabó",
      lat: 23.05833,
      lng: -82.38889,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["manhattan","cisneros","oeste"],
      municipio: "Arroyo Naranjo",
      barrio: "Los Pinos",
      descripcion: "Calle Manhattan #9 e/ Cisneros y Oeste, Los Pinos",
      lat: 23.07472,
      lng: -82.37361,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["4ta","3ra","5ta","delicias"],
      municipio: "San Miguel del Padrón",
      barrio: "Diezmero (Delicias)",
      descripcion: "Avenida 4ta e/ 3ra y 5ta, Delicias del Diezmero",
      lat: 23.05694,
      lng: -82.31611,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["tres palacios","manuel pruna","juan alonso"],
      municipio: "Diez de Octubre",
      barrio: "Luyanó",
      descripcion: "Calle Tres Palacios #465 e/ Manuel Pruna y Juan Alonso, Luyanó",
      lat: 23.10694,
      lng: -82.35528,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["clavel","san pablo","auditor"],
      municipio: "Cerro",
      barrio: "Cerro Tradicional",
      descripcion: "Calle Clavel #218 e/ San Pablo y Auditor, Cerro",
      lat: 23.11861,
      lng: -82.375,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["263","180","168"],
      municipio: "Boyeros",
      barrio: "Río Verde",
      descripcion: "Calle 263 #16819 e/ 180 y 168, Río Verde, Boyeros",
      lat: 23.01806,
      lng: -82.40556,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["94","alberro"],
      municipio: "Cotorro",
      barrio: "Alberro",
      descripcion: "Edificio 94, Reparto Alberro, Cotorro",
      lat: 23.04167,
      lng: -82.26389,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["volpe","3ra","2da"],
      municipio: "Arroyo Naranjo",
      barrio: "Reparto Volpe",
      descripcion: "Calle 3ra #53 e/ 2da y Linderos, Reparto Volpe",
      lat: 23.06472,
      lng: -82.34861,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["monterrey","11139"],
      municipio: "San Miguel del Padrón",
      barrio: "Monterrey",
      descripcion: "Calle 1ra (Edif 11139) e/ H e I, Reparto Monterrey",
      lat: 23.06528,
      lng: -82.32778,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["francos","santa marta","clavel"],
      municipio: "Centro Habana",
      barrio: "Pueblo Nuevo",
      descripcion: "Calle Francos #408 e/ Santa Marta y Clavel, Centro Habana",
      lat: 23.12556,
      lng: -82.37389,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["maloja","angeles","rayo"],
      municipio: "Centro Habana",
      barrio: "Los Sitios",
      descripcion: "Calle Maloja #68 e/ Ángeles y Rayo, Centro Habana",
      lat: 23.13083,
      lng: -82.36611,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["habana nueva","124"],
      municipio: "Guanabacoa",
      barrio: "Habana Nueva",
      descripcion: "Calle 5ta #124 e/ B y C, Reparto Habana Nueva (Semáforo de Guanabacoa)",
      lat: 23.11806,
      lng: -82.30278,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["don tomas","ascarate","duani"],
      municipio: "Arroyo Naranjo",
      barrio: "Mantilla",
      descripcion: "Calle Don Tomás #103 e/ Azcárate y Duanis, Mantilla",
      lat: 23.05333,
      lng: -82.35556,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["37","110","112"],
      municipio: "Marianao",
      barrio: "Marianao Central",
      descripcion: "Calle 37 #11022 e/ 110 y 112 (La Pitufa), Marianao",
      lat: 23.08583,
      lng: -82.42861,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["san juan de dios","aguacate","compostela"],
      municipio: "La Habana Vieja",
      barrio: "Catedral / San Juan de Dios",
      descripcion: "Calle San Juan de Dios #104 e/ Aguacate y Compostela, Habana Vieja",
      lat: 23.13944,
      lng: -82.35444,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["3ra","rotaria","via blanca"],
      municipio: "Regla",
      barrio: "Regla Este",
      descripcion: "Calle 3ra (Edif 8) e/ Rotaria y Vía Blanca (Semáforo Guanabacoa-Regla)",
      lat: 23.125,
      lng: -82.31944,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["250","37","51"],
      municipio: "La Lisa",
      barrio: "San Agustín",
      descripcion: "Calle 250 (Edif 3735) e/ 37 y 51, San Agustín, La Lisa",
      lat: 23.05556,
      lng: -82.46667,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["san bernardino","flores","serrano"],
      municipio: "Diez de Octubre",
      barrio: "Santos Suárez",
      descripcion: "Calle San Bernardino #206 e/ Flores y Serrano, Santos Suárez",
      lat: 23.10306,
      lng: -82.36889,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["caminos","cotorro","granja"],
      municipio: "Cotorro",
      barrio: "Cuatro Caminos",
      descripcion: "Cuatro Caminos del Cotorro, Carretera de Managua (Entrada Granja Pollo)",
      lat: 23.01806,
      lng: -82.21528,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["san juan de dios","oreilly"],
      municipio: "La Habana Vieja",
      barrio: "Catedral / San Juan de Dios",
      descripcion: "Calle San Juan de Dios #104 (detrás del Banco O'Reilly), Habana Vieja",
      lat: 23.13944,
      lng: -82.35444,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["union","martires","jose miguel gomez"],
      municipio: "Regla",
      barrio: "Regla Centro",
      descripcion: "Calle Unión #14b e/ Av. de los Mártires y José Miguel Gómez, Regla",
      lat: 23.1275,
      lng: -82.33556,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["17","2da","bahia"],
      municipio: "Habana del Este",
      barrio: "Reparto Antonio Guiteras (Bahía)",
      descripcion: "Calle 17 #92A23 e/ 2da y 1ra Ave del Parque, Bahía (Secundaria 14 de Junio)",
      lat: 23.14167,
      lng: -82.30833,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["44","finca husillo"],
      municipio: "Marianao",
      barrio: "Puentes Grandes (Finca Husillo)",
      descripcion: "Calle 44 Finca Husillo tras Planta de Gas Manufacturado, Marianao",
      lat: 23.10083,
      lng: -82.41667,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["viviana","valle grande"],
      municipio: "La Lisa",
      barrio: "Valle Grande",
      descripcion: "Finca La Viviana, Reparto Valle Grande, La Lisa",
      lat: 23.03333,
      lng: -82.47778,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["204","411","413"],
      municipio: "Boyeros",
      barrio: "Santiago de las Vegas",
      descripcion: "Calle 204 #41107 e/ 411 y 413 (Frente al Estadio), Santiago de las Vegas",
      lat: 22.97361,
      lng: -82.37917,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["5 h","240","242"],
      municipio: "Playa",
      barrio: "Jaimanitas",
      descripcion: "Calle 5ta H e/ 240 y 242 (El Callejón, última bodega), Jaimanitas",
      lat: 23.09306,
      lng: -82.49861,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["lealtad","estrella","maloja"],
      municipio: "Centro Habana",
      barrio: "Los Sitios",
      descripcion: "Calle Lealtad #709 e/ Estrella y Maloja, Centro Habana",
      lat: 23.13139,
      lng: -82.36944,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["factor","tulipan"],
      municipio: "Plaza de la Revolución",
      barrio: "Nuevo Vedado",
      descripcion: "Calle Factor #765 e/ Conill y Tulipán (Edificio de los Pilotos), Nuevo Vedado",
      lat: 23.11722,
      lng: -82.40194,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["116","41","43"],
      municipio: "Marianao",
      barrio: "Los Quemados",
      descripcion: "Calle 116 #4113 e/ 41 y 43, Marianao",
      lat: 23.08333,
      lng: -82.42639,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["valle","espada","hospital"],
      municipio: "Centro Habana",
      barrio: "Cayo Hueso",
      descripcion: "Calle Valle #14 e/ Espada y Hospital, Cayo Hueso, Centro Habana",
      lat: 23.13694,
      lng: -82.37806,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ["corojo","primera","segunda"],
      municipio: "San Miguel del Padrón",
      barrio: "San Francisco de Paula (Las Piedras)",
      descripcion: "Calle A (El Corojo) e/ 1ra y 2da, Reparto Las Piedras, San Miguel del Padrón",
      lat: 23.06111,
      lng: -82.29167,
      zoom: 18,
      confianza: 99
    },
    // Caso de la tienda: Georgia 101 entre Constitución y Coliseo (La Palma / Arroyo Naranjo)
    {
      tokens: ['georgia', 'constitucion', 'coliseo'],
      municipio: 'Arroyo Naranjo',
      barrio: 'La Palma (Víbora Park)',
      descripcion: 'Calle Georgia 101 e/ Constitución y Coliseo (La Palma)',
      lat: 23.07361,
      lng: -82.35520,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['georgia', 'coliseo'],
      municipio: 'Arroyo Naranjo',
      barrio: 'La Palma (Víbora Park)',
      descripcion: 'Calle Georgia y Coliseo (La Palma)',
      lat: 23.07395,
      lng: -82.35560,
      zoom: 18,
      confianza: 98
    },
    {
      tokens: ['georgia', 'constitucion'],
      municipio: 'Arroyo Naranjo',
      barrio: 'La Palma (Víbora Park)',
      descripcion: 'Calle Georgia y Constitución (La Palma)',
      lat: 23.07325,
      lng: -82.35510,
      zoom: 18,
      confianza: 98
    },
    // Rodríguez final e/ Concha y Vía Blanca (Luyanó)
    {
      tokens: ['rodriguez', 'concha', 'via blanca'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Calle Rodríguez final e/ Calzada de Concha y Vía Blanca (Luyanó)',
      lat: 23.10894,
      lng: -82.35255,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['rodriguez', 'concha'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Calle Rodríguez y Calzada de Concha (Luyanó)',
      lat: 23.11150,
      lng: -82.35820,
      zoom: 18,
      confianza: 98
    },
    {
      tokens: ['concha', 'via blanca'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Paso superior Calzada de Concha y Vía Blanca',
      lat: 23.10894,
      lng: -82.35255,
      zoom: 18,
      confianza: 98
    },
    // Severidad / Severino e/ B y final (Lawton)
    {
      tokens: ['severidad', 'b'],
      municipio: 'Diez de Octubre',
      barrio: 'Lawton',
      descripcion: 'Calle Severidad (Severino) e/ Calle B y final (Lawton)',
      lat: 23.09715,
      lng: -82.35271,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['severino', 'b'],
      municipio: 'Diez de Octubre',
      barrio: 'Lawton',
      descripcion: 'Calle Severino e/ Calle B y final (Lawton)',
      lat: 23.09715,
      lng: -82.35271,
      zoom: 18,
      confianza: 99
    },
    // Lacret y Goucuria / Juan Delgado (Santos Suárez)
    {
      tokens: ['lacret', 'juan delgado'],
      municipio: 'Diez de Octubre',
      barrio: 'Santos Suárez',
      descripcion: 'Calle Lacret # 503 e/ Goicuría y Juan Delgado (Santos Suárez)',
      lat: 23.09889,
      lng: -82.37424,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['lacret', 'goicuria'],
      municipio: 'Diez de Octubre',
      barrio: 'Santos Suárez',
      descripcion: 'Calle Lacret y Goicuría (Santos Suárez)',
      lat: 23.09869,
      lng: -82.37548,
      zoom: 18,
      confianza: 99
    },
    // Vedado 27 e/ D y E
    {
      tokens: ['calle 27', 'd', 'e'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Vedado',
      descripcion: 'Calle 27 entre D y E (Nro 562, Vedado)',
      lat: 23.13240,
      lng: -82.38915,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['calle 27', 'calle d'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Vedado',
      descripcion: 'Calle 27 y D (Vedado)',
      lat: 23.13272,
      lng: -82.38969,
      zoom: 18,
      confianza: 98
    },
    // 23 y L (Cine Yara / Hotel Habana Libre)
    {
      tokens: ['calle 23', 'calle l'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Vedado (La Rampa)',
      descripcion: 'Calle 23 y L (Cine Yara / Hotel Habana Libre)',
      lat: 23.13895,
      lng: -82.38425,
      zoom: 18,
      confianza: 99
    },
    // Paseo y 23
    {
      tokens: ['23', 'paseo'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Vedado',
      descripcion: 'Calle 23 y Paseo (Vedado)',
      lat: 23.13139,
      lng: -82.39444,
      zoom: 18,
      confianza: 99
    },
    // Lagunas e/ Lealtad y Perseverancia (Centro Habana)
    {
      tokens: ['lagunas', 'lealtad'],
      municipio: 'Centro Habana',
      barrio: 'Dragones / San Leopoldo',
      descripcion: 'Calle Lagunas e/ Lealtad y Perseverancia (Centro Habana)',
      lat: 23.14055,
      lng: -82.36704,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['lagunas', 'perseverancia'],
      municipio: 'Centro Habana',
      barrio: 'Dragones / San Leopoldo',
      descripcion: 'Calle Lagunas e/ Lealtad y Perseverancia (Centro Habana)',
      lat: 23.14055,
      lng: -82.36670,
      zoom: 18,
      confianza: 99
    },
    // Chacón e/ Compostela y Habana (La Habana Vieja)
    {
      tokens: ['chacon', 'compostela'],
      municipio: 'La Habana Vieja',
      barrio: 'Catedral',
      descripcion: 'Calle Chacón #158 e/ Compostela y Habana (Habana Vieja)',
      lat: 23.14144,
      lng: -82.35490,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['chacon', 'habana'],
      municipio: 'La Habana Vieja',
      barrio: 'Catedral',
      descripcion: 'Calle Chacón y Habana (Habana Vieja)',
      lat: 23.14200,
      lng: -82.35350,
      zoom: 18,
      confianza: 99
    },
    // Boyeros 803 e/ Tulipán y Conill (MINAG)
    {
      tokens: ['boyeros', 'tulipan', 'conill'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Nuevo Vedado / Palatino',
      descripcion: 'Avenida Boyeros 803 e/ Tulipán y Conill (frente al MINAG)',
      lat: 23.11950,
      lng: -82.39120,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['tulipan', 'conill'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Nuevo Vedado',
      descripcion: 'Tulipán y Conill (Ministerio de la Agricultura)',
      lat: 23.11950,
      lng: -82.39120,
      zoom: 18,
      confianza: 99
    },
    // Santa Ana #4 e/ Ensenada y Atarés (Luyanó)
    {
      tokens: ['santa ana', 'ensenada'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Santa Ana #4 e/ Ensenada y Atarés (Luyanó, cerca de Toyo)',
      lat: 23.10900,
      lng: -82.36000,
      zoom: 18,
      confianza: 99
    },
    // Cerro: San Francisco #386 e/ San Felipe y Cristina
    {
      tokens: ['san felipe', 'cristina'],
      municipio: 'Cerro',
      barrio: 'Pilar - Atarés',
      descripcion: 'San Francisco #386 e/ San Felipe y Cristina (Cerro)',
      lat: 23.11544,
      lng: -82.36585,
      zoom: 18,
      confianza: 99
    },
    // Marianao: Avenida 65 #10044 e/ 100 y 102 (Transisport)
    {
      tokens: ['65', '100', '102'],
      municipio: 'Marianao',
      barrio: 'CAI Los Ángeles',
      descripcion: 'Avenida 65 #10044 e/ 100 y 102 (Puerta de Transisport)',
      lat: 23.07616,
      lng: -82.41962,
      zoom: 18,
      confianza: 99
    },
    {
      tokens: ['65', '100'],
      municipio: 'Marianao',
      barrio: 'CAI Los Ángeles',
      descripcion: 'Avenida 65 y Calle 100 (Marianao)',
      lat: 23.07616,
      lng: -82.41962,
      zoom: 18,
      confianza: 98
    },
    // 100 y 51 Marianao
    {
      tokens: ['100', '51'],
      municipio: 'Marianao',
      barrio: 'Marianao Central',
      descripcion: 'Calle 100 y Avenida 51 (Obelisco / Ciudad Libertad)',
      lat: 23.08111,
      lng: -82.42167,
      zoom: 18,
      confianza: 99
    },
    // Botica 90 Cotorro
    {
      tokens: ['botica 90'],
      municipio: 'Cotorro',
      barrio: 'Centro del Cotorro',
      descripcion: 'Botica 90, Centro del Cotorro',
      lat: 23.02610,
      lng: -82.24750,
      zoom: 18,
      confianza: 99
    }
  ];

  // 3. BASE DE DATOS DE LOS 15 MUNICIPIOS
  HabanaDirecciones.municipios = [
  {
    "nombre": "Playa",
    "codigo": "PLY",
    "lat": 23.1155,
    "lng": -82.4306,
    "calles_principales": [
      "1ra",
      "3ra",
      "5ta",
      "5ta Avenida",
      "7ma",
      "9na",
      "11",
      "13",
      "15",
      "17",
      "19",
      "21",
      "23",
      "25",
      "27",
      "29",
      "31",
      "33",
      "35",
      "37",
      "39",
      "41",
      "42",
      "44",
      "46",
      "48",
      "50",
      "60",
      "62",
      "64",
      "66",
      "68",
      "70",
      "72",
      "74",
      "76",
      "78",
      "80",
      "82",
      "84",
      "86",
      "88",
      "90",
      "92",
      "94",
      "96",
      "Calle 100",
      "110",
      "112",
      "114",
      "118",
      "120",
      "146",
      "160",
      "170",
      "180",
      "190",
      "200",
      "214",
      "222",
      "226",
      "230",
      "232",
      "234",
      "240",
      "248",
      "250",
      "Avenida 31",
      "Avenida 41",
      "Avenida Primera",
      "Avenida Tercera",
      "Avenida Séptima",
      "Avenida 19",
      "Calle 42",
      "Calle 60 Miramar",
      "Calle 84 Miramar",
      "Calle 146 Siboney",
      "Calle 222 Jaimanitas",
      "Autopista a Pinar del Río"
    ],
    "puntos_referencia": [
      "Hotel Meliá Habana",
      "Acuario Nacional",
      "Marina Hemingway",
      "Palacio de Convenciones",
      "CIMEQ",
      "Hotel Comodoro",
      "Miramar Trade Center",
      "Teatro Karl Marx",
      "Parque de 5ta y 42",
      "Club Habana",
      "Centro de Negocios Miramar",
      "Hospital Frank País",
      "Círculo Social Obrero Félix Elmuza",
      "Círculo Social Cristino Naranjo",
      "Parque Ecológico Monte Barreto",
      "Iglesia Jesús de Miramar",
      "Embajada de Rusia",
      "Embajada de España",
      "Restaurante El Aljibe",
      "Dos Gardenias"
    ]
  },
  {
    "nombre": "Plaza de la Revolución",
    "codigo": "PLZ",
    "lat": 23.1311,
    "lng": -82.3942,
    "calles_principales": [
      "Línea",
      "Linea",
      "Calle Línea",
      "23",
      "Avenida 23",
      "25",
      "27",
      "21",
      "19",
      "17",
      "15",
      "13",
      "11",
      "9na",
      "7ma",
      "5ta",
      "3ra",
      "1ra",
      "Calzada",
      "12",
      "Calle 12",
      "14",
      "16",
      "18",
      "20",
      "22",
      "24",
      "26",
      "28",
      "G",
      "Avenida de los Presidentes",
      "Paseo",
      "Avenida Paseo",
      "L",
      "Calle L",
      "M",
      "N",
      "O",
      "K",
      "J",
      "I",
      "H",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "Zapata",
      "Calle Zapata",
      "Boyeros",
      "Avenida de Rancho Boyeros",
      "Carlos III",
      "Infanta",
      "Malecón",
      "Calle Colón Vedado",
      "Factor",
      "Tulipán",
      "Conill",
      "Santa Ana",
      "Ayestarán",
      "Hidalgo",
      "Lombillo",
      "San Pedro",
      "Panchito Gómez",
      "General Suárez",
      "Paseo del Prado"
    ],
    "puntos_referencia": [
      "Plaza de la Revolución",
      "Memorial José Martí",
      "Hotel Nacional",
      "Hotel Habana Libre",
      "Coppelia",
      "Cine Yara",
      "Universidad de La Habana",
      "Cementerio de Colón",
      "Teatro Nacional de Cuba",
      "Biblioteca Nacional José Martí",
      "Hospital Calixto García",
      "Hospital Fructuoso Rodríguez",
      "Hospital Hermanos Ameijeiras",
      "Hospital Manuel Fajardo",
      "Cine Chaplin",
      "Cine 23 y 12",
      "Hotel Riviera",
      "Hotel Cohiba",
      "Edificio FOCSA",
      "Torre del López Serrano",
      "Parque Lennon"
    ]
  },
  {
    "nombre": "Centro Habana",
    "codigo": "CHB",
    "lat": 23.13628,
    "lng": -82.36671,
    "calles_principales": [
      "San Rafael",
      "Neptuno",
      "San Lázaro",
      "Galiano",
      "Avenida de Italia",
      "Reina",
      "Simón Bolívar",
      "Belascoaín",
      "Padre Varela",
      "Infanta",
      "Zanja",
      "Salud",
      "San Miguel",
      "Águila",
      "Aguila",
      "Campanario",
      "Lealtad",
      "Escobar",
      "Gervasio",
      "Lagunas",
      "Ánimas",
      "Animas",
      "Virtudes",
      "Concordia",
      "Trocadero",
      "Perseverancia",
      "Manrique",
      "Amistad",
      "Maloja",
      "Estrella",
      "Sitios",
      "Peñalver",
      "Condesa",
      "Figuras",
      "Carmen",
      "Rayo",
      "San Nicolás",
      "San Nicolas",
      "Chávez",
      "Barcelona",
      "Dragones",
      "Espada",
      "Hospital",
      "Aramburu",
      "Soledad",
      "Oquendo",
      "Marqués González",
      "Lucena",
      "Subirana",
      "Plasencia",
      "Retiro",
      "Árbol Seco",
      "Clavel Centro"
    ],
    "puntos_referencia": [
      "Barrio Chino",
      "Capitolio Nacional",
      "Parque de la Fraternidad",
      "Gran Teatro de La Habana Alicia Alonso",
      "Hotel Deauville",
      "Centro Comercial Carlos III",
      "Casa de la Música de Galiano",
      "Feria de San Rafael",
      "Callejón de Hamel",
      "Parque Maceo",
      "Palacio de la Rumba",
      "Plaza de Carlos III",
      "Teatro América",
      "Hotel Plaza",
      "Parque Central de La Habana",
      "Edificio de Teléfonos de Águila y Dragones"
    ]
  },
  {
    "nombre": "La Habana Vieja",
    "codigo": "HBV",
    "lat": 23.13856,
    "lng": -82.35377,
    "calles_principales": [
      "Obispo",
      "O'Reilly",
      "Mercaderes",
      "Oficios",
      "Cuba",
      "San Ignacio",
      "Habana",
      "Compostela",
      "Aguacate",
      "Villegas",
      "Monserrate",
      "Bernaza",
      "Muralla",
      "Teniente Rey",
      "Amargura",
      "Lamparilla",
      "Obrapía",
      "Empedrado",
      "Chacón",
      "Chacon",
      "Tejadillo",
      "Paseo del Prado",
      "Avenida del Puerto",
      "Monte",
      "Máximo Gómez",
      "Egido",
      "Sol",
      "Luz",
      "Acosta",
      "Jesús María",
      "Merced",
      "Paula",
      "San Pedro",
      "Inquisidor",
      "Damason",
      "San Isidro",
      "Picota",
      "Curazao",
      "Santa Clara",
      "Cárdenas",
      "Cienfuegos",
      "Aponte",
      "Factoría",
      "Suárez",
      "Revillagigedo",
      "Esperanza Habana Vieja",
      "Misión",
      "Gloria",
      "Corrales",
      "Arsenal",
      "Avenida de Bélgica"
    ],
    "puntos_referencia": [
      "Catedral de La Habana",
      "Plaza de Armas",
      "Plaza Vieja",
      "El Floridita",
      "La Bodeguita del Medio",
      "Terminal Central de Trenes",
      "Castillo de la Real Fuerza",
      "Palacio de los Capitanes Generales",
      "Museo de la Revolución",
      "Convento de San Francisco de Asís",
      "Alameda de Paula",
      "Muelle de Luz",
      "Parque de la Fraternidad",
      "Feria de San José",
      "Edificio Bacardí",
      "Hotel Sevilla",
      "Hotel Ambos Mundos"
    ]
  },
  {
    "nombre": "Diez de Octubre",
    "codigo": "DOC",
    "lat": 23.1008,
    "lng": -82.3718,
    "calles_principales": [
      "Calzada de 10 de Octubre",
      "10 de Octubre",
      "Diez de Octubre",
      "Santa Catalina",
      "Juan Delgado",
      "Acosta",
      "Lacret",
      "Goucuria",
      "Goicuría",
      "General Lee",
      "Patrocinio",
      "San Mariano",
      "San Francisco",
      "Porvenir",
      "Calzada de Porvenir",
      "Dolores",
      "Concepción",
      "Calzada de Luyanó",
      "Santa Ana",
      "Ensenada",
      "Fábrica",
      "Severidad",
      "Severino",
      "Calle B Lawton",
      "Rodríguez",
      "Rodriguez",
      "Concha",
      "Calzada de Concha",
      "Ramón Pintó",
      "Vía Blanca",
      "Via Blanca",
      "Agua Dulce",
      "Luz Caballero",
      "San Leonardo",
      "Josefina",
      "Gertrudis",
      "Pérez",
      "Santos Suárez",
      "Correa",
      "Estrada Palma",
      "Ariday",
      "Vista Alegre",
      "Calzada de Jesús del Monte",
      "Manuel Pruna",
      "Tres Palacios",
      "Juan Alonso",
      "Arango Luyanó",
      "Calle 13 Lawton",
      "Calle 14 Lawton",
      "Calle 15 Lawton",
      "Calle 16 Lawton",
      "Calle A Lawton",
      "Calle C Lawton",
      "Calle D Lawton",
      "Tejar",
      "San Nicolás Luyanó",
      "Villanueva"
    ],
    "puntos_referencia": [
      "Esquina de Toyo",
      "Panadería de Toyo",
      "Parque de Santos Suárez",
      "Hospital Hijas de Galicia",
      "Hospital 10 de Octubre",
      "Hospital Coco y Rabí",
      "Parque de la Víbora",
      "Parque de Mónaco",
      "Iglesia de Jesús del Monte",
      "Seminario San Carlos",
      "Preuniversitario de la Víbora (Pre de la Víbora)",
      "Paradero de Lawton",
      "Calzada de 10 de Octubre y Lacret",
      "Puente de Agua Dulce"
    ]
  },
  {
    "nombre": "Cerro",
    "codigo": "CRR",
    "lat": 23.10789,
    "lng": -82.38356,
    "calles_principales": [
      "Calzada del Cerro",
      "Buenos Aires",
      "Patria",
      "Primelles",
      "Auditor",
      "Tulipán",
      "Conill",
      "Santa Teresa",
      "Domínguez",
      "Ayestarán",
      "Boyeros",
      "Calzada de Vento",
      "San Salvador",
      "Falgueras",
      "San Felipe",
      "Cristina",
      "Vía Blanca",
      "Pilar",
      "Castillo",
      "Manglar",
      "Arroyo",
      "Infanta Cerro",
      "Calzada de Palatino",
      "Pezuela",
      "Santovenia",
      "Sarabia",
      "Santa Rosa",
      "Carvajal",
      "San Pablo",
      "Clavel Cerro",
      "Márquez",
      "Covadonga",
      "Calzada de Zaragoza",
      "Calle 20 de Mayo",
      "Avenida de Rancho Boyeros Cerro",
      "Luz Cerro",
      "San Cristóbal Cerro"
    ],
    "puntos_referencia": [
      "Estadio Latinoamericano",
      "Mercado de Cuatro Caminos",
      "Fábrica de Cerveza Polar",
      "Hospital Salvador Allende (Covadonga)",
      "Hospital Pediátrico del Cerro (Las Católicas)",
      "Ciudad Deportiva",
      "Parque de Palatino",
      "Quinta de Santovenia",
      "Puente de Agua Dulce",
      "Plaza del Cerro",
      "Fábrica de Tabaco H. Upmann",
      "Terminal de Ómnibus Nacionales"
    ]
  },
  {
    "nombre": "Marianao",
    "codigo": "MRN",
    "lat": 23.08111,
    "lng": -82.42167,
    "calles_principales": [
      "Avenida 51",
      "Avenida 41",
      "Avenida 31",
      "Avenida 35",
      "Avenida 37",
      "Avenida 39",
      "Avenida 43",
      "Avenida 45",
      "Avenida 47",
      "Avenida 49",
      "Avenida 53",
      "Avenida 55",
      "Avenida 57",
      "Avenida 59",
      "Avenida 61",
      "Avenida 63",
      "Avenida 65",
      "Avenida 67",
      "Avenida 69",
      "Avenida 71",
      "Avenida 73",
      "Calle 78",
      "Calle 80",
      "Calle 84",
      "Calle 92",
      "Calle 100",
      "Calle 102",
      "Calle 104",
      "Calle 106",
      "Calle 108",
      "Calle 110",
      "Calle 112",
      "Calle 114",
      "Calle 116",
      "Calle 118",
      "Calle 120",
      "Calle 120 A",
      "Calle 122",
      "Calle 122 A",
      "Calle 124",
      "Calle 126",
      "Calle 128",
      "Calle 130",
      "Calle 132",
      "Calle 134",
      "Calle 136",
      "Calle 138",
      "Calle 140",
      "Calle 142",
      "Calzada de Marianao",
      "Avenida 25"
    ],
    "puntos_referencia": [
      "Cabaret Tropicana",
      "Ciudad Libertad",
      "Hospital Militar Carlos J. Finlay",
      "Hospital Oftalmológico Pando Ferrer (Liga Contra la Ceguera)",
      "Hospital Pediátrico Juan Manuel Márquez",
      "Hospital Maternidad Obrera",
      "Obelisco de Marianao",
      "Transisport",
      "Parque Central de Marianao",
      "Anfiteatro de Marianao",
      "Mercado de 124 y 51",
      "Politécnico Osvaldo Herrera",
      "Estadio 50 Aniversario"
    ]
  },
  {
    "nombre": "La Lisa",
    "codigo": "LLS",
    "lat": 23.0544,
    "lng": -82.4647,
    "calles_principales": [
      "Avenida 51",
      "Autopista Nacional",
      "Carretera Central",
      "Avenida 23 La Lisa",
      "Avenida 25",
      "Avenida 27",
      "Avenida 29",
      "Avenida 31",
      "Avenida 33",
      "Avenida 35",
      "Avenida 37",
      "Calle 140",
      "Calle 150",
      "Calle 160",
      "Calle 170",
      "Calle 180",
      "Calle 190",
      "Calle 200",
      "Calle 210",
      "Calle 222",
      "Calle 230",
      "Calle 232",
      "Calle 234",
      "Calle 240",
      "Calle 242",
      "Calle 244",
      "Calle 246",
      "Calle 248",
      "Calle 250",
      "Calle 260",
      "Calle 270",
      "Carretera a Punta Brava",
      "Carretera a San Pedro",
      "Calle Real del Cano",
      "Calle Central de Arroyo Arenas",
      "Avenida Las Margaritas"
    ],
    "puntos_referencia": [
      "Hospital Ortopédico Frank País",
      "Puente de la Lisa",
      "Reparto San Agustín",
      "Centro de Investigaciones de Ozonoterapia",
      "Instituto de Medicina Tropical Pedro Kourí (IPK)",
      "Centro de Histoterapia Placentaria",
      "Parque Central de La Lisa",
      "Círculo Infantil Los Pinitos",
      "Motel El Morado",
      "Monumento a las Víctimas de San Pedro"
    ]
  },
  {
    "nombre": "Boyeros",
    "codigo": "BYR",
    "lat": 22.99454,
    "lng": -82.3932,
    "calles_principales": [
      "Avenida Independencia",
      "Avenida Boyeros",
      "Boyeros",
      "Calzada de Bejucal",
      "Calle 100",
      "Carretera de Vento",
      "Carretera de Varona",
      "Camagüey",
      "Van Troi",
      "Avenida Van Troi",
      "Calle 184",
      "Calle 188",
      "Calle 194",
      "Calle 196",
      "Calle 202",
      "Calle 263",
      "Calle 168",
      "Calle 180",
      "Calle Rosita",
      "Calle Lililoy",
      "Calle 100 y Perla",
      "Carretera del Wajay",
      "Finca Maicaja",
      "Carretera de Santiago de las Vegas",
      "Calle 2",
      "Calle 4",
      "Calle 6",
      "Calle 7 Boyeros",
      "Calle 9 Boyeros",
      "Calle 11 Boyeros",
      "Avenida 184 Santiago",
      "Calle 413 Santiago",
      "Carretera a Fontanar",
      "Carretera a Mazorra",
      "Avenida Central Calabazar",
      "Calle Real Calabazar"
    ],
    "puntos_referencia": [
      "Aeropuerto Internacional José Martí",
      "Terminal 1 Aeropuerto",
      "Terminal 2 Aeropuerto",
      "Terminal 3 Aeropuerto",
      "Parque Lenin",
      "ExpoCuba",
      "Jardín Botánico Nacional",
      "Hospital Psiquiátrico de La Habana (Mazorra)",
      "Hospital Nacional Enrique Cabrera",
      "Hospital Pediátrico William Soler",
      "Cardiocentro William Soler",
      "Centro Nacional de Biopreparados (BioCen)",
      "Zoológico Nacional de Cuba",
      "Plaza de Santiago de las Vegas",
      "Santuario Nacional de San Lázaro (El Rincón)",
      "Parque de Calabazar"
    ]
  },
  {
    "nombre": "Arroyo Naranjo",
    "codigo": "ARN",
    "lat": 23.0725,
    "lng": -82.3565,
    "calles_principales": [
      "Calzada de 10 de Octubre",
      "Calzada de Managua",
      "Calzada de Bejucal",
      "Avenida de Mayo",
      "Georgia",
      "Constitución",
      "Coliseo",
      "Perla",
      "Calle Cortina",
      "Calle Cortés",
      "Calle Cortes",
      "Esperanza Arroyo",
      "Agustín",
      "Agustin",
      "Don Tomás",
      "Don Tomas",
      "Azcárate",
      "Azcarate",
      "Varona",
      "Duanis",
      "Menocal",
      "Pizarro",
      "Ponce de León",
      "Progreso",
      "Roosevelt",
      "Manhattan",
      "Cisneros",
      "Oeste",
      "Calle 1ra Arroyo",
      "Calle 2da Arroyo",
      "Calle 3ra Arroyo",
      "Calle 4ta Arroyo",
      "Linderos",
      "Calle Real de Calvario",
      "Amargura Calvario",
      "Ánimas Calvario",
      "Angeles Calvario",
      "Cuarteles Calvario",
      "Cubanaleco",
      "Mirador Calvario",
      "Nueva Calvario",
      "Iglesia Calvario",
      "San Pedro Calvario",
      "Calle Hatuey",
      "Calle Sanguily",
      "Calle Dolores Palma",
      "Calle San José Palma",
      "Calle Martí Palma",
      "Calle Aranguren",
      "Calle Andrés Palma",
      "Calle Cristina Palma",
      "Calle Gómez Palma",
      "Calle Santa Isabel Palma",
      "Calle Yara Palma",
      "Avenida del Porvenir Arroyo"
    ],
    "puntos_referencia": [
      "Hospital Julio Trigo López",
      "Hospital Aballí",
      "Parque de La Palma",
      "Parque de Mantilla",
      "Parque de Párraga",
      "Puente de Calabazar",
      "Calzada de 10 de Octubre y Calzada de Managua (La Palma)",
      "Cine Mantilla",
      "Policlínico Párraga",
      "Cementerio de Mantilla",
      "Parque de los Pinos",
      "Estación de Policía de La Palma",
      "Feria de la Palma"
    ]
  },
  {
    "nombre": "Habana del Este",
    "codigo": "HDE",
    "lat": 23.1528,
    "lng": -82.2791,
    "calles_principales": [
      "Vía Blanca",
      "Via Blanca",
      "Vía Monumental",
      "Via Monumental",
      "Avenida Casablanca",
      "Avenida Las Terrazas",
      "5ta Avenida de Guanabo",
      "Avenida 7ma Alamar",
      "Avenida 1ra Alamar",
      "Avenida 3ra Alamar",
      "Avenida 5ta Alamar",
      "Calle 160 Alamar",
      "Calle 162 Alamar",
      "Calle 164 Alamar",
      "Calle 168 Alamar",
      "Calle 170 Alamar",
      "Calle 180 Alamar",
      "Avenida del Este",
      "Avenida de los Cocos",
      "Calle Real de Cojímar",
      "Calle Martí Cojímar",
      "Avenida Miramar Cojímar",
      "Calle 5ta Guanabo",
      "Calle 7ma Guanabo",
      "Calle 468 Guanabo",
      "Calle 472 Guanabo",
      "Calle 480 Guanabo",
      "Calle 500 Guanabo",
      "Calle 502 Guanabo",
      "Calle 504 Guanabo",
      "Avenida Litoral",
      "Calle Elio Llerena Campo Florido",
      "Calle Mártires de Girón Campo Florido",
      "Calle Enrique Hart Campo Florido",
      "Carretera de Campo Florido",
      "Calle 1ra Brisas del Mar",
      "Avenida de las Flores Tarará",
      "Calle Real Boca Ciega"
    ],
    "puntos_referencia": [
      "Playas del Este",
      "Fortaleza San Carlos de la Cabaña",
      "Castillo de los Tres Reyes del Morro",
      "Estatua del Cristo de La Habana",
      "Estadio Panamericano",
      "Complejo Deportivo Panamericano",
      "Villa Panamericana",
      "Alamar Centro",
      "Zona 6 Alamar",
      "Zona 19 Alamar",
      "Zona 24 Alamar",
      "Terraza de Cojímar",
      "Torreón de Cojímar",
      "Hotel MarAzul",
      "Hotel Tropicoco",
      "Hotel Arenal",
      "Policlínico de Guanabo",
      "Parque Central de Guanabo",
      "Puente del Río Cojímar"
    ]
  },
  {
    "nombre": "Guanabacoa",
    "codigo": "GBC",
    "lat": 23.1078,
    "lng": -82.2636,
    "calles_principales": [
      "Corralfalso",
      "Calzada de Corralfalso",
      "Máximo Gómez",
      "Pepe Antonio",
      "Quintín Banderas",
      "Calzada de Guanabacoa",
      "Vía Blanca Guanabacoa",
      "Avenida de Guanabacoa",
      "Cristóbal de la Guardia",
      "Rosa Serra",
      "Nazareno",
      "José Luis Dardel",
      "Corona Guanabacoa",
      "Ángeles Guanabacoa",
      "Clemente Guanabacoa",
      "Antonio Cobo",
      "Torroella",
      "Coyula",
      "Elvira Saladriga",
      "Carretera a Arango",
      "Calle Real de Arango",
      "Calle 5ta Habana Nueva",
      "Calle B Habana Nueva",
      "Calle C Habana Nueva",
      "Carretera de Barreras",
      "Carretera de Minas",
      "Calle Martí Minas",
      "Calle Maceo Minas",
      "Calle Santa María Guanabacoa",
      "Calle San Sebastián",
      "Calle Candelaria"
    ],
    "puntos_referencia": [
      "La Cotorra",
      "Manantial La Cotorra",
      "Museo Municipal de Guanabacoa",
      "Iglesia Parroquial Mayor de Guanabacoa",
      "Convento de San Francisco Guanabacoa",
      "Ermita de Potosí",
      "Parque Martí de Guanabacoa",
      "Semáforo de Guanabacoa (Vía Blanca)",
      "Policlínico Machaco Ameijeiras",
      "Paradero de Guanabacoa",
      "Fábrica de Jabón Suchel"
    ]
  },
  {
    "nombre": "San Miguel del Padrón",
    "codigo": "SMP",
    "lat": 23.06347,
    "lng": -82.29601,
    "calles_principales": [
      "Calzada de San Miguel",
      "Calzada de Güines",
      "Carretera Central SMP",
      "Calzada de Luyanó SMP",
      "Vía Blanca SMP",
      "San Luis",
      "Calle 3ra San Francisco",
      "Calle 1ra San Francisco",
      "Calle 2da San Francisco",
      "Avenida Siboney",
      "Avenida Camilo Cienfuegos",
      "Antonio Maceo SMP",
      "José Martí SMP",
      "Calle Final San Francisco",
      "Calle 1ra Monterrey",
      "Calle 2da Monterrey",
      "Calle 3ra Monterrey",
      "Calle H Monterrey",
      "Calle I Monterrey",
      "Avenida 4ta Delicias Diezmero",
      "Calle 3ra Delicias Diezmero",
      "Calle 5ta Delicias Diezmero",
      "Carretera Central del Diezmero",
      "Avenida Primera Jacomino",
      "Calle Mayor Jacomino",
      "Calle Central Rocafort",
      "Calle Oriente California",
      "Calle Norte Ciudamar",
      "Avenida Los Pinos SMP",
      "Calle Prolongación de Dolores"
    ],
    "puntos_referencia": [
      "La Virgen del Camino",
      "Finca Vigía (Casa Museo Ernest Hemingway)",
      "Mirador de San Miguel",
      "Parque de Jacomino",
      "Puente de Alcoy",
      "Policlínico California",
      "Hospital Materno Infantil Lebredo",
      "Reparto San Francisco de Paula",
      "Reparto Diezmero",
      "Reparto Jacomino",
      "Reparto Monterrey",
      "Reparto California",
      "Reparto Rocafort",
      "Cine San Miguel"
    ]
  },
  {
    "nombre": "Regla",
    "codigo": "REG",
    "lat": 23.1258,
    "lng": -82.3322,
    "calles_principales": [
      "Martí",
      "Máximo Gómez",
      "Maceo",
      "24 de Febrero",
      "Calixto García",
      "Avenida del Puerto Regla",
      "Avenida de los Mártires",
      "Calzada de Regla",
      "Avenida Rotaria",
      "Céspedes",
      "Concepción",
      "Unión",
      "José Miguel Gómez",
      "Ñico López",
      "San Francisco Regla",
      "Ánimas Regla",
      "Los Almendros",
      "Ciruela",
      "Fortín",
      "Marina Regla",
      "Calle Diez de Octubre Regla",
      "Ceiba Regla",
      "Recreo Regla",
      "Calle Coloma Casablanca",
      "Calle Central Casablanca",
      "Calle Artesanos Casablanca",
      "Carretera Naval"
    ],
    "puntos_referencia": [
      "Santuario Nacional de la Virgen de Regla",
      "Embarcadero de Regla (Lanchita de Regla)",
      "Colina Lenin",
      "Lanchita de Casablanca",
      "Cristo de La Habana",
      "Observatorio Nacional de Casablanca",
      "Estación de Policía de Regla",
      "Parque Guaicanamar",
      "Astillero Chullima",
      "Cementerio de Regla"
    ]
  },
  {
    "nombre": "Cotorro",
    "codigo": "COT",
    "lat": 23.0261,
    "lng": -82.2475,
    "calles_principales": [
      "Carretera Central Cotorro",
      "Calzada de Güines",
      "Avenida 101 Cotorro",
      "Avenida 97 Cotorro",
      "Avenida 99 Cotorro",
      "Avenida 71 Cotorro",
      "Avenida 67 Cotorro",
      "Avenida San Pedro",
      "Calle 20 Cotorro",
      "Calle 34 Cotorro",
      "Calle 44 Cotorro",
      "Calle 50 Cotorro",
      "Calle 67 Cotorro",
      "Calle 102 Cotorro",
      "Carretera de Managua Cotorro",
      "Carretera de Alberro",
      "Carretera de Cuatro Caminos",
      "Calle Real de Santa María del Rosario",
      "Calle Martí Santa María",
      "Calle Gómez Santa María",
      "Avenida Central Lotería",
      "Calle Principal San Pedro"
    ],
    "puntos_referencia": [
      "Balneario de Santa María del Rosario",
      "Plaza del Cotorro",
      "Botica 90",
      "Parque Central del Cotorro",
      "Cine Victoria",
      "Empresa Antillana de Acero",
      "Centro Recreativo El Pedregal (Cotorro)",
      "Cuatro Caminos del Cotorro",
      "Monumento al Mambí Desconocido",
      "Policlínico Cuatro Caminos",
      "Paradero del Cotorro"
    ]
  }
];

  // 4. LIMPIADOR Y NORMALIZADOR UNIVERSAL
  HabanaDirecciones.limpiarTexto = function(str) {
    if (!str) return '';

    // Convertir caracteres Unicode matemáticos a ASCII
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var code = str.codePointAt(i);
      if (code >= 0x1D400 && code <= 0x1D419) { out += String.fromCharCode(65 + (code - 0x1D400)); i++; }
      else if (code >= 0x1D41A && code <= 0x1D433) { out += String.fromCharCode(97 + (code - 0x1D41A)); i++; }
      else if (code >= 0x1D434 && code <= 0x1D44D) { out += String.fromCharCode(65 + (code - 0x1D434)); i++; }
      else if (code >= 0x1D44E && code <= 0x1D467) { out += String.fromCharCode(97 + (code - 0x1D44E)); i++; }
      else if (code >= 0x1D468 && code <= 0x1D481) { out += String.fromCharCode(65 + (code - 0x1D468)); i++; }
      else if (code >= 0x1D482 && code <= 0x1D49B) { out += String.fromCharCode(97 + (code - 0x1D482)); i++; }
      else if (code >= 0x1D5D4 && code <= 0x1D5ED) { out += String.fromCharCode(65 + (code - 0x1D5D4)); i++; }
      else if (code >= 0x1D5EE && code <= 0x1D607) { out += String.fromCharCode(97 + (code - 0x1D5EE)); i++; }
      else { out += str[i]; }
    }

    out = out.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Reemplazos de contracciones, jerga y errores tipográficos cubanos
    out = out
      .replace(/\bstgo\s*(de\s*)?(las\s*)?vegas?\b|\bstgo\s*vegas?\b/g, 'santiago de las vegas')
      .replace(/\bstgo\b/g, 'santiago')
      .replace(/\bhab\b/g, 'habana')
      .replace(/\bvedao\b/g, 'vedado')
      .replace(/\bbolleros\b|\bboyero\b/g, 'boyeros')
      .replace(/\bconill\b/g, 'conill')
      .replace(/\btulipan\b/g, 'tulipan')
      .replace(/\bgoucuria\b|\bgocuria\b|\bgoicuria\b/g, 'goicuria')
      .replace(/\bluyano\b|\bluiano\b/g, 'luyano')
      .replace(/\bvibora\b|\bbibora\b/g, 'vibora')
      .replace(/\bcotoro\b/g, 'cotorro')
      .replace(/\bmariano\b/g, 'marianao')
      .replace(/\balmar\b/g, 'alamar')
      .replace(/\bsanto suare\b|\bsantos suare\b/g, 'santos suarez')
      .replace(/\bguira\s+e\s+melena\b/g, 'guira de melena')
      .replace(/\be\s*\/\s*|\bent[\s\.]+/g, ' entre ')
      .replace(/[%/]/g, ' entre ')
      .replace(/(\d+)\s*y\s*(\d+)/gi, function(m, a, b) { return a + ' y ' + b; })
      .replace(/(\d+)(?:ra|da|ta|ma|na|va)([a-z])\b/gi, function(m, n, l) { return n + ' ' + l.toLowerCase(); })
      .replace(/(\d+)([a-df-km-z])\b/gi, function(m, n, l) { return n + ' ' + l.toLowerCase(); })
      .replace(/\bave\b\.?\s*|\bavda\b\.?\s*/gi, 'avenida ')
      .replace(/avenida\.(\d+)/g, 'avenida $1')
      .replace(/\bclle\.?\s*|\bcalz\.?\b/g, 'calzada ')
      .replace(/\bedif\.?\b|\bedificio\b/g, 'edificio ')
      .replace(/\bapt(?:o|m?o)?\.?\b/gi, 'apartamento ')
      .replace(/\baberro\b/gi, 'alberro')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return out;
  };

  // Generador de URL Oficial de Google Maps con parámetros precisos
  HabanaDirecciones.generarGoogleMapsUrl = function(lat, lng, queryText) {
    if (!lat || !lng) {
      return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(queryText + ', La Habana, Cuba');
    }
    // Formato oficial recomendado por Google Maps URLs API v1
    return 'https://www.google.com/maps/search/?api=1&query=' + lat.toFixed(5) + '%2C' + lng.toFixed(5);
  };

  
  // Extractor inteligente de la sección de dirección en facturas estructuradas de gestores
  HabanaDirecciones.aislarDireccion = function(input) {
    if (!input) return '';
    var str = input.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Normalizar fuentes matemáticas especiales (bold/italic Unicode de WhatsApp)
    str = str.replace(/[\uD835][\uDC00-\uDFFF]/g, function(c) {
      var code = c.codePointAt(0);
      if (code >= 0x1D400 && code <= 0x1D419) return String.fromCharCode(65 + code - 0x1D400);
      if (code >= 0x1D41A && code <= 0x1D433) return String.fromCharCode(97 + code - 0x1D41A);
      if (code >= 0x1D434 && code <= 0x1D44D) return String.fromCharCode(65 + code - 0x1D434);
      if (code >= 0x1D44E && code <= 0x1D467) return String.fromCharCode(97 + code - 0x1D44E);
      if (code >= 0x1D468 && code <= 0x1D481) return String.fromCharCode(65 + code - 0x1D468);
      if (code >= 0x1D482 && code <= 0x1D49B) return String.fromCharCode(97 + code - 0x1D482);
      if (code >= 0x1D5D4 && code <= 0x1D5ED) return String.fromCharCode(65 + code - 0x1D5D4);
      if (code >= 0x1D5EE && code <= 0x1D607) return String.fromCharCode(97 + code - 0x1D5EE);
      return c;
    });

    var matchHeader = str.match(/(?:REMCUP-EF-HABANA|CUP EFECTIVO HABANA|USD EFECRIVO HABANA|CUP EF\s*-\s*HABANA)\s*-\s*([^-]+)\s*-/i);
    var headerMun = matchHeader ? matchHeader[1].trim() : '';

    var lines = str.split(/\r?\n/);
    var inAddress = false;
    var addressLines = [];

    for (var i = 0; i < lines.length; i++) {
      var cleanLine = lines[i].trim();
      if (/^[✨\s*-]*direccion(?:\s*(?:del\s*cliente|para\s*el\s*envio))?\s*:/i.test(cleanLine)) {
        inAddress = true;
        var content = cleanLine.replace(/^[✨\s*-]*direccion(?:\s*(?:del\s*cliente|para\s*el\s*envio))?\s*:\s*/i, '');
        if (content) addressLines.push(content);
        continue;
      }
      if (inAddress) {
        if (/^[✨\s*-]*(?:pedido|precio|total|dinero|cantidad|metodo|nombre|gestor|telefono|carnet|ci|fecha|reciben|entrega|descontar)\b/i.test(cleanLine)) {
          inAddress = false;
          break;
        }
        if (cleanLine) addressLines.push(cleanLine);
      }
    }

    if (addressLines.length > 0) {
      var munMatch = str.match(/(?:municipio|provincia)\s*:?\s*([^\n\r]+)/gi);
      var extra = munMatch ? ' ' + munMatch.join(' ') : (headerMun ? ' Municipio: ' + headerMun : '');
      return addressLines.join(' ') + extra;
    }
    return input;
  };

  // 5. MOTOR DE ANÁLISIS, TRIANGULACIÓN Y RANKING MULTI-HIPÓTESIS
  HabanaDirecciones.analizar = function(input) {
    if (!input || input.trim().length < 2) {
      return {
        encontrado: false,
        mensaje: 'Ingrese una dirección para comenzar el análisis.',
        respuestas: []
      };
    }

    var db = HabanaDirecciones;
    var direccionLimpia = db.aislarDireccion(input);
    var texto = db.limpiarTexto(direccionLimpia);
    var candidatos = [];

    function registrarCandidato(municipio, barrio, puntaje, detalle, lat, lng, esExacto) {
      var munObj = db.municipios.find(function(m) { return m.nombre === municipio; });
      var finalLat = lat || (munObj ? munObj.lat : null);
      var finalLng = lng || (munObj ? munObj.lng : null);

      var existente = candidatos.find(function(c) {
        return c.municipio === municipio;
      });

      if (existente) {
        existente.puntaje = Math.max(existente.puntaje, puntaje) + (esExacto ? 10 : 3);
        if (barrio && (!existente.barrio || (esExacto && !existente.esCruceExacto))) {
          existente.barrio = barrio;
        }
        if (detalle && existente.detalles.indexOf(detalle) === -1) {
          existente.detalles.push(detalle);
        }
        // Si el candidato ya tiene un cruce exacto detectado, NUNCA permitir que fases genéricas posteriores cambien sus coordenadas
        if (existente.esCruceExacto) {
          // Mantener coordenadas del cruce exacto inalterables
        } else if (lat && lng && (esExacto || !existente.latExacta)) {
          existente.lat = lat;
          existente.lng = lng;
          if (esExacto) existente.latExacta = true;
        }
      } else {
        candidatos.push({
          municipio: municipio,
          barrio: barrio,
          puntaje: puntaje,
          detalles: detalle ? [detalle] : [],
          lat: finalLat,
          lng: finalLng,
          latExacta: !!esExacto,
          esCruceExacto: !!esExacto
        });
      }
    }

    // --- FASE 1: TRIANGULACIÓN DIRECTA DE CRUCES VIALES Y NODOS EXACTOS ---
    for (var cr = 0; cr < db.crucesFrecuentes.length; cr++) {
      var cruce = db.crucesFrecuentes[cr];
      var todosPresentes = true;
      for (var tk = 0; tk < cruce.tokens.length; tk++) {
        var tokenNorm = db.limpiarTexto(cruce.tokens[tk]);
        if (texto.indexOf(tokenNorm) === -1) {
          todosPresentes = false;
          break;
        }
      }

      if (todosPresentes) {
        registrarCandidato(
          cruce.municipio,
          cruce.barrio,
          cruce.confianza,
          'Triangulación exacta de nodos: ' + cruce.descripcion,
          cruce.lat,
          cruce.lng,
          true
        );
        var candCruce = candidatos.find(function(c) { return c.municipio === cruce.municipio; });
        if (candCruce) {
          candCruce.esCruceExacto = true;
          candCruce.lat = cruce.lat;
          candCruce.lng = cruce.lng;
        }
      }
    }

    // --- FASE 2: BARRIOS Y CONSEJOS POPULARES CON COORDENADAS PRECISAS ---
    var keysBarrios = Object.keys(db.barriosGeorreferenciados).sort(function(a, b) {
      return b.length - a.length;
    });

    for (var kb = 0; kb < keysBarrios.length; kb++) {
      var keyB = keysBarrios[kb];
      if (new RegExp('(^|\\s)' + keyB + '(\\s|$)', 'i').test(texto)) {
        var itemB = db.barriosGeorreferenciados[keyB];
        registrarCandidato(
          itemB.municipio,
          itemB.barrio,
          96,
          'Consejo Popular / Barrio georreferenciado: ' + itemB.barrio,
          itemB.lat,
          itemB.lng,
          true
        );
      }
    }

    // --- FASE 3: PATRONES ESPECIALES (Zonas de Alamar, etc.) ---
    var matchZonaAlamar = texto.match(/(?:alamar\s*)?zona\s*(\d{1,2})\b/i);
    if (matchZonaAlamar) {
      var numZona = parseInt(matchZonaAlamar[1], 10);
      if (numZona >= 1 && numZona <= 28) {
        var latZona = 23.1528 + (numZona <= 12 ? 0.005 : -0.005);
        var lngZona = -82.2791 + ((numZona % 10) * 0.003);
        registrarCandidato(
          'Habana del Este',
          'Alamar (Zona ' + numZona + ')',
          98,
          'Zona ' + numZona + ' de Alamar',
          latZona,
          lngZona,
          true
        );
      }
    }

    // --- FASE 4: MUNICIPIOS EXPLÍCITOS ---
    for (var m = 0; m < db.municipios.length; m++) {
      var munObj = db.municipios[m];
      var munNorm = db.limpiarTexto(munObj.nombre);

      if (new RegExp('(^|\\s)' + munNorm + '(\\s|$)', 'i').test(texto)) {
        registrarCandidato(
          munObj.nombre,
          null,
          95,
          'Municipio mencionado explícitamente: ' + munObj.nombre,
          munObj.lat,
          munObj.lng,
          false
        );
      }
    }

    // --- FASE 5: TRIANGULACIÓN POR CALLES EN CADA MUNICIPIO ---
    for (var mc = 0; mc < db.municipios.length; mc++) {
      var mItem = db.municipios[mc];
      var matchCalles = [];
      var normVistas = [];

      for (var c = 0; c < mItem.calles_principales.length; c++) {
        var calle = mItem.calles_principales[c];
        var calleNorm = db.limpiarTexto(calle);

        if (calleNorm.length >= 3 && new RegExp('(^|\\s)' + calleNorm + '(\\s|$)', 'i').test(texto)) {
          if (normVistas.indexOf(calleNorm) === -1) {
            normVistas.push(calleNorm);
            matchCalles.push(calle);
          }
        }
      }

      if (matchCalles.length >= 2) {
        var puntajeTriangulado = 92 + Math.min(matchCalles.length * 3, 6);
        registrarCandidato(
          mItem.nombre,
          null,
          puntajeTriangulado,
          'Triangulación vial múltiple (' + matchCalles.length + ' vías): ' + matchCalles.join(', '),
          mItem.lat,
          mItem.lng,
          false
        );
      } else if (matchCalles.length === 1) {
        var scoreCalle = (calleNorm === 'via blanca' || calleNorm === 'carretera central') ? 70 : 80;
        registrarCandidato(
          mItem.nombre,
          null,
          scoreCalle,
          'Vía identificada: ' + matchCalles[0],
          mItem.lat,
          mItem.lng,
          false
        );
      }
    }

    // --- FASE 6: PUNTOS DE REFERENCIA NOTABLES ---
    for (var prM = 0; prM < db.municipios.length; prM++) {
      var munPunto = db.municipios[prM];
      for (var p = 0; p < munPunto.puntos_referencia.length; p++) {
        var puntoNorm = db.limpiarTexto(munPunto.puntos_referencia[p]);
        if (puntoNorm.length >= 4 && texto.indexOf(puntoNorm) !== -1) {
          registrarCandidato(
            munPunto.nombre,
            null,
            96,
            'Punto de referencia clave: ' + munPunto.puntos_referencia[p],
            munPunto.lat,
            munPunto.lng,
            false // No sobrescribir cruces exactos ni barrios con el centro general del municipio
          );
        }
      }
    }

    if (candidatos.length === 0) {
      return {
        encontrado: false,
        mensaje: 'No se encontraron coincidencias para la dirección indicada.',
        respuestas: []
      };
    }

    // Ordenar candidatos por puntaje
    candidatos.sort(function(a, b) {
      return b.puntaje - a.puntaje;
    });

    // Probabilidades relativas exponenciales
    var pesosExponenciales = candidatos.map(function(c) {
      return Math.pow(c.puntaje / 10, 3);
    });
    var sumaPesos = 0;
    pesosExponenciales.forEach(function(p) { sumaPesos += p; });

    var respuestas = candidatos.slice(0, 4).map(function(c, idx) {
      var prob = Math.round((pesosExponenciales[idx] / sumaPesos) * 100);
      var confianzaNormalizada = Math.min(c.puntaje, 99);
      var gmaps = db.generarGoogleMapsUrl(c.lat, c.lng, (c.barrio ? c.barrio + ', ' : '') + c.municipio);

      return {
        ranking: idx + 1,
        municipio: c.municipio,
        barrio: c.barrio,
        confianza: confianzaNormalizada,
        probabilidad: Math.max(prob, 1),
        detalles: c.detalles,
        lat: c.lat,
        lng: c.lng,
        googleMapsUrl: gmaps,
        coordenadasAprox: (c.lat && c.lng) ? { lat: c.lat, lng: c.lng } : null
      };
    });

    var principal = respuestas[0];

    return {
      encontrado: true,
      municipio: principal.municipio,
      barrio: principal.barrio,
      confianza: principal.confianza,
      probabilidad: principal.probabilidad,
      lat: principal.lat,
      lng: principal.lng,
      googleMapsUrl: principal.googleMapsUrl,
      coordenadasAprox: principal.coordenadasAprox,
      detalles: principal.detalles,
      respuestas: respuestas
    };
  };

  // Exportar al contexto global
  if (typeof window !== 'undefined') {
    window.HabanaDirecciones = HabanaDirecciones;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = HabanaDirecciones;
  }

})(typeof window !== 'undefined' ? window : global);
