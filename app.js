// ============================================
// PRIMERA MANO INFORMACIÓN - APP.JS
// Motor principal de la web informativa
// ============================================

// ========================================
// CARGA DE PRODUCTOS DESDE JSON
// ========================================

var productosData = {};

function cargarProductos() {
  fetch('products.json')
    .then(function(resp) { return resp.json(); })
    .then(function(data) {
      productosData = data;
      renderizarTodo(data);
    })
    .catch(function(err) {
      console.error('Error cargando productos:', err);
    });
}

// ========================================
// RENDERIZADO DINÁMICO DE SECCIONES
// ========================================

var seccionesConfig = [
  { key: 'electrodomesticos', titulo: '⚡ Electrodomésticos', id: 'electrodomesticos-section' },
  { key: 'muebles', titulo: '🪑 Muebles', id: 'muebles-section' },
  { key: 'combos', titulo: '🛒 Combos y Tienda', id: 'combos-section' }
];

function renderizarTodo(data) {
  var main = document.getElementById('contenido-principal');
  if (!main) return;
  main.innerHTML = '';

  seccionesConfig.forEach(function(sec) {
    var productos = data[sec.key];
    if (!productos || productos.length === 0) return;

    var section = document.createElement('section');
    section.className = 'seccion-productos';
    section.id = sec.id;

    var h2 = document.createElement('h2');
    h2.textContent = sec.titulo;
    section.appendChild(h2);

    var galeria = document.createElement('div');
    galeria.className = 'galeria';

    productos.forEach(function(prod) {
      var card = crearTarjetaProducto(prod);
      galeria.appendChild(card);
    });

    section.appendChild(galeria);
    main.appendChild(section);
  });
}

// ========================================
// CREAR TARJETA DE PRODUCTO
// ========================================

function crearTarjetaProducto(prod) {
  var div = document.createElement('div');
  div.className = 'producto' + (prod.isAgotado ? ' agotado' : '');
  div.setAttribute('data-id', prod.id);
  div.setAttribute('data-agotado', prod.isAgotado ? 'true' : 'false');

  // Determinar las fotos (hasta 4)
  var fotos = obtenerFotosProducto(prod);
  var fotosPrincipal = fotos[0] || prod.image;

  // Badge de fotos si hay más de 1
  if (fotos.length > 1) {
    var badge = document.createElement('span');
    badge.className = 'photo-count-badge';
    badge.innerHTML = '<i class="fa-solid fa-images"></i> ' + fotos.length + ' fotos';
    div.appendChild(badge);
  }

  // Imagen principal
  var img = document.createElement('img');
  img.className = 'producto-img-main';
  img.src = fotosPrincipal;
  img.alt = prod.name;
  img.loading = 'lazy';
  img.onclick = function() {
    abrirDetalle(prod);
  };
  div.appendChild(img);

  // Nombre
  var h3 = document.createElement('h3');
  h3.textContent = prod.name;
  div.appendChild(h3);

  // Precio/descripción
  var precio = document.createElement('p');
  precio.className = 'precio';
  precio.textContent = prod.description;
  div.appendChild(precio);

  // Botones de acción
  var actions = document.createElement('div');
  actions.className = 'producto-actions';

  // Botón Ver Detalle
  var btnVer = document.createElement('button');
  btnVer.className = 'btn-ver-detalle';
  btnVer.innerHTML = '<i class="fa-solid fa-eye"></i> Ver';
  btnVer.onclick = function(e) {
    e.stopPropagation();
    abrirDetalle(prod);
  };
  actions.appendChild(btnVer);

  // Botón Información
  var btnInfo = document.createElement('button');
  btnInfo.className = 'btn-info';
  btnInfo.innerHTML = '<i class="fa-solid fa-circle-info"></i> Info';
  btnInfo.onclick = function(e) {
    e.stopPropagation();
    abrirDetalle(prod, true);
  };
  actions.appendChild(btnInfo);

  // Botón Descargar
  var btnDl = document.createElement('button');
  btnDl.className = 'btn-download-card';
  btnDl.innerHTML = '<i class="fa-solid fa-download"></i>';
  btnDl.title = 'Descargar foto';
  btnDl.onclick = function(e) {
    e.stopPropagation();
    descargarImagen(fotosPrincipal, prod.name);
  };
  actions.appendChild(btnDl);

  div.appendChild(actions);

  return div;
}

// ========================================
// SISTEMA DE MÚLTIPLES FOTOS POR PRODUCTO
// ========================================

/**
 * Obtiene las fotos de un producto.
 * Los productos pueden tener:
 * - prod.image (string) → foto principal
 * - prod.images (array) → hasta 4 fotos
 * - prod.fotos (array) → alias alternativo
 * Si no tiene array, se genera uno con la imagen principal.
 */
function obtenerFotosProducto(prod) {
  if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
    return prod.images.slice(0, 4);
  }
  if (prod.fotos && Array.isArray(prod.fotos) && prod.fotos.length > 0) {
    return prod.fotos.slice(0, 4);
  }
  if (prod.image) {
    return [prod.image];
  }
  return [];
}

// ========================================
// MODAL DE DETALLE DEL PRODUCTO
// (con galería de hasta 4 fotos + info)
// ========================================

var productoActual = null;
var fotoActualIndex = 0;

function abrirDetalle(prod, mostrarInfo) {
  productoActual = prod;
  fotoActualIndex = 0;

  var modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  var fotos = obtenerFotosProducto(prod);

  // Imagen principal
  var mainImg = document.getElementById('product-detail-img');
  if (mainImg && fotos.length > 0) {
    mainImg.src = fotos[0];
    mainImg.alt = prod.name;
  }

  // Título
  var titleEl = document.getElementById('product-detail-title');
  if (titleEl) titleEl.textContent = prod.name;

  // Precio
  var priceEl = document.getElementById('product-detail-price');
  if (priceEl) priceEl.textContent = prod.description;

  // Descripción
  var descEl = document.getElementById('product-detail-desc');
  if (descEl) {
    if (prod.isAgotado) {
      descEl.innerHTML = '<span style="color:#f44336;font-weight:bold;">⚠️ Producto agotado actualmente</span>';
    } else {
      descEl.textContent = prod.descripcion_larga || 'Producto disponible en Primera Mano.';
    }
  }

  // Generar thumbnails
  var thumbContainer = document.getElementById('product-thumbnails');
  if (thumbContainer) {
    thumbContainer.innerHTML = '';
    fotos.forEach(function(foto, idx) {
      var thumb = document.createElement('img');
      thumb.src = foto;
      thumb.alt = prod.name + ' - foto ' + (idx + 1);
      thumb.className = idx === 0 ? 'active' : '';
      thumb.onclick = function() {
        cambiarFotoDetalle(idx, fotos);
      };
      thumbContainer.appendChild(thumb);
    });
  }

  // Cargar información del producto
  cargarInfoProducto(prod);

  // Si se pidió mostrar la info, expandirla
  if (mostrarInfo) {
    setTimeout(function() {
      var infoContent = document.getElementById('info-content');
      if (infoContent) infoContent.style.display = 'block';
    }, 300);
  } else {
    var infoContent = document.getElementById('info-content');
    if (infoContent) infoContent.style.display = 'none';
  }

  // Mostrar modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarDetalle() {
  var modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  productoActual = null;
}
window.cerrarDetalle = cerrarDetalle;

function cambiarFotoDetalle(index, fotos) {
  fotoActualIndex = index;
  var mainImg = document.getElementById('product-detail-img');
  if (mainImg && fotos[index]) {
    mainImg.style.opacity = '0';
    setTimeout(function() {
      mainImg.src = fotos[index];
      mainImg.style.opacity = '1';
    }, 200);
  }

  // Actualizar thumbnails activos
  var thumbs = document.querySelectorAll('#product-thumbnails img');
  thumbs.forEach(function(t, i) {
    t.className = i === index ? 'active' : '';
  });
}

// ========================================
// PANEL DE INFORMACIÓN DEL PRODUCTO
// ========================================

function cargarInfoProducto(prod) {
  var infoContent = document.getElementById('info-content');
  if (!infoContent) return;

  // Generar características del producto
  var caracteristicas = prod.caracteristicas || generarCaracteristicasDefault(prod);

  var html = '<h4><i class="fa-solid fa-clipboard-list"></i> Características del Producto</h4>';
  html += '<ul>';
  caracteristicas.forEach(function(car) {
    html += '<li><i class="fa-solid fa-check-circle"></i> ' + car + '</li>';
  });
  html += '</ul>';

  // Agregar estado de disponibilidad
  html += '<div style="margin-top:15px;padding:10px;border-radius:8px;background:' +
    (prod.isAgotado ? 'rgba(244,67,54,0.2);border:1px solid #f44336;' : 'rgba(76,175,80,0.2);border:1px solid #4CAF50;') + '">';
  html += '<p style="color:' + (prod.isAgotado ? '#f44336' : '#4CAF50') + ';font-weight:bold;margin:0;">';
  html += prod.isAgotado ? '❌ Agotado' : '✅ Disponible';
  html += '</p></div>';

  infoContent.innerHTML = html;
}

function generarCaracteristicasDefault(prod) {
  var chars = [];
  chars.push('Nombre: ' + prod.name);
  chars.push('Precio: ' + prod.description);
  chars.push('Estado: ' + (prod.isAgotado ? 'Agotado' : 'Disponible'));

  // Intentar extraer más info del nombre
  if (prod.name.match(/\d+\s*(kg|g|lb|ml|L|litro|unid)/i)) {
    var match = prod.name.match(/(\d+\s*(kg|g|lb|ml|L|litro|unidades?))/i);
    if (match) chars.push('Contenido: ' + match[0]);
  }

  if (prod.options && prod.options.length > 0) {
    chars.push('Opciones disponibles: ' + prod.options.length);
  }

  var fotos = obtenerFotosProducto(prod);
  chars.push('Fotos disponibles: ' + fotos.length);

  return chars;
}

function toggleInfoPanel() {
  var infoContent = document.getElementById('info-content');
  if (!infoContent) return;

  if (infoContent.style.display === 'none' || !infoContent.style.display) {
    infoContent.style.display = 'block';
  } else {
    infoContent.style.display = 'none';
  }
}
window.toggleInfoPanel = toggleInfoPanel;

// ========================================
// SISTEMA DE DESCARGA DE FOTOS
// ========================================

function descargarImagen(url, nombre) {
  // Crear un link temporal para descargar
  var link = document.createElement('a');

  // Intentar obtener la imagen y descargarla como blob
  fetch(url)
    .then(function(response) {
      return response.blob();
    })
    .then(function(blob) {
      var blobUrl = URL.createObjectURL(blob);
      link.href = blobUrl;
      link.download = limpiarNombreArchivo(nombre) + obtenerExtension(url);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      mostrarNotificacion('✅ Descarga iniciada: ' + nombre);
    })
    .catch(function(err) {
      // Fallback: abrir la imagen en nueva pestaña
      console.error('Error al descargar:', err);
      link.href = url;
      link.download = limpiarNombreArchivo(nombre) + obtenerExtension(url);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      mostrarNotificacion('📥 Abriendo imagen para guardar');
    });
}

function descargarFotoActual() {
  if (!productoActual) return;
  var fotos = obtenerFotosProducto(productoActual);
  if (fotos[fotoActualIndex]) {
    descargarImagen(
      fotos[fotoActualIndex],
      productoActual.name + '_foto' + (fotoActualIndex + 1)
    );
  }
}
window.descargarFotoActual = descargarFotoActual;

function limpiarNombreArchivo(nombre) {
  return nombre.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s_-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

function obtenerExtension(url) {
  var ext = url.match(/\.(webp|jpg|jpeg|png|gif|bmp|svg)(\?.*)?$/i);
  return ext ? '.' + ext[1] : '.webp';
}

// ========================================
// NOTIFICACIONES TOAST
// ========================================

function mostrarNotificacion(mensaje) {
  var toast = document.getElementById('toast-notificacion');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notificacion';
    toast.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#1a1a1a,#111);' +
      'color:#d4af37;padding:15px 25px;border-radius:12px;border:2px solid #d4af37;z-index:15000;' +
      'font-weight:bold;box-shadow:0 8px 30px rgba(0,0,0,0.8);transition:all 0.4s ease;' +
      'transform:translateX(150%);font-size:1rem;max-width:400px;';
    document.body.appendChild(toast);
  }

  toast.textContent = mensaje;
  toast.style.transform = 'translateX(0)';

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(function() {
    toast.style.transform = 'translateX(150%)';
  }, 3000);
}

// ========================================
// WIDGET DE MENSAJERÍA FLOTANTE
// (Algoritmo robusto de direcciones)
// ========================================

var mensajeriaAbierta = false;

function toggleMensajeria() {
  mensajeriaAbierta = !mensajeriaAbierta;
  var panel = document.getElementById('mensajeria-panel');
  var floatBtn = document.getElementById('mensajeria-float');

  if (panel) {
    panel.style.display = mensajeriaAbierta ? 'block' : 'none';
  }
  if (floatBtn) {
    if (mensajeriaAbierta) {
      floatBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> <span>Cerrar</span>';
      floatBtn.style.background = 'linear-gradient(135deg, #f44336, #c62828)';
    } else {
      floatBtn.innerHTML = '<i class="fa-solid fa-envelope"></i> <span>Mensajería</span>';
      floatBtn.style.background = 'linear-gradient(135deg, #d4af37, #b8921b)';
    }
  }
}
window.toggleMensajeria = toggleMensajeria;

// Función principal de análisis de dirección
function analizarDireccion() {
  var input = document.getElementById('direccion-input');
  if (!input) return;

  var direccion = input.value.trim();
  if (direccion.length < 2) {
    mostrarResultadoDireccion(null);
    return;
  }

  // Usar el algoritmo robusto de HabanaDirecciones
  if (window.HabanaDirecciones && window.HabanaDirecciones.analizar) {
    var resultado = window.HabanaDirecciones.analizar(direccion);
    mostrarResultadoDireccion(resultado);
  } else {
    mostrarResultadoDireccion({
      encontrado: false,
      mensaje: 'Error: Base de datos de direcciones no cargada'
    });
  }
}
window.analizarDireccion = analizarDireccion;

function mostrarResultadoDireccion(resultado) {
  var container = document.getElementById('resultado-direccion');
  var sugContainer = document.getElementById('sugerencias-direccion');
  if (!container) return;

  if (!resultado || !resultado.encontrado) {
    if (resultado && resultado.sugerencias && resultado.sugerencias.length > 0) {
      container.innerHTML = '<div class="resultado-card">' +
        '<h4><i class="fa-solid fa-question-circle"></i> No se encontró exactamente</h4>' +
        '<p>No pudimos identificar la dirección con certeza. Vea las sugerencias debajo.</p>' +
        '</div>';

      if (sugContainer) {
        var sugHtml = '<p style="color:#aaa;font-size:0.85rem;margin-bottom:8px;">¿Quiso decir?</p>';
        resultado.sugerencias.forEach(function(sug) {
          sugHtml += '<div class="sugerencia-item" onclick="usarSugerencia(\'' +
            sug.texto.replace(/'/g, "\\'") + '\')">' +
            '<i class="fa-solid fa-location-arrow" style="color:#d4af37;margin-right:8px;"></i>' +
            sug.texto + '</div>';
        });
        sugContainer.innerHTML = sugHtml;
      }
    } else {
      var msg = resultado ? resultado.mensaje || 'Dirección no reconocida' : '';
      container.innerHTML = msg ? '<div class="resultado-card"><p style="color:#aaa;">' + msg + '</p></div>' : '';
      if (sugContainer) sugContainer.innerHTML = '';
    }
    return;
  }

  // Mostrar resultado encontrado
  var confianzaClass = resultado.confianza >= 80 ? '' :
    resultado.confianza >= 50 ? 'media' : 'baja';
  var confianzaLabel = resultado.confianza >= 80 ? '✅ Alta' :
    resultado.confianza >= 50 ? '⚠️ Media' : '❌ Baja';

  var html = '<div class="resultado-card">';
  html += '<h4><i class="fa-solid fa-map-location-dot"></i> Hipótesis Principal: ' + resultado.municipio + '</h4>';
  html += '<p><strong>Municipio:</strong> <span class="municipio-tag">' + resultado.municipio + '</span></p>';

  if (resultado.barrio) {
    html += '<p><strong>Barrio/Zona:</strong> ' + resultado.barrio + '</p>';
  }

  html += '<p><strong>Confianza:</strong> <span class="confianza ' + confianzaClass + '">' +
    confianzaLabel + ' (' + resultado.confianza + '%)</span>' +
    (resultado.probabilidad ? ' <span style="margin-left:8px;font-size:0.85rem;color:#d4af37;background:rgba(212,175,55,0.15);padding:2px 8px;border-radius:12px;">Probabilidad: ' + resultado.probabilidad + '%</span>' : '') +
    '</p>';

  if (resultado.lat && resultado.lng) {
    html += '<p style="margin-top:8px;"><strong>Coordenadas GPS Satelitales:</strong> ' +
      '<code style="background:rgba(212,175,55,0.15);padding:3px 8px;border-radius:4px;color:#d4af37;font-size:0.88rem;font-weight:600;">' +
      resultado.lat.toFixed(5) + ', ' + resultado.lng.toFixed(5) + '</code></p>';
    
    // Enlace exclusivo oficial de Google Maps URLs Search API v1
    var gmapsUrl = resultado.googleMapsUrl || ('https://www.google.com/maps/search/?api=1&query=' + resultado.lat.toFixed(5) + '%2C' + resultado.lng.toFixed(5));
    
    html += '<div style="margin-top:12px;">' +
      '<a href="' + gmapsUrl + '" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg, #d4af37 0%, #b8972f 100%);color:#111;font-weight:700;padding:10px 18px;border-radius:8px;font-size:0.9rem;text-decoration:none;box-shadow:0 4px 12px rgba(212,175,55,0.3);transition:all 0.2s ease;">' +
      '<i class="fa-solid fa-map-location-dot" style="font-size:1.1rem;"></i> Abrir en Google Maps</a>' +
      '</div>';
  }

  if (resultado.detalles && resultado.detalles.length > 0) {
    html += '<div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.1);">';
    html += '<p style="color:#888;font-size:0.85rem;margin-bottom:5px;">Evidencias de triangulación:</p>';
    resultado.detalles.forEach(function(det) {
      html += '<p style="color:#aaa;font-size:0.85rem;margin:2px 0;">• ' + det + '</p>';
    });
    html += '</div>';
  }

  // --- RENDERIZADO DE MÚLTIPLES RESPUESTAS / HIPÓTESIS ALTERNATIVAS ---
  if (resultado.respuestas && resultado.respuestas.length > 1) {
    html += '<div style="margin-top:14px;padding-top:12px;border-top:1px dashed rgba(212,175,55,0.3);">';
    html += '<p style="color:#d4af37;font-size:0.88rem;font-weight:600;margin-bottom:8px;"><i class="fa-solid fa-diagram-project"></i> Otras posibilidades trianguladas:</p>';
    
    for (var rIdx = 1; rIdx < resultado.respuestas.length; rIdx++) {
      var alt = resultado.respuestas[rIdx];
      var altGmaps = alt.googleMapsUrl || (alt.lat && alt.lng ? ('https://www.google.com/maps/search/?api=1&query=' + alt.lat.toFixed(5) + '%2C' + alt.lng.toFixed(5)) : '#');
      html += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px 10px;margin-bottom:6px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<span style="font-weight:600;color:#eee;font-size:0.85rem;">#' + (rIdx + 1) + ' ' + alt.municipio + (alt.barrio ? ' (' + alt.barrio + ')' : '') + '</span>' +
        '<span style="font-size:0.8rem;color:#d4af37;font-weight:600;">' + alt.probabilidad + '% prob.</span>' +
        '</div>' +
        (alt.detalles && alt.detalles.length > 0 ? '<p style="color:#888;font-size:0.75rem;margin:4px 0 0 0;">' + alt.detalles[0] + '</p>' : '') +
        (alt.lat && alt.lng ? '<div style="margin-top:6px;"><a href="' + altGmaps + '" target="_blank" rel="noopener noreferrer" style="font-size:0.78rem;color:#d4af37;text-decoration:none;display:inline-flex;align-items:center;gap:4px;"><i class="fa-solid fa-location-arrow"></i> Ver en Google Maps (' + alt.lat.toFixed(5) + ', ' + alt.lng.toFixed(5) + ')</a></div>' : '') +
        '</div>';
    }
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
  if (sugContainer) sugContainer.innerHTML = '';
}

function usarSugerencia(texto) {
  var input = document.getElementById('direccion-input');
  if (input) {
    // Extract just the location part before the arrow
    var parts = texto.split('→');
    input.value = parts[0].trim();
    analizarDireccion();
  }
}
window.usarSugerencia = usarSugerencia;

// ========================================
// BUSCADOR DE PRODUCTOS EN TIEMPO REAL
// ========================================

window.filtrarProductos = function() {
  var input = document.getElementById('buscar-producto');
  if (!input) return;
  var q = input.value ? input.value.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

  document.querySelectorAll('.producto').forEach(function(p) {
    var nameEl = p.querySelector('h3');
    var name = nameEl ? nameEl.textContent.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';

    var descTexts = Array.from(p.querySelectorAll('p')).map(function(x) { return x.textContent; });
    var desc = descTexts.join(' ').toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    p.style.display = (name.indexOf(q) !== -1 || desc.indexOf(q) !== -1) ? '' : 'none';
  });

  document.querySelectorAll('section.seccion-productos').forEach(function(s) {
    var visible = s.querySelectorAll('.producto:not([style*="display: none"])').length;
    s.style.display = (visible > 0 || q === '') ? '' : 'none';
  });
};

// ========================================
// PWA + INSTALACIÓN APK WEB (STANDALONE)
// ========================================

var deferredPrompt = null;

window.addEventListener('beforeinstallprompt', function(e) {
  // Prevenir que el navegador muestre el banner por defecto
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostrar nuestra barra elegante de instalación si no fue descartada
  var installBar = document.getElementById('install-pwa-bar');
  if (installBar && !sessionStorage.getItem('pm_install_dismissed')) {
    installBar.classList.add('visible');
  }
});

function instalarPwaApp() {
  var installBar = document.getElementById('install-pwa-bar');
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó instalar la APK Web Gestores PM');
      }
      deferredPrompt = null;
      if (installBar) installBar.classList.remove('visible');
    });
  } else {
    // Si ya está instalada o en iOS / navegador sin beforeinstallprompt
    alert('📱 Para instalar en tu teléfono:\n\n• En Chrome/Android: Toca los 3 puntos (⋮) y selecciona "Agregar a la pantalla principal" o "Instalar aplicación".\n• En iPhone (Safari): Toca el botón Compartir y luego "Agregar al inicio".');
  }
}

function cerrarBarraInstalacion() {
  var installBar = document.getElementById('install-pwa-bar');
  if (installBar) {
    installBar.classList.remove('visible');
    sessionStorage.setItem('pm_install_dismissed', 'true');
  }
}

window.addEventListener('appinstalled', function() {
  console.log('Gestores PM instalada como app exitosamente');
  var installBar = document.getElementById('install-pwa-bar');
  if (installBar) installBar.classList.remove('visible');
  deferredPrompt = null;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      registration.addEventListener('updatefound', function() {
        var newWorker = registration.installing;
        newWorker.addEventListener('statechange', function() {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage({ action: 'skipWaiting' });
          }
        });
      });
      registration.update();
    }).catch(function(err) {
      console.log('SW registro fallido:', err);
    });
  });
}

// ========================================
// ERROR HANDLING PARA IMÁGENES
// ========================================

document.addEventListener('error', function(event) {
  if (event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'img') {
    var img = event.target;
    var attempts = parseInt(img.getAttribute('data-retries') || '0', 10);
    if (attempts < 3) {
      attempts++;
      img.setAttribute('data-retries', attempts);
      img.removeAttribute('loading');
      setTimeout(function() {
        try {
          var url = new URL(img.src, window.location.href);
          url.searchParams.set('retry', Date.now());
          img.src = url.href;
        } catch(e) {}
      }, 1500 * attempts);
    } else {
      img.style.opacity = '0.3';
    }
  }
}, true);

// ========================================
// CERRAR MODALES CON ESCAPE
// ========================================

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cerrarDetalle();
    if (mensajeriaAbierta) toggleMensajeria();
  }
});

// Click fuera del modal para cerrar
document.addEventListener('click', function(e) {
  var modal = document.getElementById('product-detail-modal');
  if (modal && e.target === modal) {
    cerrarDetalle();
  }
});

// ========================================
// INICIALIZACIÓN
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarProductos);
} else {
  cargarProductos();
}
