// ============================================
// ALGORITMO ROBUSTO DE DIRECCIONES DE LA HABANA (MOTOR DE TRIANGULACIÓN MULTI-HIPÓTESIS 3.0)
// Capaz de triangular múltiples vías, calcular intersecciones y porcentajes de probabilidad,
// rankear las mejores opciones y devolver respuestas primarias y alternativas.
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
        'Ampliación Almendares', 'Alturas de Miramar', 'Alturas del Bosque', 'Ceiba'
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
        'Luyanó', 'Luyano', 'Santos Suárez', 'Santos Suarez', 'La Víbora', 'La Vibora', 'Víbora', 'Vibora',
        'Lawton', 'Sevillano', 'Loma del Chaple', 'Chaple',
        'Vista Alegre', 'Jesús del Monte', 'Jesus del Monte', 'Tamarindo', 'Acosta',
        'Santa Amalia', 'El Pilar', 'Goyle', 'Revolución'
      ],
      calles_principales: [
        'Calzada de 10 de Octubre', '10 de Octubre', 'Diez de Octubre', 'Santa Catalina',
        'Juan Delgado', 'Acosta', 'Lacret', 'Goucuria', 'Gooicuría', 'Goicuría', 'Goicuria',
        'General Lee', 'Patrocinio', 'San Mariano', 'San Francisco', 'Porvenir', 'Dolores',
        'Concepción', 'Concepcion', '16 de Octubre', 'Calzada de Luyanó', 'Calzada de Luyano',
        'Calzada de Jesús del Monte', 'Santa Ana', 'Ensenada', 'Fábrica', 'Fabrica', 'Severidad',
        'Calle B Lawton', 'Tejar', 'San Nicolás', 'Carmen', 'Milagros', 'Santa Irene',
        // Calles cruciales de Luyanó
        'Rodríguez', 'Rodriguez', 'Calle Rodríguez', 'Calle Rodriguez',
        'Concha', 'Calzada de Concha', 'Ramón Pintó', 'Ramon Pinto',
        'Vía Blanca', 'Via Blanca', 'Agua Dulce', 'Manuel Pruna', 'Rosa Enríquez', 'Acierto', 'Justicia'
      ],
      puntos_referencia: [
        'Esquina de Toyo', 'Toyo', 'Panadería de Toyo', 'Panaderia de Toyo', 'Parque de Santos Suárez',
        'Parque Góngora', 'Parque Gongora', 'Parque de los Chivos', 'Hospital Hijas de Galicia',
        'Hospital 10 de Octubre', 'La Dependiente', 'Santa Catalina y Juan Delgado', 'Lacret y Juan Delgado',
        'Rodriguez final', 'Concha y Vía Blanca', 'Servicentro Agua Dulce', 'Fábrica y Concha'
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
        'Cristina', 'San Francisco Cerro', 'Aranguren', 'Pérez', 'Perez', 'Calvo', 'Vía Blanca'
      ],
      puntos_referencia: [
        'Estadio Latinoamericano', 'El Latino', 'Mercado de Cuatro Caminos', 'Cuatro Caminos',
        'Fábrica de Cerveza Polar', 'Hospital Clínico Quirúrgico del Cerro', 'La Covadonga',
        'Hospital Salvador Allende', 'Parque Galicia', 'Ministerio de la Agricultura', 'MINAG',
        'Puentes Grandes (Cerro)', 'Tulipán y Conill', 'Ciudad Deportiva'
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
        'Calle 130', '130', 'Avenida 65', '65', 'Calle 102', '102', 'Calzada de Marianao'
      ],
      puntos_referencia: [
        'Cabaret Tropicana', 'Tropicana', 'Ciudad Libertad', 'Hospital Militar Carlos J. Finlay',
        'Hospital Militar Finlay', 'Hospital Pediátrico Juan Manuel Márquez',
        'Obelisco de Marianao', 'Obelisco', '100 y 51', '124 y 51', 'Transisport'
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
        'Versalles', 'Coronela', 'La Coronela', 'Alturas de La Lisa', 'Bello 26', 'Morado'
      ],
      calles_principales: [
        'Avenida 51', 'Autopista Nacional', 'Carretera Central', 'Calle 160', 'Calle 222',
        'Calle 240', 'Calle 250', 'Avenida 23 de La Lisa', 'Avenida 250', 'Calle 252'
      ],
      puntos_referencia: [
        'Hospital Ortopédico Frank País', 'Puente de la Lisa', 'San Agustín Zona 1 a 6',
        'Centro de Investigaciones Ozonoterapia', 'El Cano alfarería', 'Autopista del Mediodía'
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
        'Abel Santamaría', 'Abel Santamaria'
      ],
      calles_principales: [
        'Avenida Independencia', 'Avenida Boyeros', 'Boyeros', 'Calzada de Bejucal', 'Calle 100',
        'Vento', 'Calzada de Vento', 'Avenida Van Troi', 'Van Troi', 'Carretera del Wajay',
        'Camagüey', 'Camaguey'
      ],
      puntos_referencia: [
        'Aeropuerto Internacional José Martí', 'Terminal 1', 'Terminal 2', 'Terminal 3',
        'Parque Lenin', 'Jardín Botánico Nacional', 'ExpoCuba', 'Hospital Nacional Enrique Cabrera',
        'Hospital Psiquiátrico de La Habana', 'Mazorra', 'Centro Comercial Boyeros y Camagüey', 'Reloj Club'
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
        'San Amado', 'Callejas', 'La Palma', 'Las Guásimas', 'El Lucero', 'Fraternidad', 'Santa Amalia'
      ],
      calles_principales: [
        'Calzada de 10 de Octubre', 'Calzada de Managua', 'Calzada de Bejucal', 'Avenida de Mayo',
        'Calle 8', 'Camagüey', 'Perla', 'Calle Perla', 'Georgia', 'Constitución', 'Coliseo'
      ],
      puntos_referencia: [
        'Hospital Julio Trigo', 'Parque de Mantilla', 'Parque de Párraga',
        'La Palma', 'Intersección de La Palma', 'Reparto Eléctrico final de guagua', 'Puente de Calabazar'
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
        'Alamar', 'Cojímar', 'Cojimar', 'Guanabo', 'Boca Ciega', 'Santa María del Mar',
        'Tarará', 'Brisas del Mar', 'Camilo Cienfuegos', 'Reparto Camilo Cienfuegos',
        'Villa Panamericana', 'Guiteras', 'Reparto Guiteras', 'Antonio Guiteras', 'Reparto Antonio Guiteras',
        'Bahía', 'Reparto Bahía', 'Bahia', 'Reparto Bahia', 'Celimar', 'Bacuranao', 'Campo Florido'
      ],
      calles_principales: [
        'Vía Blanca', 'Via Blanca', 'Vía Monumental', 'Via Monumental', 'Avenida Casablanca',
        'Avenida Las Terrazas', '5ta Avenida de Guanabo', 'Avenida 7ma Alamar', 'Calle Real Guanabo'
      ],
      puntos_referencia: [
        'Playas del Este', 'Fortaleza San Carlos de la Cabaña', 'Castillo del Morro',
        'Estatua del Cristo de La Habana', 'Estadio Panamericano',
        'Alamar Zona 1', 'Alamar Zona 2', 'Alamar Zona 3', 'Alamar Zona 4', 'Alamar Zona 5',
        'Alamar Zona 6', 'Alamar Zona 7', 'Alamar Zona 8', 'Alamar Zona 9', 'Alamar Zona 10',
        'Alamar Zona 11', 'Alamar Zona 12', 'Alamar Zona 13', 'Alamar Zona 14', 'Alamar Zona 15',
        'Alamar Zona 16', 'Alamar Zona 17', 'Alamar Zona 18', 'Alamar Zona 19', 'Alamar Zona 20',
        'Alamar Zona 21', 'Alamar Zona 22', 'Alamar Zona 23', 'Alamar Zona 24', 'Alamar Zona 25',
        'Alamar Zona 26', 'Alamar Zona 27', 'Alamar Zona 28', 'Micro X', 'Curva del terreno de pelota',
        'Túnel de La Habana'
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
        'Peñalver', 'La Gallega', 'Roble', 'Villa María', 'Nalón', 'Hata', 'La Jata', 'Habana Nueva', 'Mañana', 'La Lima'
      ],
      calles_principales: [
        'Corralfalso', 'Corral Falso', 'Máximo Gómez', 'Pepe Antonio', 'Quintín Banderas',
        'Calzada de Guanabacoa', 'Carretera de Cojímar', 'Vía Blanca', 'Carretera de Minas'
      ],
      puntos_referencia: [
        'La Cotorra', 'Manantial La Cotorra', 'Museo Municipal de Guanabacoa',
        'Santuario de la Virgen de la Asunción', 'La Yuca', 'El Garita'
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
        'Jacomino', 'Diezmero', 'San Francisco de Paula', 'Dolores', 'Rocafort', 'La Rosalía',
        'Virgen del Camino', 'California', 'Fernández Falcón', 'Reparto Encanto', 'Encanto',
        'Luyanó Moderno', 'La National', 'Juanelo', 'Monterrey', 'Veracruz'
      ],
      calles_principales: [
        'Calzada de San Miguel', 'Calzada de Güines', 'Calzada de Luyanó',
        'Carretera Central', 'Vía Blanca', '1ra de Monterrey', 'San Luis', 'Calle 3ra San Francisco'
      ],
      puntos_referencia: [
        'La Virgen del Camino', 'Finca Vigía', 'Mirador de San Miguel', 'Parque Jacomino', 'Curva de Juanelo'
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
        'Regla', 'Casablanca', 'Guaicanamar', 'Guaicanimar', 'Loma del Fortín', 'Modelo', 'Loma Modelo', 'Lídice'
      ],
      calles_principales: [
        'Martí', 'Máximo Gómez', 'Maceo', '24 de Febrero', 'Calixto García', 'Avenida del Puerto Regla', 'Perdomo', 'Vía Blanca'
      ],
      puntos_referencia: [
        'Santuario Nacional de la Virgen de Regla', 'Embarcadero de Regla', 'Lanchita de Regla',
        'Colina Lenin', 'Refinería Ñico López', 'Observatorio de Casablanca'
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
        'Cotorro', 'Centro del Cotorro', 'Santa María del Rosario', 'Cuatro Caminos',
        'Lotería', 'Alberro', 'San Pedro', 'Magdalena', 'La Caridad', 'Loma de Tierra'
      ],
      calles_principales: [
        'Carretera Central', 'Calzada de Güines', 'Avenida 101', 'Calle 20', 'Calle 67', 'Calle Real Cotorro'
      ],
      puntos_referencia: [
        'Balneario de Santa María del Rosario', 'Plaza del Cotorro', 'Parque Central del Cotorro',
        'Antillana de Acero', 'Botica 90', 'Centro del Cotorro'
      ]
    }
  ];

  // 2. DICCIONARIO DE PUNTOS CLAVE Y CRUCES TRIANGULADOS ESPECÍFICOS (Coordenadas de alta precisión)
  HabanaDirecciones.crucesFrecuentes = [
    {
      tokens: ['rodriguez', 'concha', 'via blanca'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Calle Rodríguez final e/ Calzada de Concha y Vía Blanca (Luyanó)',
      lat: 23.1102,
      lng: -82.3556,
      confianza: 98
    },
    {
      tokens: ['rodriguez', 'concha'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Calle Rodríguez y Calzada de Concha (Luyanó)',
      lat: 23.1115,
      lng: -82.3582,
      confianza: 96
    },
    {
      tokens: ['concha', 'via blanca'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Confluencia Calzada de Concha y Vía Blanca (Luyanó)',
      lat: 23.1098,
      lng: -82.3542,
      confianza: 96
    },
    {
      tokens: ['23', 'l'],
      municipio: 'Plaza de la Revolución',
      barrio: 'Vedado (La Rampa)',
      descripcion: 'Calle 23 y L, Cine Yara / Hotel Habana Libre',
      lat: 23.1394,
      lng: -82.3831,
      confianza: 98
    },
    {
      tokens: ['100', '51'],
      municipio: 'Marianao',
      barrio: 'Marianao Central',
      descripcion: 'Calle 100 y Avenida 51 (Obelisco / Ciudad Libertad)',
      lat: 23.0850,
      lng: -82.4310,
      confianza: 97
    },
    {
      tokens: ['tulipan', 'conill'],
      municipio: 'Cerro',
      barrio: 'Nuevo Vedado / Palatino',
      descripcion: 'Tulipán y Conill, frente al Ministerio de la Agricultura',
      lat: 23.1195,
      lng: -82.3912,
      confianza: 97
    },
    {
      tokens: ['lacret', 'juan delgado'],
      municipio: 'Diez de Octubre',
      barrio: 'Santos Suárez',
      descripcion: 'Calle Lacret y Juan Delgado (Santos Suárez)',
      lat: 23.0975,
      lng: -82.3735,
      confianza: 96
    },
    {
      tokens: ['lacret', 'goicuria'],
      municipio: 'Diez de Octubre',
      barrio: 'Santos Suárez',
      descripcion: 'Calle Lacret y Goicuría (Santos Suárez)',
      lat: 23.0970,
      lng: -82.3722,
      confianza: 96
    },
    {
      tokens: ['santa ana', 'ensenada'],
      municipio: 'Diez de Octubre',
      barrio: 'Luyanó',
      descripcion: 'Santa Ana e/ Ensenada y Atarés, cerca de Toyo',
      lat: 23.1090,
      lng: -82.3600,
      confianza: 97
    }
  ];

  // 3. DICCIONARIO GENERAL DE ALIAS Y REPARTOS
  HabanaDirecciones.alias = {
    // Plaza
    'vedado': 'Plaza de la Revolución', 'nuevo vedado': 'Plaza de la Revolución',
    'la rampa': 'Plaza de la Revolución', 'rampa': 'Plaza de la Revolución',
    'el carmelo': 'Plaza de la Revolución', 'carmelo': 'Plaza de la Revolución',
    'puentes grandes': 'Plaza de la Revolución', 'principe': 'Plaza de la Revolución',
    'la timba': 'Plaza de la Revolución', 'fanguito': 'Plaza de la Revolución',
    // Playa
    'miramar': 'Playa', 'siboney': 'Playa', 'cubanacan': 'Playa',
    'jaimanitas': 'Playa', 'santa fe': 'Playa', 'nautico': 'Playa',
    'flores': 'Playa', 'buenavista': 'Playa', 'buena vista': 'Playa',
    'querejeta': 'Playa', 'la ceiba': 'Playa', 'baracoa': 'Playa',
    'atabey': 'Playa', 'kohly': 'Playa', 'la puntilla': 'Playa',
    'country club': 'Playa', 'el romerillo': 'Playa', 'alturas de miramar': 'Playa',
    // Centro Habana
    'centro habana': 'Centro Habana', 'cayo hueso': 'Centro Habana',
    'los sitios': 'Centro Habana', 'barrio chino': 'Centro Habana',
    'pueblo nuevo': 'Centro Habana', 'dragones': 'Centro Habana',
    // Habana Vieja
    'habana vieja': 'La Habana Vieja', 'san isidro': 'La Habana Vieja',
    'belen': 'La Habana Vieja', 'catedral': 'La Habana Vieja',
    'santo angel': 'La Habana Vieja', 'jesus maria': 'La Habana Vieja',
    'plaza vieja': 'La Habana Vieja', 'tallapiedra': 'La Habana Vieja',
    // Diez de Octubre
    'luyano': 'Diez de Octubre', 'la vibora': 'Diez de Octubre',
    'vibora': 'Diez de Octubre', 'santos suarez': 'Diez de Octubre',
    'lawton': 'Diez de Octubre', 'sevillano': 'Diez de Octubre',
    'loma del chaple': 'Diez de Octubre', 'vista alegre': 'Diez de Octubre',
    'jesus del monte': 'Diez de Octubre', 'tamarindo': 'Diez de Octubre',
    'toyo': 'Diez de Octubre',
    // Cerro
    'cerro': 'Cerro', 'el cerro': 'Cerro', 'palatino': 'Cerro',
    'casino deportivo': 'Cerro', 'las canas': 'Cerro', 'el canal': 'Cerro',
    'atares': 'Cerro', 'latinoamericano': 'Cerro',
    // Marianao
    'marianao': 'Marianao', 'pogolotti': 'Marianao', 'zamora': 'Marianao',
    'cocosolo': 'Marianao', 'los quemados': 'Marianao', 'columbia': 'Marianao',
    'ciudad libertad': 'Marianao', 'los angeles': 'Marianao',
    // La Lisa
    'la lisa': 'La Lisa', 'san agustin': 'La Lisa', 'punta brava': 'La Lisa',
    'arroyo arenas': 'La Lisa', 'el cano': 'La Lisa', 'valle grande': 'La Lisa',
    'balcon arimao': 'La Lisa', 'guatao': 'La Lisa', 'versalles': 'La Lisa',
    // Boyeros
    'boyeros': 'Boyeros', 'rancho boyeros': 'Boyeros', 'santiago de las vegas': 'Boyeros',
    'el wajay': 'Boyeros', 'wajay': 'Boyeros', 'calabazar': 'Boyeros',
    'fontanar': 'Boyeros', 'altahabana': 'Boyeros', 'capdevila': 'Boyeros',
    'mazorra': 'Boyeros', 'aldabo': 'Boyeros', 'abel santamaria': 'Boyeros',
    // Arroyo Naranjo
    'arroyo naranjo': 'Arroyo Naranjo', 'mantilla': 'Arroyo Naranjo',
    'parraga': 'Arroyo Naranjo', 'los pinos': 'Arroyo Naranjo',
    'poey': 'Arroyo Naranjo', 'vibora park': 'Arroyo Naranjo',
    'electrico': 'Arroyo Naranjo', 'managua': 'Arroyo Naranjo',
    'calvario': 'Arroyo Naranjo', 'la palma': 'Arroyo Naranjo',
    'guinera': 'Arroyo Naranjo',
    // Habana del Este
    'habana del este': 'Habana del Este', 'alamar': 'Habana del Este',
    'cojimar': 'Habana del Este', 'guanabo': 'Habana del Este',
    'boca ciega': 'Habana del Este', 'santa maria del mar': 'Habana del Este',
    'tarara': 'Habana del Este', 'camilo cienfuegos': 'Habana del Este',
    'reparto camilo cienfuegos': 'Habana del Este', 'villa panamericana': 'Habana del Este',
    'guiteras': 'Habana del Este', 'antonio guiteras': 'Habana del Este',
    'bahia': 'Habana del Este', 'reparto bahia': 'Habana del Este',
    // Guanabacoa
    'guanabacoa': 'Guanabacoa', 'chibas': 'Guanabacoa', 'debeche': 'Guanabacoa',
    'minas': 'Guanabacoa', 'barreras': 'Guanabacoa', 'penalver': 'Guanabacoa',
    'la jata': 'Guanabacoa', 'hata': 'Guanabacoa', 'manana': 'Guanabacoa',
    // San Miguel
    'san miguel del padron': 'San Miguel del Padrón', 'san miguel': 'San Miguel del Padrón',
    'jacomino': 'San Miguel del Padrón', 'diezmero': 'San Miguel del Padrón',
    'virgen del camino': 'San Miguel del Padrón', 'san francisco de paula': 'San Miguel del Padrón',
    'reparto encanto': 'San Miguel del Padrón', 'encanto': 'San Miguel del Padrón',
    'luyano moderno': 'San Miguel del Padrón', 'juanelo': 'San Miguel del Padrón',
    // Regla
    'regla': 'Regla', 'casablanca': 'Regla', 'guaicanamar': 'Regla',
    // Cotorro
    'cotorro': 'Cotorro', 'santa maria del rosario': 'Cotorro',
    'cuatro caminos': 'Cotorro', 'alberro': 'Cotorro', 'san pedro': 'Cotorro'
  };

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

  // 5. DISTANCIA LEVENSHTEIN Y SIMILITUD
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

  // 6. MOTOR DE TRIANGULACIÓN MULTI-HIPÓTESIS
  HabanaDirecciones.analizar = function(input) {
    if (!input || input.trim().length < 2) {
      return {
        encontrado: false,
        mensaje: 'Ingrese una dirección para comenzar el análisis.',
        sugerencias: [],
        respuestas: []
      };
    }

    var db = HabanaDirecciones;
    var texto = db.limpiarTexto(input);

    // Lista de candidatos o hipótesis ordenadas por score de probabilidad
    var candidatos = [];

    function registrarCandidato(municipio, barrio, puntaje, detalle, lat, lng) {
      var munObj = db.municipios.find(function(m) { return m.nombre === municipio; });
      var finalLat = lat || (munObj ? munObj.lat : null);
      var finalLng = lng || (munObj ? munObj.lng : null);

      var existente = candidatos.find(function(c) {
        return c.municipio === municipio;
      });

      if (existente) {
        // Acumular puntaje por mayor coherencia de evidencias y triangulación
        existente.puntaje = Math.max(existente.puntaje, puntaje) + 4;
        if (barrio && !existente.barrio) {
          existente.barrio = barrio;
        }
        if (detalle && existente.detalles.indexOf(detalle) === -1) {
          existente.detalles.push(detalle);
        }
        // Preservar coordenadas específicas de intersecciones
        if (lat && lng && (!existente.latEspecifica)) {
          existente.lat = lat;
          existente.lng = lng;
          existente.latEspecifica = true;
        }
      } else {
        candidatos.push({
          municipio: municipio,
          barrio: barrio,
          puntaje: puntaje,
          detalles: detalle ? [detalle] : [],
          lat: finalLat,
          lng: finalLng,
          latEspecifica: !!(lat && lng)
        });
      }
    }

    // ------------------------------------------------------------------------
    // FASE A: TRIANGULACIÓN DIRECTA DE CRUCES Y NODOS FRECUENTES
    // ------------------------------------------------------------------------
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
          cruce.lng
        );
      }
    }

    // ------------------------------------------------------------------------
    // FASE B: DETECCIÓN DE ZONAS ALAMAR Y REPARTOS ESPECÍFICOS
    // ------------------------------------------------------------------------
    var matchZonaAlamar = texto.match(/(?:alamar\s*)?zona\s*(\d{1,2})\b/i);
    if (matchZonaAlamar) {
      var numZona = parseInt(matchZonaAlamar[1], 10);
      if (numZona >= 1 && numZona <= 28) {
        registrarCandidato(
          'Habana del Este',
          'Alamar (Zona ' + numZona + ')',
          97,
          'Zona ' + numZona + ' característica de Alamar',
          23.1585 + (numZona * 0.0003),
          -82.2780 - (numZona * 0.0004)
        );
      }
    }

    if (texto.indexOf('camilo cienfuegos') !== -1) {
      registrarCandidato(
        'Habana del Este',
        'Reparto Camilo Cienfuegos',
        96,
        'Reparto Camilo Cienfuegos identificado',
        23.1500,
        -82.3250
      );
    }

    if (texto.indexOf('bahia') !== -1 || texto.indexOf('guiteras') !== -1) {
      registrarCandidato(
        'Habana del Este',
        'Reparto Antonio Guiteras (Bahía)',
        95,
        'Reparto Antonio Guiteras / Bahía identificado',
        23.1550,
        -82.3180
      );
    }

    // ------------------------------------------------------------------------
    // FASE C: DETECCIÓN DE MUNICIPIOS EXPLÍCITOS
    // ------------------------------------------------------------------------
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
          munObj.lng
        );
      }
    }

    // ------------------------------------------------------------------------
    // FASE D: CONSEJOS POPULARES Y BARRIOS (GLOBAL Y ORDENADOS POR ESPECIFICIDAD)
    // ------------------------------------------------------------------------
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
    todosLosBarrios.sort(function(a, b) { return b.nombre.length - a.nombre.length; });

    for (var tb = 0; tb < todosLosBarrios.length; tb++) {
      var bItem = todosLosBarrios[tb];
      var bNorm = db.limpiarTexto(bItem.nombre);
      if (bNorm.length >= 4 && new RegExp('(^|\\s)' + bNorm + '(\\s|$)', 'i').test(texto)) {
        registrarCandidato(
          bItem.municipio,
          bItem.nombre,
          95,
          'Consejo Popular / Barrio identificado: ' + bItem.nombre,
          bItem.lat,
          bItem.lng
        );
      }
    }

    // ------------------------------------------------------------------------
    // FASE E: DICCIONARIO DE ALIAS Y LOCALIDADES
    // ------------------------------------------------------------------------
    for (var aliasKey in db.alias) {
      var aliasNorm = db.limpiarTexto(aliasKey);
      if (aliasNorm.length >= 3 && new RegExp('(^|\\s)' + aliasNorm + '(\\s|$)', 'i').test(texto)) {
        var munTarget = db.alias[aliasKey];
        var munRef = db.municipios.find(function(x) { return x.nombre === munTarget; });
        registrarCandidato(
          munTarget,
          aliasKey.charAt(0).toUpperCase() + aliasKey.slice(1),
          93,
          'Localidad / Reparto de catálogo: ' + aliasKey,
          munRef ? munRef.lat : null,
          munRef ? munRef.lng : null
        );
      }
    }

    // ------------------------------------------------------------------------
    // FASE F: TRIANGULACIÓN POR CALLES EN CADA MUNICIPIO (Conteo de Coincidencias)
    // Si una dirección contiene múltiples calles que pertenecen a un municipio,
    // ese municipio recibe un boost exponencial de triangulación.
    // ------------------------------------------------------------------------
    for (var mc = 0; mc < db.municipios.length; mc++) {
      var mItem = db.municipios[mc];
      var matchCalles = [];
      var normVistas = [];

      for (var c = 0; c < mItem.calles_principales.length; c++) {
        var calle = mItem.calles_principales[c];
        var calleNorm = db.limpiarTexto(calle);

        if (calleNorm.length >= 3 && new RegExp('(^|\\s)' + calleNorm + '(\\s|$)', 'i').test(texto)) {
          // Normalizar para evitar duplicados como 'Vía Blanca' y 'Via Blanca'
          if (normVistas.indexOf(calleNorm) === -1) {
            normVistas.push(calleNorm);
            matchCalles.push(calle);
          }
        }
      }

      if (matchCalles.length >= 2) {
        // Múltiples calles trianguladas en el mismo municipio (ej. Rodríguez + Concha + Vía Blanca)
        var puntajeTriangulado = 90 + Math.min(matchCalles.length * 4, 8);
        registrarCandidato(
          mItem.nombre,
          null,
          puntajeTriangulado,
          'Triangulación vial múltiple (' + matchCalles.length + ' vías): ' + matchCalles.join(', '),
          mItem.lat,
          mItem.lng
        );
      } else if (matchCalles.length === 1) {
        // Una sola calle: si es una gran arteria compartida como Vía Blanca, asignar probabilidad moderada
        var scoreCalle = (calleNorm === 'via blanca' || calleNorm === 'carretera central') ? 70 : 80;
        registrarCandidato(
          mItem.nombre,
          null,
          scoreCalle,
          'Vía identificada: ' + matchCalles[0],
          mItem.lat,
          mItem.lng
        );
      }
    }

    // ------------------------------------------------------------------------
    // FASE G: PUNTOS DE REFERENCIA NOTABLES
    // ------------------------------------------------------------------------
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
            munPunto.lng
          );
        }
      }
    }

    // ------------------------------------------------------------------------
    // FASE H: TOLERANCIA DIFUSA Y APROXIMACIONES SI NO HAY CANDIDATOS SÓLIDOS
    // ------------------------------------------------------------------------
    if (candidatos.length === 0 || candidatos[0].puntaje < 75) {
      var palabras = texto.split(' ');
      for (var w = 0; w < palabras.length; w++) {
        var pal = palabras[w];
        if (pal.length < 4) continue;

        for (var mm = 0; mm < db.municipios.length; mm++) {
          var mNombre = db.municipios[mm].nombre;
          var simMun = db.similitud(pal, db.limpiarTexto(mNombre));
          if (simMun >= 0.80) {
            registrarCandidato(
              mNombre,
              null,
              84,
              'Similitud fonética con municipio: ' + mNombre,
              db.municipios[mm].lat,
              db.municipios[mm].lng
            );
          }
        }

        for (var aKeyFuzzy in db.alias) {
          var aNorm = db.limpiarTexto(aKeyFuzzy);
          var simBarrio = db.similitud(pal, aNorm);
          if (simBarrio >= 0.82) {
            var mAlias = db.alias[aKeyFuzzy];
            var mObj = db.municipios.find(function(x) { return x.nombre === mAlias; });
            registrarCandidato(
              mAlias,
              aKeyFuzzy.charAt(0).toUpperCase() + aKeyFuzzy.slice(1),
              82,
              'Similitud fonética con reparto: ' + aKeyFuzzy,
              mObj ? mObj.lat : null,
              mObj ? mObj.lng : null
            );
          }
        }
      }
    }

    // ------------------------------------------------------------------------
    // FASE I: CÁLCULO DE PROBABILIDAD RELATIVA (%) Y RANKING MULTI-HIPÓTESIS
    // ------------------------------------------------------------------------
    if (candidatos.length === 0) {
      return {
        encontrado: false,
        mensaje: 'No se encontraron coincidencias para la dirección indicada.',
        sugerencias: [],
        respuestas: []
      };
    }

    // Ordenar candidatos por puntaje de mayor a menor
    candidatos.sort(function(a, b) {
      return b.puntaje - a.puntaje;
    });

    // Calcular distribución porcentual normalizada (probabilidades relativas con peso exponencial en score)
    var pesosExponenciales = candidatos.map(function(c) {
      return Math.pow(c.puntaje / 10, 3);
    });
    var sumaPesos = 0;
    pesosExponenciales.forEach(function(p) { sumaPesos += p; });

    var respuestas = candidatos.slice(0, 4).map(function(c, idx) {
      var prob = Math.round((pesosExponenciales[idx] / sumaPesos) * 100);
      var confianzaNormalizada = Math.min(c.puntaje, 99);
      return {
        ranking: idx + 1,
        municipio: c.municipio,
        barrio: c.barrio,
        confianza: confianzaNormalizada,
        probabilidad: Math.max(prob, 1),
        detalles: c.detalles,
        lat: c.lat,
        lng: c.lng,
        coordenadasAprox: (c.lat && c.lng) ? { lat: c.lat, lng: c.lng } : null
      };
    });

    // El primer resultado es la hipótesis principal
    var principal = respuestas[0];

    return {
      encontrado: true,
      municipio: principal.municipio,
      barrio: principal.barrio,
      confianza: principal.confianza,
      probabilidad: principal.probabilidad,
      lat: principal.lat,
      lng: principal.lng,
      coordenadasAprox: principal.coordenadasAprox,
      detalles: principal.detalles,
      respuestas: respuestas, // Múltiples hipótesis rankeadas con probabilidades
      sugerencias: []
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
