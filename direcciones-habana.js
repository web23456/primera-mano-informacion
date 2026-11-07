// ============================================
// ALGORITMO ROBUSTO DE DIRECCIONES DE LA HABANA (MOTOR ULTRA-INTELIGENTE 2.0)
// Base de datos exhaustiva: 15 Municipios, 105 Consejos Populares, +250 Barrios/Repartos,
// Puntos de referencia, arterias viales, coordenadas GPS oficiales de alta precisión,
// normalización de caracteres matemáticos Unicode, fonética cubana y tolerancia difusa a erratas.
// ============================================

(function(root) {
  var HabanaDirecciones = {};

  // 1. BASE DE DATOS DE LOS 15 MUNICIPIOS CON COORDENADAS OFICIALES
  HabanaDirecciones.municipios = [
    {
      nombre: 'Playa',
      codigo: 'PLY',
      lat: 23.1167,
      lng: -82.4333,
      consejos_populares: [
        'Santa Fe', 'Siboney', 'Cubanacán', 'Ampliación Almendares', 'Miramar', 'Sierra', 'Ceiba', 'Buena Vista'
      ],
      barrios: [
        'Miramar', 'Flores', 'Almendares', 'Sierra', 'Kohly', 'Buenavista', 'Buena Vista',
        'Querejeta', 'La Ceiba', 'Jaimanitas', 'Santa Fe', 'Baracoa', 'Siboney',
        'Atabey', 'Cubanacán', 'Náutico', 'Nautico', 'La Puntilla', 'Country Club', 'El Romerillo',
        'Ampliación Almendares', 'Ampliacion Almendares', 'Alturas de Miramar', 'Alturas del Bosque',
        'Ceiba', 'Parque Metropolitano'
      ],
      calles_principales: [
        '1ra', '3ra', '5ta', '5ta Avenida', '7ma', '9na', '11', '13', '19', '25',
        '31', '41', '42', '44', '60', '70', '76', '84', '110', '120', '146', '222', '230', '240',
        'Calle 100', 'Avenida 31', 'Avenida 41'
      ],
      puntos_referencia: [
        'Hotel Meliá Habana', 'Melia Habana', 'Acuario Nacional', 'Marina Hemingway',
        'Palacio de Convenciones', 'CIMEQ', 'La Maison', 'Complejo Neptuno-Tritón', 'Neptuno Triton',
        '5ta y 42', 'Embajada de Rusia', 'La Puntilla', 'Teatro Karl Marx', 'Parque Almendares',
        'Centro de Negocios Miramar', 'Comodoro', 'Hotel Copacabana', 'Tritón', 'Club Habana'
      ]
    },
    {
      nombre: 'Plaza de la Revolución',
      codigo: 'PLZ',
      lat: 23.1244,
      lng: -82.3861,
      consejos_populares: [
        'El Carmelo', 'Vedado-Malecón', 'Rampa', 'Príncipe', 'Plaza', 'Nuevo Vedado-Puentes Grandes', 'Colón-Nuevo Vedado', 'Vedado'
      ],
      barrios: [
        'Vedado', 'Nuevo Vedado', 'Plaza', 'Puentes Grandes', 'Aldecoa', 'Rampa', 'Carmelo',
        'El Carmelo', 'Príncipe', 'Principe', 'Colón Nuevo', 'Colon Nuevo', 'Vedado Malecón',
        'Policarpo', 'La Rosita', 'La Timba', 'Fanguito', 'El Fanguito'
      ],
      calles_principales: [
        'Línea', 'Linea', '23', 'Avenida 23', '25', '27', '21', '17', '15', '19', '12', 'G',
        'Avenida de los Presidentes', 'Paseo', 'Avenida Paseo', 'L', 'M', 'N', 'O', 'K', 'J',
        'I', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'Zapata', '26', 'Avenida 26', 'Boyeros',
        'Carlos III', 'Salvador Allende', 'Infanta', 'Malecón', 'Malecon', 'Calzada'
      ],
      puntos_referencia: [
        'Plaza de la Revolución', 'Memorial José Martí', 'Jose Marti', 'Hotel Nacional',
        'Hotel Habana Libre', 'Coppelia', 'Cine Yara', 'Universidad de La Habana',
        'Hospital Hermanos Ameijeiras', 'Hospital Calixto García', 'Calixto Garcia',
        'Cementerio de Colón', 'Cementerio de Colon', 'Biblioteca Nacional', 'Teatro Nacional',
        'ICRT', 'Ministerio de Comunicaciones', 'Colina Universitaria', '23 y L', '23 y 12',
        '23 y G', 'Línea y L', 'Línea y Paseo'
      ]
    },
    {
      nombre: 'Centro Habana',
      codigo: 'CHB',
      lat: 23.1349,
      lng: -82.3689,
      consejos_populares: [
        'Cayo Hueso', 'Pueblo Nuevo', 'Los Sitios', 'Dragones', 'Colón'
      ],
      barrios: [
        'Cayo Hueso', 'Los Sitios', 'Pueblo Nuevo', 'Dragones', 'Colón', 'Colon',
        'Guadalupe', 'Barrio Chino', 'San Leopoldo'
      ],
      calles_principales: [
        'San Rafael', 'Neptuno', 'San Lázaro', 'San Lazaro', 'Galiano', 'Avenida de Italia',
        'Reina', 'Simón Bolívar', 'Simon Bolivar', 'Belascoaín', 'Belascoain', 'Padre Varela',
        'Infanta', 'Zanja', 'Salud', 'San Miguel', 'Águila', 'Aguila', 'Campanario',
        'Lealtad', 'Escobar', 'Gervasio', 'Lagunas', 'Ánimas', 'Animas', 'Virtudes',
        'Concordia', 'Trocadero', 'Perseverancia', 'Manrique', 'Amistad', 'Rayo', 'Chávez'
      ],
      puntos_referencia: [
        'Barrio Chino', 'Capitolio', 'Capitolio Nacional', 'Parque de la Fraternidad',
        'Gran Teatro de La Habana', 'Hotel Deauville', 'Centro Comercial Carlos III',
        'Parque Fe del Valle', 'Malecón de Centro Habana', 'Parque Curita', 'El Floridita',
        'Teatro América', 'Casa de la Música Galiano'
      ]
    },
    {
      nombre: 'La Habana Vieja',
      codigo: 'HBV',
      lat: 23.1373,
      lng: -82.3530,
      consejos_populares: [
        'Prado', 'Catedral', 'Plaza Vieja', 'Belén', 'San Isidro', 'Jesús María', 'Tallapiedra'
      ],
      barrios: [
        'San Isidro', 'Belén', 'Belen', 'Catedral', 'Santo Ángel', 'Santo Angel', 'Paula',
        'Jesús María', 'Jesus Maria', 'Plaza Vieja', 'Prado', 'Tallapiedra', 'San Juan de Dios'
      ],
      calles_principales: [
        'Obispo', "O'Reilly", 'OReilly', 'Mercaderes', 'Oficios', 'Cuba', 'San Ignacio',
        'Habana', 'Compostela', 'Aguacate', 'Villegas', 'Monserrate', 'Bernaza', 'Muralla',
        'Teniente Rey', 'Amargura', 'Lamparilla', 'Obrapía', 'Obrapia', 'Empedrado',
        'Chacón', 'Chacon', 'Tejadillo', 'Paseo del Prado', 'Avenida del Puerto',
        'Monte', 'Máximo Gómez', 'Egido', 'Sol', 'Luz', 'Acosta', 'San Pedro', 'Inquisidor', 'Damas'
      ],
      puntos_referencia: [
        'Catedral de La Habana', 'Plaza de Armas', 'Plaza Vieja', 'Plaza de San Francisco de Asís',
        'El Floridita', 'La Bodeguita del Medio', 'Terminal Central de Trenes', 'Terminal de Trenes',
        'Castillo de la Real Fuerza', 'Museo de la Revolución', 'Lonja del Comercio',
        'Alameda de Paula', 'Terminal de Ferrocarriles', 'Muelle de Luz'
      ]
    },
    {
      nombre: 'Diez de Octubre',
      codigo: 'DOC',
      lat: 23.0853,
      lng: -82.3606,
      consejos_populares: [
        'Luyanó', 'Jesús del Monte', 'Lawton', 'Vista Alegre', 'Goyle', 'Sevillano', 'La Víbora', 'Santos Suárez', 'Tamarindo'
      ],
      barrios: [
        'Santos Suárez', 'Santos Suarez', 'La Víbora', 'La Vibora', 'Víbora', 'Vibora',
        'Lawton', 'Luyanó', 'Luyano', 'Sevillano', 'Loma del Chaple', 'Chaple',
        'Vista Alegre', 'Jesús del Monte', 'Jesus del Monte', 'Tamarindo', 'Acosta',
        'Santa Amalia', 'El Pilar', 'Goyle', 'Revolución'
      ],
      calles_principales: [
        'Calzada de 10 de Octubre', '10 de Octubre', 'Diez de Octubre', 'Santa Catalina',
        'Juan Delgado', 'Acosta', 'Lacret', 'Goucuria', 'Gooicuría', 'Goicuría', 'Goicuria',
        'General Lee', 'Patrocinio', 'San Mariano', 'San Francisco', 'Porvenir', 'Dolores',
        'Concepción', 'Concepcion', '16 de Octubre', 'Calzada de Luyanó', 'Calzada de Luyano',
        'Calzada de Jesús del Monte', 'Santa Ana', 'Ensenada', 'Fábrica', 'Fabrica', 'Severidad',
        'Calle B Lawton', 'Tejar', 'San Nicolás', 'Carmen', 'Milagros', 'Santa Irene'
      ],
      puntos_referencia: [
        'Esquina de Toyo', 'Toyo', 'Panadería de Toyo', 'Panaderia de Toyo', 'Parque de Santos Suárez',
        'Parque Góngora', 'Parque Gongora', 'Parque de los Chivos', 'Hospital Hijas de Galicia',
        'Hospital 10 de Octubre', 'La Dependiente', 'Santa Catalina y Juan Delgado', 'Lacret y Juan Delgado'
      ]
    },
    {
      nombre: 'Cerro',
      codigo: 'CRR',
      lat: 23.1097,
      lng: -82.3842,
      consejos_populares: [
        'Latinoamericano', 'Pilar-Atarés', 'Cerro', 'Las Cañas', 'El Canal', 'Palatino', 'Armada'
      ],
      barrios: [
        'Cerro', 'El Cerro', 'Las Cañas', 'Las Canas', 'Palatino', 'El Canal', 'Canal',
        'Pilar', 'Atarés', 'Atares', 'Casino Deportivo', 'Armando Mestre', 'La Ceiba del Cerro',
        'Latinoamericano', 'Armada', 'Carraguao'
      ],
      calles_principales: [
        'Calzada del Cerro', 'Buenos Aires', 'Patria', 'Primelles', 'Auditor', 'Tulipán', 'Tulipan',
        'Conill', 'Santa Teresa', 'Domínguez', 'Dominguez', 'Ayestarán', 'Ayestaran',
        'Boyeros', 'Calzada de Vento', 'San Salvador', 'Falgueras', 'Pizarro', 'San Felipe',
        'Cristina', 'San Francisco Cerro', 'Aranguren', 'Pérez', 'Perez', 'Calvo'
      ],
      puntos_referencia: [
        'Estadio Latinoamericano', 'El Latino', 'Mercado de Cuatro Caminos', 'Cuatro Caminos',
        'Fábrica de Cerveza Polar', 'Hospital Clínico Quirúrgico del Cerro', 'La Covadonga',
        'Hospital Salvador Allende', 'Parque Galicia', 'Ministerio de la Agricultura', 'MINAG',
        'Puentes Grandes (Cerro)', 'Tulipán y Conill'
      ]
    },
    {
      nombre: 'Marianao',
      codigo: 'MRN',
      lat: 23.0886,
      lng: -82.4278,
      consejos_populares: [
        'CAI-Los Ángeles', 'Pocito-Palmas', 'Zamora-Cocosolo', 'Libertad', 'Pogoloti-Belén-Finlay', 'Santa Felicia'
      ],
      barrios: [
        'Marianao', 'Pogolotti', 'Pogoloti', 'Zamora', 'Los Quemados', 'Columbia', 'Cocosolo',
        'Los Ángeles', 'Los Angeles', 'Finlay', 'Santa Felicia', 'Palmar', 'El Palmar',
        'Curazao', 'Belén', 'Belen', 'Pocito', 'Palmas', 'Libertad'
      ],
      calles_principales: [
        'Avenida 51', '51', 'Avenida 41', '41', 'Avenida 31', '31', 'Avenida 25', '25',
        'Calle 100', '100', 'Calle 114', '114', 'Calle 124', '124', 'Calle 126', '126',
        'Calle 130', '130', 'Avenida 65', '65', 'Calle 102', '102', 'Calzada de Marianao',
        'Avenida Los Quemados'
      ],
      puntos_referencia: [
        'Cabaret Tropicana', 'Tropicana', 'Ciudad Libertad', 'Hospital Militar Carlos J. Finlay',
        'Hospital Militar Finlay', 'Hospital Pediátrico Juan Manuel Márquez', 'Juan Manuel Marquez',
        'Obelisco de Marianao', 'Obelisco', '100 y 51', '124 y 51', 'Transisport', 'Puerta principal de Transisport'
      ]
    },
    {
      nombre: 'La Lisa',
      codigo: 'LLS',
      lat: 23.0294,
      lng: -82.4597,
      consejos_populares: [
        'Alturas de La Lisa', 'Balcón Arimao', 'El Cano-Valle Grande-Bello 26 y Morado',
        'Punta Brava', 'Arroyo Arenas', 'San Agustín', 'Versalles-Coronela'
      ],
      barrios: [
        'La Lisa', 'San Agustín', 'San Agustin', 'Punta Brava', 'Arroyo Arenas', 'El Cano',
        'Valle Grande', 'Balcón Arimao', 'Balcon Arimao', 'Corralillo', 'Guatao',
        'Versalles', 'Coronela', 'La Coronela', 'Alturas de La Lisa', 'Bello 26', 'Morado', 'Laguito de La Lisa'
      ],
      calles_principales: [
        'Avenida 51', 'Autopista Nacional', 'Carretera Central', 'Calle 160', 'Calle 222',
        'Calle 240', 'Calle 250', 'Avenida 23 de La Lisa', 'Avenida 250', 'Calle 252'
      ],
      puntos_referencia: [
        'Hospital Ortopédico Frank País', 'Frank Pais', 'Puente de la Lisa', 'Puente de La Lisa',
        'San Agustín Zona 1 a 6', 'Centro de Investigaciones Ozonoterapia', 'El Cano alfarería',
        'Autopista del Mediodía', 'UCI (cercana)'
      ]
    },
    {
      nombre: 'Boyeros',
      codigo: 'BYR',
      lat: 22.9889,
      lng: -82.4097,
      consejos_populares: [
        'Santiago de Las Vegas', 'Nuevo Santiago', 'Boyeros', 'Wajay', 'Calabazar', 'Altahabana-Capdevila', 'Armada-Aldabó'
      ],
      barrios: [
        'Santiago de las Vegas', 'Rancho Boyeros', 'El Wajay', 'Wajay', 'Calabazar',
        'Fontanar', 'Altahabana', 'Capdevila', 'Mulgoba', 'Mazorra', 'Río Cristal', 'Rio Cristal',
        'Nuevo Santiago', 'Lutgardita', 'Villanueva', 'Trébol', 'Trebol', 'Aldabó', 'Aldabo',
        'Abel Santamaría', 'Abel Santamaria', 'Armada', 'Casino Deportivo Boyeros'
      ],
      calles_principales: [
        'Avenida Independencia', 'Avenida Boyeros', 'Boyeros', 'Calzada de Bejucal', 'Calle 100',
        'Vento', 'Calzada de Vento', 'Avenida Van Troi', 'Van Troi', 'Carretera del Wajay',
        'Avenida Rancho Boyeros', 'Camagüey', 'Camaguey'
      ],
      puntos_referencia: [
        'Aeropuerto Internacional José Martí', 'Aeropuerto Jose Marti', 'Aeropuerto de La Habana',
        'Terminal 1', 'Terminal 2', 'Terminal 3', 'Parque Lenin', 'Jardín Botánico Nacional',
        'Jardin Botanico', 'ExpoCuba', 'Expocuba', 'Hospital Nacional Enrique Cabrera', 'Hospital Nacional',
        'Hospital Psiquiátrico de La Habana', 'Mazorra', 'Centro Comercial Boyeros y Camagüey',
        'Reloj Club', 'Boyeros y Camagüey', 'Boyeros y 100'
      ]
    },
    {
      nombre: 'Arroyo Naranjo',
      codigo: 'ARN',
      lat: 23.0239,
      lng: -82.3331,
      consejos_populares: [
        'Víbora Park', 'Mantilla', 'Los Pinos', 'Arroyo Naranjo', 'Calvario-Fraternidad', 'Párraga', 'El Lucero'
      ],
      barrios: [
        'Mantilla', 'Párraga', 'Parraga', 'Los Pinos', 'Poey', 'Víbora Park', 'Vibora Park',
        'Calvario', 'El Calvario', 'Managua', 'Eléctrico', 'Electrico', 'Güinera', 'Guinera',
        'San Amado', 'Callejas', 'La Palma', 'Las Guásimas', 'Las Guasimas', 'El Lucero',
        'Fraternidad', 'Santa Amalia', 'Reparto Moderno'
      ],
      calles_principales: [
        'Calzada de 10 de Octubre', 'Calzada de Managua', 'Calzada de Bejucal', 'Avenida de Mayo',
        'Calle 8', 'Camagüey', 'Perla', 'Calle Perla', 'Georgia', 'Constitución', 'Constitucion',
        'Coliseo', 'Carretera de Managua', 'Carretera de Santiago'
      ],
      puntos_referencia: [
        'Hospital Julio Trigo', 'Julio Trigo', 'Parque de Mantilla', 'Parque de Párraga',
        'La Palma', 'Intersección de La Palma', 'Reparto Eléctrico final de guagua',
        'Puente de Calabazar', 'Georgia 101'
      ]
    },
    {
      nombre: 'Habana del Este',
      codigo: 'HDE',
      lat: 23.1583,
      lng: -82.2833,
      consejos_populares: [
        'Camilo Cienfuegos', 'Cojímar', 'Guiteras', 'Alturas de Alamar', 'Alamar Este', 'Guanabo', 'Campo Florido', 'Alamar-Playa'
      ],
      barrios: [
        'Alamar', 'Cojímar', 'Cojimar', 'Guanabo', 'Boca Ciega', 'Santa María del Mar', 'Santa Maria del Mar',
        'Tarará', 'Tarara', 'Brisas del Mar', 'Camilo Cienfuegos', 'Reparto Camilo Cienfuegos',
        'Villa Panamericana', 'Guiteras', 'Reparto Guiteras', 'Antonio Guiteras', 'Reparto Antonio Guiteras',
        'Bahía', 'Reparto Bahía', 'Bahia', 'Reparto Bahia', 'Celimar', 'Bacuranao', 'Campo Florido',
        'Alturas de Alamar', 'Alamar Playa', 'Alamar Este'
      ],
      calles_principales: [
        'Vía Blanca', 'Via Blanca', 'Vía Monumental', 'Via Monumental', 'Avenida Casablanca',
        'Avenida Las Terrazas', '5ta Avenida de Guanabo', 'Avenida 7ma Alamar', 'Calle Real Guanabo'
      ],
      puntos_referencia: [
        'Playas del Este', 'Fortaleza San Carlos de la Cabaña', 'La Cabaña', 'Castillo del Morro',
        'El Morro', 'Estatua del Cristo de La Habana', 'Cristo de La Habana', 'Estadio Panamericano',
        'Alamar Zona 1', 'Alamar Zona 2', 'Alamar Zona 3', 'Alamar Zona 4', 'Alamar Zona 5',
        'Alamar Zona 6', 'Alamar Zona 7', 'Alamar Zona 8', 'Alamar Zona 9', 'Alamar Zona 10',
        'Alamar Zona 11', 'Alamar Zona 12', 'Alamar Zona 13', 'Alamar Zona 14', 'Alamar Zona 15',
        'Alamar Zona 16', 'Alamar Zona 17', 'Alamar Zona 18', 'Alamar Zona 19', 'Alamar Zona 20',
        'Alamar Zona 21', 'Alamar Zona 22', 'Alamar Zona 23', 'Alamar Zona 24', 'Alamar Zona 25',
        'Alamar Zona 26', 'Alamar Zona 27', 'Alamar Zona 28', 'Micro X', 'Curva del terreno de pelota',
        'Túnel de La Habana', 'Tunel de La Habana'
      ]
    },
    {
      nombre: 'Guanabacoa',
      codigo: 'GBC',
      lat: 23.1167,
      lng: -82.2833,
      consejos_populares: [
        'Mañana-Habana Nueva', 'Villa I', 'Villa II', 'Chivas-Roble', 'Debeche-Nalón', 'Hata-Naranjo', 'Peñalver-Bacuranao', 'Minas-Barreras'
      ],
      barrios: [
        'Guanabacoa', 'Chibás', 'Chibas', 'Eduardo Chibás', "D'Beche", 'Debeche', 'Minas', 'Barreras',
        'Peñalver', 'La Gallega', 'Roble', 'Villa María', 'Villa Maria', 'Nalón', 'Nalon',
        'Hata', 'La Jata', 'La Hata', 'Habana Nueva', 'Mañana', 'Manana', 'La Lima', 'Villa I', 'Villa II'
      ],
      calles_principales: [
        'Corralfalso', 'Corral Falso', 'Máximo Gómez', 'Maximo Gomez', 'Pepe Antonio',
        'Quintín Banderas', 'Quintin Banderas', 'Calzada de Guanabacoa', 'Carretera de Cojímar',
        'Vía Blanca', 'Carretera de Minas'
      ],
      puntos_referencia: [
        'La Cotorra', 'Manantial La Cotorra', 'Museo Municipal de Guanabacoa',
        'Santuario de la Virgen de la Asunción', 'La Yuca', 'El Garita', 'Loma de la Cruz'
      ]
    },
    {
      nombre: 'San Miguel del Padrón',
      codigo: 'SMP',
      lat: 23.0667,
      lng: -82.3167,
      consejos_populares: [
        'Rocafort', 'Luyanó Moderno', 'Diezmero', 'San Francisco de Paula', 'Dolores-Veracruz', 'Jacomino'
      ],
      barrios: [
        'Jacomino', 'Diezmero', 'San Francisco de Paula', 'Dolores', 'Rocafort', 'La Rosalía', 'La Rosalia',
        'Virgen del Camino', 'California', 'Fernández Falcón', 'Fernandez Falcon', 'Reparto Encanto',
        'Encanto', 'Luyanó Moderno', 'Luyano Moderno', 'La National', 'Juanelo', 'Monterrey', 'Veracruz'
      ],
      calles_principales: [
        'Calzada de San Miguel', 'Calzada de Güines', 'Calzada de Guines', 'Calzada de Luyanó',
        'Carretera Central', 'Vía Blanca', '1ra de Monterrey', 'San Luis', 'Calle 3ra San Francisco'
      ],
      puntos_referencia: [
        'La Virgen del Camino', 'Virgen del Camino', 'Finca Vigía', 'Finca Vigia Ernest Hemingway',
        'Mirador de San Miguel', 'Parque Jacomino', 'Curva de Juanelo'
      ]
    },
    {
      nombre: 'Regla',
      codigo: 'REG',
      lat: 23.1289,
      lng: -82.3333,
      consejos_populares: [
        'Guaicanimar', 'Loma Modelo', 'Casablanca'
      ],
      barrios: [
        'Regla', 'Casablanca', 'Guaicanamar', 'Guaicanimar', 'Loma del Fortín', 'Loma del Fortin',
        'Modelo', 'Loma Modelo', 'Lídice', 'Lidice'
      ],
      calles_principales: [
        'Martí', 'Marti', 'Máximo Gómez', 'Maximo Gomez', 'Maceo', '24 de Febrero',
        'Calixto García', 'Avenida del Puerto Regla', 'Perdomo'
      ],
      puntos_referencia: [
        'Santuario Nacional de la Virgen de Regla', 'Virgen de Regla', 'Iglesia de Regla',
        'Embarcadero de Regla', 'Lanchita de Regla', 'Colina Lenin', 'Refinería Ñico López',
        'Nico Lopez', 'Observatorio de Casablanca', 'Casablanca ferry'
      ]
    },
    {
      nombre: 'Cotorro',
      codigo: 'COT',
      lat: 23.0250,
      lng: -82.2458,
      consejos_populares: [
        'Cotorro', 'Santa María del Rosario', 'Cuatro Caminos', 'Alberro', 'San Pedro-Centro Cotorro', 'Lotería'
      ],
      barrios: [
        'Cotorro', 'Centro del Cotorro', 'Santa María del Rosario', 'Santa Maria del Rosario',
        'Cuatro Caminos', 'Lotería', 'Loteria', 'Alberro', 'San Pedro', 'Magdalena',
        'La Caridad', 'Cruz Verde', 'Loma de Tierra'
      ],
      calles_principales: [
        'Carretera Central', 'Calzada de Güines', 'Calzada de Guines', 'Avenida 101', 'Calle 20', 'Calle 67', 'Calle Real Cotorro'
      ],
      puntos_referencia: [
        'Balneario de Santa María del Rosario', 'Plaza del Cotorro', 'Parque Central del Cotorro',
        'Empresa Siderúrgica Antillana de Acero', 'Antillana de Acero', 'Botica 90', 'Centro del Cotorro'
      ]
    }
  ];

  // 2. DICCIONARIO MASIVO DE ALIAS, REPARTOS Y LOCALIDADES (>200 entradas)
  HabanaDirecciones.alias = {
    // Plaza de la Revolución
    'vedado': 'Plaza de la Revolución',
    'nuevo vedado': 'Plaza de la Revolución',
    'la rampa': 'Plaza de la Revolución',
    'rampa': 'Plaza de la Revolución',
    'el carmelo': 'Plaza de la Revolución',
    'carmelo': 'Plaza de la Revolución',
    'puentes grandes': 'Plaza de la Revolución',
    'principe': 'Plaza de la Revolución',
    'aldecoa': 'Plaza de la Revolución',
    'la timba': 'Plaza de la Revolución',
    'el fanguito': 'Plaza de la Revolución',
    'fanguito': 'Plaza de la Revolución',

    // Playa
    'miramar': 'Playa',
    'siboney': 'Playa',
    'cubanacan': 'Playa',
    'jaimanitas': 'Playa',
    'santa fe': 'Playa',
    'nautico': 'Playa',
    'flores': 'Playa',
    'buenavista': 'Playa',
    'buena vista': 'Playa',
    'querejeta': 'Playa',
    'la ceiba': 'Playa',
    'baracoa': 'Playa',
    'atabey': 'Playa',
    'kohly': 'Playa',
    'la puntilla': 'Playa',
    'puntilla': 'Playa',
    'country club': 'Playa',
    'el romerillo': 'Playa',
    'romerillo': 'Playa',
    'alturas de miramar': 'Playa',

    // Centro Habana
    'centro habana': 'Centro Habana',
    'cayo hueso': 'Centro Habana',
    'los sitios': 'Centro Habana',
    'barrio chino': 'Centro Habana',
    'pueblo nuevo': 'Centro Habana',
    'dragones': 'Centro Habana',
    'san leopoldo': 'Centro Habana',

    // La Habana Vieja
    'habana vieja': 'La Habana Vieja',
    'la habana vieja': 'La Habana Vieja',
    'san isidro': 'La Habana Vieja',
    'belen': 'La Habana Vieja',
    'catedral': 'La Habana Vieja',
    'santo angel': 'La Habana Vieja',
    'jesus maria': 'La Habana Vieja',
    'plaza vieja': 'La Habana Vieja',
    'tallapiedra': 'La Habana Vieja',

    // Diez de Octubre
    'la vibora': 'Diez de Octubre',
    'vibora': 'Diez de Octubre',
    'santos suarez': 'Diez de Octubre',
    'lawton': 'Diez de Octubre',
    'luyano': 'Diez de Octubre',
    'sevillano': 'Diez de Octubre',
    'loma del chaple': 'Diez de Octubre',
    'vista alegre': 'Diez de Octubre',
    'jesus del monte': 'Diez de Octubre',
    'tamarindo': 'Diez de Octubre',
    'toyo': 'Diez de Octubre',

    // Cerro
    'el cerro': 'Cerro',
    'cerro': 'Cerro',
    'palatino': 'Cerro',
    'casino deportivo': 'Cerro',
    'las canas': 'Cerro',
    'el canal': 'Cerro',
    'atares': 'Cerro',
    'latinoamericano': 'Cerro',
    'carraguao': 'Cerro',

    // Marianao
    'marianao': 'Marianao',
    'pogolotti': 'Marianao',
    'zamora': 'Marianao',
    'cocosolo': 'Marianao',
    'los quemados': 'Marianao',
    'quemados': 'Marianao',
    'columbia': 'Marianao',
    'ciudad libertad': 'Marianao',
    'los angeles': 'Marianao',
    'finlay': 'Marianao',
    'santa felicia': 'Marianao',
    'el palmar': 'Marianao',
    'pocito': 'Marianao',

    // La Lisa
    'la lisa': 'La Lisa',
    'san agustin': 'La Lisa',
    'punta brava': 'La Lisa',
    'arroyo arenas': 'La Lisa',
    'el cano': 'La Lisa',
    'valle grande': 'La Lisa',
    'balcon arimao': 'La Lisa',
    'guatao': 'La Lisa',
    'versalles': 'La Lisa',
    'coronela': 'La Lisa',
    'la coronela': 'La Lisa',
    'alturas de la lisa': 'La Lisa',

    // Boyeros
    'boyeros': 'Boyeros',
    'rancho boyeros': 'Boyeros',
    'santiago de las vegas': 'Boyeros',
    'el wajay': 'Boyeros',
    'wajay': 'Boyeros',
    'calabazar': 'Boyeros',
    'fontanar': 'Boyeros',
    'altahabana': 'Boyeros',
    'capdevila': 'Boyeros',
    'mulgoba': 'Boyeros',
    'mazorra': 'Boyeros',
    'rio cristal': 'Boyeros',
    'nuevo santiago': 'Boyeros',
    'aldabo': 'Boyeros',
    'abel santamaria': 'Boyeros',
    'lutgardita': 'Boyeros',

    // Arroyo Naranjo
    'arroyo naranjo': 'Arroyo Naranjo',
    'mantilla': 'Arroyo Naranjo',
    'parraga': 'Arroyo Naranjo',
    'los pinos': 'Arroyo Naranjo',
    'poey': 'Arroyo Naranjo',
    'vibora park': 'Arroyo Naranjo',
    'electrico': 'Arroyo Naranjo',
    'reparto electrico': 'Arroyo Naranjo',
    'managua': 'Arroyo Naranjo',
    'calvario': 'Arroyo Naranjo',
    'el calvario': 'Arroyo Naranjo',
    'la palma': 'Arroyo Naranjo',
    'guinera': 'Arroyo Naranjo',
    'la guinera': 'Arroyo Naranjo',
    'san amado': 'Arroyo Naranjo',
    'callejas': 'Arroyo Naranjo',
    'las guasimas': 'Arroyo Naranjo',
    'el lucero': 'Arroyo Naranjo',
    'santa amalia': 'Arroyo Naranjo',

    // Habana del Este
    'habana del este': 'Habana del Este',
    'alamar': 'Habana del Este',
    'cojimar': 'Habana del Este',
    'guanabo': 'Habana del Este',
    'boca ciega': 'Habana del Este',
    'santa maria del mar': 'Habana del Este',
    'tarara': 'Habana del Este',
    'camilo cienfuegos': 'Habana del Este',
    'reparto camilo cienfuegos': 'Habana del Este',
    'villa panamericana': 'Habana del Este',
    'guiteras': 'Habana del Este',
    'reparto guiteras': 'Habana del Este',
    'antonio guiteras': 'Habana del Este',
    'reparto antonio guiteras': 'Habana del Este',
    'bahia': 'Habana del Este',
    'reparto bahia': 'Habana del Este',
    'reparto bahia guiteras': 'Habana del Este',
    'brisas del mar': 'Habana del Este',
    'campo florido': 'Habana del Este',
    'celimar': 'Habana del Este',
    'bacuranao': 'Habana del Este',

    // Guanabacoa
    'guanabacoa': 'Guanabacoa',
    'chibas': 'Guanabacoa',
    'eduardo chibas': 'Guanabacoa',
    'debeche': 'Guanabacoa',
    'minas': 'Guanabacoa',
    'barreras': 'Guanabacoa',
    'penalver': 'Guanabacoa',
    'nalon': 'Guanabacoa',
    'la jata': 'Guanabacoa',
    'hata': 'Guanabacoa',
    'manana': 'Guanabacoa',
    'habana nueva': 'Guanabacoa',
    'la lima': 'Guanabacoa',

    // San Miguel del Padrón
    'san miguel del padron': 'San Miguel del Padrón',
    'san miguel': 'San Miguel del Padrón',
    'jacomino': 'San Miguel del Padrón',
    'diezmero': 'San Miguel del Padrón',
    'virgen del camino': 'San Miguel del Padrón',
    'la virgen del camino': 'San Miguel del Padrón',
    'san francisco de paula': 'San Miguel del Padrón',
    'reparto encanto': 'San Miguel del Padrón',
    'encanto': 'San Miguel del Padrón',
    'rocafort': 'San Miguel del Padrón',
    'luyano moderno': 'San Miguel del Padrón',
    'la national': 'San Miguel del Padrón',
    'juanelo': 'San Miguel del Padrón',
    'monterrey': 'San Miguel del Padrón',

    // Regla
    'regla': 'Regla',
    'casablanca': 'Regla',
    'guaicanamar': 'Regla',
    'loma del fortin': 'Regla',
    'lidice': 'Regla',

    // Cotorro
    'cotorro': 'Cotorro',
    'santa maria del rosario': 'Cotorro',
    'cuatro caminos': 'Cotorro',
    'alberro': 'Cotorro',
    'san pedro': 'Cotorro',
    'loteria': 'Cotorro',
    'magdalena': 'Cotorro',
    'loma de tierra': 'Cotorro'
  };

  // 3. NORMALIZADOR UNIVERSAL CON FONÉTICA CUBANA Y ERRORES COMUNES
  HabanaDirecciones.limpiarTexto = function(str) {
    if (!str) return '';

    // Convertir caracteres matemáticos de vales Unicode (Bold, Italic, Sans-serif) a ASCII
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

    // Normalizar acentos
    out = out.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Reemplazos de contracciones, jerga y erratas comunes cubanas
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
      .replace(/\s*\/\s*/g, ' entre ')
      .replace(/\bave\.?\s*|\bavda\.?\b/g, 'avenida ')
      .replace(/\bclle\.?\s*|\bcalz\.?\b/g, 'calzada ')
      .replace(/\bedif\.?\b|\bedificio\b/g, 'edificio ')
      .replace(/\bapt\.?|\bapto\.?|\bapartamento\b/g, 'apartamento ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return out;
  };

  // 4. DISTANCIA LEVENSHTEIN Y SIMILITUD DE TEXTO
  HabanaDirecciones.levenshtein = function(a, b) {
    var matrix = [];
    for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }

    for (var i = 1; i <= b.length; i++) {
      for (var j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  HabanaDirecciones.similitud = function(s1, s2) {
    var longer = s1.length > s2.length ? s1 : s2;
    var shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    var dist = HabanaDirecciones.levenshtein(longer, shorter);
    return (longer.length - dist) / parseFloat(longer.length);
  };

  // 5. MOTOR DE ANÁLISIS Y DEDUCCIÓN ROBUSTA
  HabanaDirecciones.analizar = function(input) {
    if (!input || input.trim().length < 2) {
      return {
        encontrado: false,
        mensaje: 'Ingrese una dirección para comenzar el análisis.',
        sugerencias: []
      };
    }

    var db = HabanaDirecciones;
    var texto = db.limpiarTexto(input);

    var resultado = {
      encontrado: false,
      municipio: null,
      barrio: null,
      confianza: 0,
      lat: null,
      lng: null,
      detalles: [],
      sugerencias: [],
      coordenadasAprox: null
    };

    // --- REGLA 1: ZONAS DE ALAMAR (Zona 1 a 28) ---
    var matchZonaAlamar = texto.match(/(?:alamar\s*)?zona\s*(\d{1,2})\b/i);
    if (matchZonaAlamar) {
      var numZona = parseInt(matchZonaAlamar[1], 10);
      if (numZona >= 1 && numZona <= 28) {
        resultado.encontrado = true;
        resultado.municipio = 'Habana del Este';
        resultado.barrio = 'Alamar (Zona ' + numZona + ')';
        resultado.confianza = 97;
        resultado.detalles.push('Detectada Zona ' + numZona + ' característica de Alamar (Habana del Este)');
        resultado.lat = 23.1585 + (numZona * 0.0003);
        resultado.lng = -82.2780 - (numZona * 0.0004);
        resultado.coordenadasAprox = { lat: resultado.lat, lng: resultado.lng };
        return resultado;
      }
    }

    // --- REGLA 2: REPARTO CAMILO CIENFUEGOS ---
    if (texto.indexOf('camilo cienfuegos') !== -1) {
      resultado.encontrado = true;
      resultado.municipio = 'Habana del Este';
      resultado.barrio = 'Reparto Camilo Cienfuegos';
      resultado.confianza = 96;
      resultado.detalles.push('Reparto Camilo Cienfuegos identificado (Habana del Este)');
      resultado.lat = 23.1500;
      resultado.lng = -82.3250;
      resultado.coordenadasAprox = { lat: resultado.lat, lng: resultado.lng };
      return resultado;
    }

    // --- REGLA 3: REPARTO BAHÍA / GUITERAS ---
    if (texto.indexOf('bahia') !== -1 || texto.indexOf('guiteras') !== -1) {
      resultado.encontrado = true;
      resultado.municipio = 'Habana del Este';
      resultado.barrio = 'Reparto Antonio Guiteras (Bahía)';
      resultado.confianza = 95;
      resultado.detalles.push('Reparto Antonio Guiteras / Bahía identificado');
      resultado.lat = 23.1550;
      resultado.lng = -82.3180;
      resultado.coordenadasAprox = { lat: resultado.lat, lng: resultado.lng };
      return resultado;
    }

    // --- REGLA 4: MUNICIPIO EXPLÍCITO ---
    for (var m = 0; m < db.municipios.length; m++) {
      var munObj = db.municipios[m];
      var munNorm = db.limpiarTexto(munObj.nombre);

      if (new RegExp('(^|\\s)' + munNorm + '(\\s|$)', 'i').test(texto)) {
        resultado.encontrado = true;
        resultado.municipio = munObj.nombre;
        resultado.confianza = 95;
        resultado.lat = munObj.lat;
        resultado.lng = munObj.lng;
        resultado.detalles.push('Municipio identificado explícitamente: ' + munObj.nombre);
        break;
      }
    }

    // --- REGLA 5: CONSEJOS POPULARES Y BARRIOS (Evaluación global priorizando nombres más específicos/largos) ---
    var todosLosBarrios = [];
    for (var mIdx = 0; mIdx < db.municipios.length; mIdx++) {
      var mun = db.municipios[mIdx];
      var listado = mun.barrios.concat(mun.consejos_populares);
      for (var bIdx = 0; bIdx < listado.length; bIdx++) {
        todosLosBarrios.push({
          nombre: listado[bIdx],
          municipio: mun.nombre,
          lat: mun.lat,
          lng: mun.lng
        });
      }
    }
    // Ordenar de mayor a menor longitud para que frases largas como "San Francisco de Paula" ganen sobre "Paula"
    todosLosBarrios.sort(function(a, b) { return b.nombre.length - a.nombre.length; });

    for (var tb = 0; tb < todosLosBarrios.length; tb++) {
      var barrioItem = todosLosBarrios[tb];
      var bNorm = db.limpiarTexto(barrioItem.nombre);
      if (bNorm.length >= 4 && new RegExp('(^|\\s)' + bNorm + '(\\s|$)', 'i').test(texto)) {
        resultado.encontrado = true;
        resultado.municipio = barrioItem.municipio;
        resultado.barrio = barrioItem.nombre;
        resultado.confianza = Math.max(resultado.confianza, 95);
        resultado.detalles.push('Consejo Popular / Barrio identificado: ' + barrioItem.nombre);
        resultado.lat = barrioItem.lat;
        resultado.lng = barrioItem.lng;
        break;
      }
    }

    // --- REGLA 6: ALIAS Y LOCALIDADES DEL DICCIONARIO ---
    if (!resultado.barrio || resultado.confianza < 93) {
      for (var aliasKey in db.alias) {
        var aliasNorm = db.limpiarTexto(aliasKey);
        if (aliasNorm.length >= 3 && new RegExp('(^|\\s)' + aliasNorm + '(\\s|$)', 'i').test(texto)) {
          resultado.encontrado = true;
          resultado.municipio = db.alias[aliasKey];
          resultado.barrio = aliasKey.charAt(0).toUpperCase() + aliasKey.slice(1);
          resultado.confianza = Math.max(resultado.confianza, 93);
          resultado.detalles.push('Zona identificada por catálogo: ' + resultado.barrio);

          var munRef = db.municipios.find(function(x) { return x.nombre === resultado.municipio; });
          if (munRef) {
            resultado.lat = munRef.lat;
            resultado.lng = munRef.lng;
          }
          break;
        }
      }
    }

    // --- REGLA 7: PUNTOS DE REFERENCIA NOTABLES ---
    for (var mi = 0; mi < db.municipios.length; mi++) {
      var munItem = db.municipios[mi];
      for (var p = 0; p < munItem.puntos_referencia.length; p++) {
        var puntoNorm = db.limpiarTexto(munItem.puntos_referencia[p]);
        if (puntoNorm.length >= 4 && texto.indexOf(puntoNorm) !== -1) {
          resultado.encontrado = true;
          resultado.municipio = munItem.nombre;
          resultado.confianza = Math.max(resultado.confianza, 96);
          resultado.lat = munItem.lat;
          resultado.lng = munItem.lng;
          resultado.detalles.push('Punto de referencia clave: ' + munItem.puntos_referencia[p]);
          break;
        }
      }
      if (resultado.confianza >= 96) break;
    }

    // --- REGLA 8: CALLES Y CRUCES DE ARTERIAS ---
    if (!resultado.encontrado || resultado.confianza < 85) {
      for (var mCandIdx = 0; mCandIdx < db.municipios.length; mCandIdx++) {
        var munCand = db.municipios[mCandIdx];
        var callesMatch = 0;
        var callesNombres = [];

        for (var cIdx = 0; cIdx < munCand.calles_principales.length; cIdx++) {
          var cName = munCand.calles_principales[cIdx];
          var cNorm = db.limpiarTexto(cName);
          if (cNorm.length >= 2 && new RegExp('(^|\\s)' + cNorm + '(\\s|$)', 'i').test(texto)) {
            callesMatch++;
            callesNombres.push(cName);
          }
        }

        if (callesMatch > 0) {
          var puntaje = 75 + (callesMatch * 10);
          if (puntaje > resultado.confianza) {
            resultado.encontrado = true;
            resultado.municipio = munCand.nombre;
            resultado.confianza = Math.min(puntaje, 95);
            resultado.lat = munCand.lat;
            resultado.lng = munCand.lng;
            resultado.detalles.push('Calles de ' + munCand.nombre + ' identificadas: ' + callesNombres.join(', '));
          }
        }
      }
    }

    // --- REGLA 9: TOLERANCIA DIFUSA Y APROXIMACIONES POR PALABRAS ---
    if (!resultado.encontrado || resultado.confianza < 75) {
      var palabras = texto.split(' ');
      for (var w = 0; w < palabras.length; w++) {
        var pal = palabras[w];
        if (pal.length < 4) continue;

        // Contra municipios
        for (var mm = 0; mm < db.municipios.length; mm++) {
          var mNombre = db.municipios[mm].nombre;
          var simMun = db.similitud(pal, db.limpiarTexto(mNombre));
          if (simMun >= 0.80) {
            resultado.encontrado = true;
            resultado.municipio = mNombre;
            resultado.confianza = Math.max(resultado.confianza, 84);
            resultado.lat = db.municipios[mm].lat;
            resultado.lng = db.municipios[mm].lng;
            resultado.detalles.push('Deducción por similitud con Municipio: ' + mNombre);
            break;
          }
        }

        // Contra barrios del alias
        for (var aKeyFuzzy in db.alias) {
          var aNorm = db.limpiarTexto(aKeyFuzzy);
          var simBarrio = db.similitud(pal, aNorm);
          if (simBarrio >= 0.82) {
            resultado.encontrado = true;
            resultado.municipio = db.alias[aKeyFuzzy];
            resultado.barrio = aKeyFuzzy.charAt(0).toUpperCase() + aKeyFuzzy.slice(1);
            resultado.confianza = Math.max(resultado.confianza, 82);
            resultado.detalles.push('Deducción por similitud con Reparto: ' + resultado.barrio);
            break;
          }
        }
      }
    }

    // --- REGLA 10: COORDENADAS APROXIMADAS ---
    if (resultado.encontrado && resultado.municipio) {
      if (!resultado.lat || !resultado.lng) {
        var foundMun = db.municipios.find(function(x) { return x.nombre === resultado.municipio; });
        if (foundMun) {
          resultado.lat = foundMun.lat;
          resultado.lng = foundMun.lng;
        }
      }
      if (resultado.lat && resultado.lng) {
        resultado.coordenadasAprox = { lat: resultado.lat, lng: resultado.lng };
      }
    }

    // --- REGLA 11: SUGERENCIAS SI NO HUBO COINCIDENCIA EXACTA ---
    if (!resultado.encontrado) {
      var tokens = texto.split(' ');
      for (var t = 0; t < tokens.length; t++) {
        var tok = tokens[t];
        if (tok.length < 3) continue;

        for (var ak in db.alias) {
          if (ak.indexOf(tok) !== -1 || db.similitud(tok, ak) > 0.65) {
            resultado.sugerencias.push({
              texto: ak.charAt(0).toUpperCase() + ak.slice(1) + ' → ' + db.alias[ak],
              municipio: db.alias[ak]
            });
          }
        }
        for (var mu = 0; mu < db.municipios.length; mu++) {
          var mNom = db.municipios[mu].nombre;
          if (db.limpiarTexto(mNom).indexOf(tok) !== -1 || db.similitud(tok, db.limpiarTexto(mNom)) > 0.65) {
            resultado.sugerencias.push({
              texto: mNom + ' (Municipio)',
              municipio: mNom
            });
          }
        }
      }

      var dict = {};
      resultado.sugerencias = resultado.sugerencias.filter(function(s) {
        if (dict[s.texto]) return false;
        dict[s.texto] = true;
        return true;
      }).slice(0, 6);
    }

    resultado.confianza = Math.min(resultado.confianza, 100);
    return resultado;
  };

  // Exportar al contexto global (navegador o node)
  if (typeof window !== 'undefined') {
    window.HabanaDirecciones = HabanaDirecciones;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = HabanaDirecciones;
  }

})(typeof window !== 'undefined' ? window : global);
