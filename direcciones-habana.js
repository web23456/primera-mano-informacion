// ============================================
// ALGORITMO ROBUSTO DE DIRECCIONES DE LA HABANA
// Base de datos exhaustiva y normalizador geográfico
// Cubre los 15 Municipios, barrios, repartos, calles, arterias y puntos de referencia
// ============================================

window.HabanaDirecciones = {
  municipios: [
    {
      nombre: "Playa",
      codigo: "PLY",
      barrios: [
        "Miramar", "Flores", "Almendares", "Sierra", "Kohly", "Buenavista",
        "Querejeta", "La Ceiba", "Jaimanitas", "Santa Fe", "Baracoa", "Siboney",
        "Atabey", "Cubanacán", "Náutico", "La Puntilla", "Country Club"
      ],
      calles_principales: [
        "1ra", "3ra", "5ta", "5ta Avenida", "7ma", "9na", "11", "13", "19", "31",
        "41", "42", "44", "60", "70", "84", "110", "146", "222", "230", "240"
      ],
      puntos_referencia: [
        "Hotel Melia Habana", "Acuario Nacional", "Marina Hemingway", "Palacio de Convenciones",
        "CIMEQ", "La Maison", "Complejo Neptuno-Triton", "5ta y 42", "Embajada de Rusia",
        "La Puntilla", "Teatro Karl Marx", "Parque Metropolitano", "Parque Almendares"
      ]
    },
    {
      nombre: "Plaza de la Revolución",
      codigo: "PLZ",
      barrios: [
        "Vedado", "Nuevo Vedado", "Plaza", "Puentes Grandes", "Aldecoa", "Rampa", "Carmelo"
      ],
      calles_principales: [
        "Linea", "23", "25", "21", "17", "15", "19", "12", "G", "Avenida de los Presidentes",
        "Paseo", "L", "M", "N", "O", "K", "J", "I", "H", "Zapata", "26", "Boyeros",
        "Carlos III", "Salvador Allende", "Infanta", "Malecon"
      ],
      puntos_referencia: [
        "Plaza de la Revolucion", "Memorial Jose Marti", "Hotel Nacional", "Hotel Habana Libre",
        "Coppelia", "Cine Yara", "Universidad de La Habana", "Hospital Hermanos Ameijeiras",
        "Hospital Calixto Garcia", "Cementerio de Colon", "Biblioteca Nacional", "Teatro Nacional"
      ]
    },
    {
      nombre: "Centro Habana",
      codigo: "CHB",
      barrios: [
        "Cayo Hueso", "Los Sitios", "Pueblo Nuevo", "Dragones", "Colon", "Guadalupe"
      ],
      calles_principales: [
        "San Rafael", "Neptuno", "San Lazaro", "Galiano", "Avenida de Italia", "Reina",
        "Simon Bolivar", "Belascoain", "Padre Varela", "Infanta", "Zanja", "Salud",
        "San Miguel", "Aguila", "Campanario", "Lealtad", "Escobar", "Gervasio", "Carlos III"
      ],
      puntos_referencia: [
        "Barrio Chino", "Capitolio", "Parque de la Fraternidad", "Gran Teatro de La Habana",
        "Hotel Deauville", "Centro Comercial Carlos III", "Parque Fe del Valle", "Malecon de Centro Habana"
      ]
    },
    {
      nombre: "La Habana Vieja",
      codigo: "HBV",
      barrios: [
        "San Isidro", "Belen", "Catedral", "Santo Angel", "Paula", "Jesus Maria", "Plaza Vieja", "Prado"
      ],
      calles_principales: [
        "Obispo", "O'Reilly", "Mercaderes", "Oficios", "Cuba", "San Ignacio", "Habana",
        "Compostela", "Aguacate", "Villegas", "Monserrate", "Bernaza", "Muralla",
        "Teniente Rey", "Amargura", "Lamparilla", "Obrapia", "Empedrado", "Paseo del Prado",
        "Avenida del Puerto", "Monte", "Egido"
      ],
      puntos_referencia: [
        "Catedral de La Habana", "Plaza de Armas", "Plaza Vieja", "El Floridita",
        "La Bodeguita del Medio", "Terminal de Trenes Central", "Castillo de la Real Fuerza",
        "Museo de la Revolucion", "Lonja del Comercio", "Alameda de Paula"
      ]
    },
    {
      nombre: "Diez de Octubre",
      codigo: "DOC",
      barrios: [
        "Santos Suarez", "La Vibora", "Lawton", "Luyano", "Sevillano", "Loma del Chaple",
        "Vista Alegre", "Jesus del Monte", "Tamarindo", "Acosta", "Santa Amalia"
      ],
      calles_principales: [
        "Calzada de 10 de Octubre", "Santa Catalina", "Juan Delgado", "Acosta", "Lacret",
        "Patrocinio", "San Mariano", "General Lee", "Porvenir", "Dolores", "Concepcion",
        "16 de Octubre", "Calzada de Jesus del Monte", "Calzada de Luyano"
      ],
      puntos_referencia: [
        "Esquina de Toyo", "Parque de Santos Suarez", "Parque Gongora", "Parque de los Chivos",
        "Hospital Hijas de Galicia", "Hospital 10 de Octubre", "La Palma", "Santa Catalina y Juan Delgado"
      ]
    },
    {
      nombre: "Cerro",
      codigo: "CRR",
      barrios: [
        "Cerro", "Las Cañas", "Palatino", "El Canal", "Pilar", "Atarés", "Casino Deportivo"
      ],
      calles_principales: [
        "Calzada del Cerro", "Buenos Aires", "Patria", "Primelles", "Auditor", "Tulipan",
        "Santa Teresa", "Dominguez", "Ayestaran", "Boyeros", "Calzada de Vento"
      ],
      puntos_referencia: [
        "Estadio Latinoamericano", "Mercado de Cuatro Caminos", "Fabrica de Cerveza Polar",
        "Hospital Clinico Quirurgico del Cerro", "La Covadonga", "Parque Galicia"
      ]
    },
    {
      nombre: "Marianao",
      codigo: "MRN",
      barrios: [
        "Marianao", "Pogolotti", "Zamora", "Los Quemados", "Columbia", "Cocosolo",
        "Los Angeles", "Finlay", "Santa Felicia", "Palmar"
      ],
      calles_principales: [
        "Avenida 51", "Avenida 41", "Avenida 31", "Avenida 25", "Calle 100", "Calle 114",
        "Calle 124", "Calle 126", "Calle 130", "Calzada de Marianao"
      ],
      puntos_referencia: [
        "Cabaret Tropicana", "Ciudad Libertad", "Hospital Militar Carlos J. Finlay",
        "Hospital Pediatrico Juan Manuel Marquez", "Obelisco de Marianao"
      ]
    },
    {
      nombre: "La Lisa",
      codigo: "LLS",
      barrios: [
        "La Lisa", "San Agustin", "Punta Brava", "Arroyo Arenas", "El Cano", "Valle Grande",
        "Balcon Arimao", "Corralillo", "Guatao"
      ],
      calles_principales: [
        "Avenida 51", "Autopista Nacional", "Carretera Central", "Calle 160", "Calle 222",
        "Calle 240", "Calle 250", "Avenida 23 de La Lisa"
      ],
      puntos_referencia: [
        "Hospital Ortopedico Frank Pais", "Puente de la Lisa", "San Agustin Zona 1 a 6",
        "Centro de Investigaciones Ozonoterapia", "El Cano alfareria"
      ]
    },
    {
      nombre: "Boyeros",
      codigo: "BYR",
      barrios: [
        "Santiago de las Vegas", "Rancho Boyeros", "El Wajay", "Calabazar", "Fontanar",
        "Altahabana", "Capdevila", "Mulgoba", "Mazorra", "Rio Cristal", "Nuevo Santiago"
      ],
      calles_principales: [
        "Avenida Independencia", "Avenida Boyeros", "Calzada de Bejucal", "Calle 100",
        "Vento", "Avenida Van Troi", "Carretera del Wajay"
      ],
      puntos_referencia: [
        "Aeropuerto Internacional Jose Marti (Terminal 1, 2 y 3)", "Parque Lenin",
        "Jardin Botanico Nacional", "ExpoCuba", "Hospital Nacional Enrique Cabrera",
        "Hospital Psiquiatrico de La Habana (Mazorra)", "Centro Comercial Boyeros y Camaguey"
      ]
    },
    {
      nombre: "Arroyo Naranjo",
      codigo: "ARN",
      barrios: [
        "Mantilla", "Parraga", "Los Pinos", "Poey", "Vibora Park", "Calvario", "Managua",
        "Electrico", "Guinera", "San Amado", "Callejas"
      ],
      calles_principales: [
        "Calzada de 10 de Octubre", "Calzada de Managua", "Calzada de Bejucal",
        "Avenida de Mayo", "Calle 8", "Camaguey", "Perla"
      ],
      puntos_referencia: [
        "Hospital Julio Trigo", "Parque de Mantilla", "Parque de Parraga",
        "La Palma (interseccion comercial)", "Reparto Electrico final de guagua"
      ]
    },
    {
      nombre: "Habana del Este",
      codigo: "HDE",
      barrios: [
        "Alamar", "Cojimar", "Guanabo", "Boca Ciega", "Santa Maria del Mar", "Tarara",
        "Brisas del Mar", "Camilo Cienfuegos", "Villa Panamericana", "Guiteras"
      ],
      calles_principales: [
        "Via Blanca", "Via Monumental", "Avenida Casablanca", "Avenida Las Terrazas",
        "5ta Avenida de Guanabo", "Avenida 7ma Alamar"
      ],
      puntos_referencia: [
        "Playas del Este", "Fortaleza San Carlos de la Cabaña", "Castillo del Morro",
        "Estatua de Cristo de La Habana", "Estadio Panamericano", "Alamar Zonas 1 a 28"
      ]
    },
    {
      nombre: "Guanabacoa",
      codigo: "GBC",
      barrios: [
        "Guanabacoa", "Chibas", "D'Beche", "Minas", "Barreras", "Peñalver", "La Gallega", "Roble"
      ],
      calles_principales: [
        "Corralfalso", "Maximo Gomez", "Pepe Antonio", "Quintin Banderas", "Calzada de Guanabacoa",
        "Carretera de Cojimar", "Via Blanca"
      ],
      puntos_referencia: [
        "La Cotorra", "Museo Municipal de Guanabacoa", "Santuario de la Virgen de la Asuncion",
        "La Yuca", "El Garita"
      ]
    },
    {
      nombre: "San Miguel del Padrón",
      codigo: "SMP",
      barrios: [
        "Jacomino", "Diezmero", "San Francisco de Paula", "Dolores", "Rocafort",
        "La Rosalia", "Virgen del Camino", "California", "Fernandez Falcón"
      ],
      calles_principales: [
        "Calzada de San Miguel", "Calzada de Guines", "Calzada de Luyano", "Carretera Central",
        "Vía Blanca", "1ra de Monterrey"
      ],
      puntos_referencia: [
        "La Virgen del Camino", "Finca Vigia de Ernest Hemingway", "Mirador de San Miguel",
        "Parque Jacomino"
      ]
    },
    {
      nombre: "Regla",
      codigo: "REG",
      barrios: [
        "Regla", "Casablanca", "Guaicanamar", "Loma del Fortin", "Modelo"
      ],
      calles_principales: [
        "Marti", "Maximo Gomez", "Maceo", "24 de Febrero", "Calixto Garcia", "Avenida del Puerto Regla"
      ],
      puntos_referencia: [
        "Santuario Nacional de la Virgen de Regla", "Embarcadero de Regla (Lanchita de Regla)",
        "Colina Lenin", "Refineria Nico Lopez", "Observatorio de Casablanca"
      ]
    },
    {
      nombre: "Cotorro",
      codigo: "COT",
      barrios: [
        "Cotorro", "Santa Maria del Rosario", "Cuatro Caminos", "Loteria", "Alberro", "San Pedro", "Magdalena"
      ],
      calles_principales: [
        "Carretera Central", "Calzada de Guines", "Avenida 101", "Calle 20", "Calle 67"
      ],
      puntos_referencia: [
        "Balneario de Santa Maria del Rosario", "Plaza del Cotorro", "Parque Central del Cotorro",
        "Empresa Siderurgica Antillana de Acero"
      ]
    }
  ],

  arterias_principales: [
    { nombre: "Malecon", municipios: ["La Habana Vieja", "Centro Habana", "Plaza de la Revolución"] },
    { nombre: "5ta Avenida", municipios: ["Playa"] },
    { nombre: "Calzada de 10 de Octubre", municipios: ["Diez de Octubre", "Cerro", "Arroyo Naranjo"] },
    { nombre: "Avenida 23", municipios: ["Plaza de la Revolución"] },
    { nombre: "Calle Linea", municipios: ["Plaza de la Revolución"] },
    { nombre: "Paseo del Prado", municipios: ["La Habana Vieja", "Centro Habana"] },
    { nombre: "Carlos III / Salvador Allende", municipios: ["Centro Habana", "Plaza de la Revolución", "Cerro"] },
    { nombre: "Calzada del Cerro", municipios: ["Cerro"] },
    { nombre: "Via Blanca", municipios: ["Habana del Este", "Guanabacoa", "San Miguel del Padrón", "Diez de Octubre"] },
    { nombre: "Avenida de Boyeros / Independencia", municipios: ["Plaza de la Revolución", "Cerro", "Boyeros"] },
    { nombre: "Avenida 51", municipios: ["Marianao", "La Lisa"] },
    { nombre: "Calzada de Infanta", municipios: ["Centro Habana", "Plaza de la Revolución", "Cerro"] },
    { nombre: "Calzada de Luyano", municipios: ["Diez de Octubre", "San Miguel del Padrón"] },
    { nombre: "Calle 100", municipios: ["Marianao", "Playa", "Boyeros"] },
    { nombre: "Carretera Central", municipios: ["San Miguel del Padrón", "Cotorro", "La Lisa"] }
  ],

  alias: {
    "vedado": "Plaza de la Revolución",
    "nuevo vedado": "Plaza de la Revolución",
    "la rampa": "Plaza de la Revolución",
    "miramar": "Playa",
    "siboney": "Playa",
    "cubanacan": "Playa",
    "jaimanitas": "Playa",
    "santa fe": "Playa",
    "nautico": "Playa",
    "flores": "Playa",
    "buenavista": "Playa",
    "la vibora": "Diez de Octubre",
    "vibora": "Diez de Octubre",
    "santos suarez": "Diez de Octubre",
    "lawton": "Diez de Octubre",
    "luyano": "Diez de Octubre",
    "sevillano": "Diez de Octubre",
    "alamar": "Habana del Este",
    "cojimar": "Habana del Este",
    "guanabo": "Habana del Este",
    "tarara": "Habana del Este",
    "boca ciega": "Habana del Este",
    "habana vieja": "La Habana Vieja",
    "centro habana": "Centro Habana",
    "cayo hueso": "Centro Habana",
    "los sitios": "Centro Habana",
    "barrio chino": "Centro Habana",
    "san agustin": "La Lisa",
    "punta brava": "La Lisa",
    "arroyo arenas": "La Lisa",
    "el cano": "La Lisa",
    "santiago de las vegas": "Boyeros",
    "el wajay": "Boyeros",
    "wajay": "Boyeros",
    "calabazar": "Boyeros",
    "fontanar": "Boyeros",
    "altahabana": "Boyeros",
    "mazorra": "Boyeros",
    "mantilla": "Arroyo Naranjo",
    "parraga": "Arroyo Naranjo",
    "los pinos": "Arroyo Naranjo",
    "electrico": "Arroyo Naranjo",
    "managua": "Arroyo Naranjo",
    "calvario": "Arroyo Naranjo",
    "vibora park": "Arroyo Naranjo",
    "jacomino": "San Miguel del Padrón",
    "diezmero": "San Miguel del Padrón",
    "virgen del camino": "San Miguel del Padrón",
    "san francisco de paula": "San Miguel del Padrón",
    "santa maria del rosario": "Cotorro",
    "cuatro caminos": "Cotorro",
    "alberro": "Cotorro",
    "casablanca": "Regla",
    "palatino": "Cerro",
    "casino deportivo": "Cerro",
    "pogolotti": "Marianao",
    "zamora": "Marianao",
    "columbia": "Marianao"
  },

  patrones: {
    entre: /(.+?)\s+(?:entre|e\/)\s+(.+?)\s+y\s+(.+)/i,
    esquina: /(.+?)\s+(?:esquina|esq\.?)\s+(.+)/i,
    reparto: /(?:reparto|rpto\.?)\s+([a-záéíóúñ\s]+)/i
  }
};

window.HabanaDirecciones.analizar = function(input) {
  if (!input || input.trim().length < 2) {
    return { encontrado: false, mensaje: "Ingrese una dirección para comenzar el análisis." };
  }

  var normalizar = function(str) {
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  var texto = normalizar(input);
  var db = window.HabanaDirecciones;

  var resultado = {
    encontrado: false,
    municipio: null,
    barrio: null,
    confianza: 0,
    detalles: [],
    sugerencias: []
  };

  // 1. Detección directa por Municipio explícito
  for (var m = 0; m < db.municipios.length; m++) {
    var munObj = db.municipios[m];
    var munNorm = normalizar(munObj.nombre);
    if (texto.indexOf(munNorm) !== -1) {
      resultado.encontrado = true;
      resultado.municipio = munObj.nombre;
      resultado.confianza = 95;
      resultado.detalles.push("Municipio mencionado de forma explícita: " + munObj.nombre);
      break;
    }
  }

  // 2. Coincidencia por alias conocidos (Barrios y Repartos más populares)
  for (var aliasKey in db.alias) {
    var aliasNorm = normalizar(aliasKey);
    var regAlias = new RegExp("(^|\\s)" + aliasNorm + "(\\s|$)", "i");
    if (regAlias.test(texto)) {
      resultado.encontrado = true;
      resultado.municipio = db.alias[aliasKey];
      resultado.barrio = aliasKey.charAt(0).toUpperCase() + aliasKey.slice(1);
      resultado.confianza = Math.max(resultado.confianza, 92);
      resultado.detalles.push("Zona o Reparto identificado: " + resultado.barrio);
      break;
    }
  }

  // 3. Coincidencia por puntos de referencia emblemáticos
  for (var i = 0; i < db.municipios.length; i++) {
    var mun = db.municipios[i];
    for (var p = 0; p < mun.puntos_referencia.length; p++) {
      var puntoNorm = normalizar(mun.puntos_referencia[p]);
      if (texto.indexOf(puntoNorm) !== -1) {
        resultado.encontrado = true;
        resultado.municipio = mun.nombre;
        resultado.confianza = Math.max(resultado.confianza, 96);
        resultado.detalles.push("Punto de referencia clave: " + mun.puntos_referencia[p]);
        break;
      }
    }
    if (resultado.confianza >= 95) break;
  }

  // 3.1 Coincidencia por calles principales de cada municipio
  if (!resultado.encontrado || resultado.confianza < 85) {
    for (var mIdx = 0; mIdx < db.municipios.length; mIdx++) {
      var munCandidate = db.municipios[mIdx];
      var callesMatch = 0;
      var calleEncontrada = "";
      for (var cIdx = 0; cIdx < munCandidate.calles_principales.length; cIdx++) {
        var calleName = munCandidate.calles_principales[cIdx];
        var calleNorm = normalizar(calleName);
        if (calleNorm.length > 2 && new RegExp("(^|\\s)" + calleNorm + "(\\s|$)", "i").test(texto)) {
          callesMatch++;
          if (!calleEncontrada) calleEncontrada = calleName;
        }
      }
      if (callesMatch > 0) {
        resultado.encontrado = true;
        resultado.municipio = munCandidate.nombre;
        var confCalc = 75 + (callesMatch * 10);
        resultado.confianza = Math.max(resultado.confianza, Math.min(confCalc, 94));
        resultado.detalles.push("Calle(s) identificada(s) en " + munCandidate.nombre + ": " + calleEncontrada);
        if (callesMatch >= 2) break; // Si coinciden 2 calles (ej: intersección), es certero
      }
    }
  }

  // 4. Reconocimiento de calles y sistema de coordenadas de La Habana
  if (!resultado.encontrado || resultado.confianza < 85) {
    // Caso clásico de Vedado (Calles en letras: Línea, A, B, C... L, M, N... o números impares 1ra a 29)
    if (/\bcalle\s+([a-o]|linea|paseo)\b/i.test(texto) || /\b([a-o]|linea|paseo)\s+entre\s+/i.test(texto)) {
      resultado.encontrado = true;
      resultado.municipio = "Plaza de la Revolución";
      resultado.barrio = "Vedado";
      resultado.confianza = Math.max(resultado.confianza, 88);
      resultado.detalles.push("Nomenclatura típica del Vedado (letras o ejes como Línea/Paseo)");
    }
    // Caso de Miramar / Playa (5ta Avenida, 1ra, 3ra, avenidas de Playa, o números pares 2 a 250)
    else if (/\b5ta(\s+ave?|\s+avenida)?\b/i.test(texto) || /\b(miramar|playa)\b/i.test(texto)) {
      resultado.encontrado = true;
      resultado.municipio = "Playa";
      resultado.barrio = "Miramar";
      resultado.confianza = Math.max(resultado.confianza, 90);
      resultado.detalles.push("Nomenclatura típica de Playa/Miramar");
    }
  }

  // 5. Análisis de Grandes Arterias Viales
  for (var a = 0; a < db.arterias_principales.length; a++) {
    var art = db.arterias_principales[a];
    var artNorm = normalizar(art.nombre);
    if (texto.indexOf(artNorm) !== -1) {
      if (!resultado.encontrado) {
        resultado.encontrado = true;
        resultado.municipio = art.municipios[0];
        resultado.confianza = 75;
      }
      resultado.detalles.push("Vía principal: " + art.nombre + " (Cruza por: " + art.municipios.join(", ") + ")");
      if (art.municipios.length === 1) {
        resultado.municipio = art.municipios[0];
        resultado.confianza = Math.max(resultado.confianza, 85);
      }
    }
  }

  // 6. Patrones entre / esquina
  var matchEntre = input.match(db.patrones.entre);
  if (matchEntre) {
    resultado.detalles.push("Intersección: " + matchEntre[1].trim() + " entre " + matchEntre[2].trim() + " y " + matchEntre[3].trim());
    if (resultado.confianza > 0) resultado.confianza = Math.min(100, resultado.confianza + 5);
  } else {
    var matchEsq = input.match(db.patrones.esquina);
    if (matchEsq) {
      resultado.detalles.push("Esquina: " + matchEsq[1].trim() + " y " + matchEsq[2].trim());
      if (resultado.confianza > 0) resultado.confianza = Math.min(100, resultado.confianza + 5);
    }
  }

  // 7. Si no se halló, sugerir barrios o municipios con coincidencia parcial
  if (!resultado.encontrado) {
    var tokens = texto.split(" ");
    for (var t = 0; t < tokens.length; t++) {
      var tok = tokens[t];
      if (tok.length < 3) continue;
      for (var aKey in db.alias) {
        if (aKey.indexOf(tok) !== -1) {
          resultado.sugerencias.push({
            texto: aKey.charAt(0).toUpperCase() + aKey.slice(1) + " → " + db.alias[aKey],
            municipio: db.alias[aKey]
          });
        }
      }
      for (var mu = 0; mu < db.municipios.length; mu++) {
        var mNom = db.municipios[mu].nombre;
        if (normalizar(mNom).indexOf(tok) !== -1) {
          resultado.sugerencias.push({
            texto: mNom + " (Municipio)",
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
    }).slice(0, 5);
  }

  resultado.confianza = Math.min(resultado.confianza, 100);
  return resultado;
};
