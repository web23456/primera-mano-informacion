// Comprehensive test suite for the 50 real delivery addresses
global.window = global;
require('./direcciones-habana.js');

const rawBlocks = require('./vales_50_blocks.json').slice(1);
const expectedMun = [
  'Marianao', 'Marianao', 'Marianao', 'Diez de Octubre', 'Playa',
  'Regla', 'La Habana Vieja', 'Arroyo Naranjo', 'Arroyo Naranjo', 'Habana del Este',
  'Centro Habana', 'Regla', 'La Habana Vieja', 'Diez de Octubre', 'Centro Habana',
  'Habana del Este', 'Diez de Octubre', 'Boyeros', 'Marianao', 'Boyeros',
  'Arroyo Naranjo', 'San Miguel del Padrón', 'Diez de Octubre', 'Cerro', 'Boyeros',
  'Cotorro', 'Arroyo Naranjo', 'San Miguel del Padrón', 'Centro Habana', 'Centro Habana',
  'Guanabacoa', 'Arroyo Naranjo', 'Marianao', 'La Habana Vieja', 'Regla',
  'La Lisa', 'Diez de Octubre', 'Cotorro', 'La Habana Vieja', 'Regla',
  'Habana del Este', 'Marianao', 'La Lisa', 'Boyeros', 'Playa',
  'Centro Habana', 'Plaza de la Revolución', 'Marianao', 'Centro Habana', 'San Miguel del Padrón'
];

let correctMun = 0;
let exactTriangulation = 0;
let validGoogleMapsUrls = 0;
const results = [];

rawBlocks.forEach((b, i) => {
  const res = HabanaDirecciones.analizar(b);
  const isMunOk = res.municipio === expectedMun[i];
  const isExact = res.detalles && res.detalles.some(d => d.includes('Triangulación exacta de nodos'));
  const hasUrl = res.googleMapsUrl && res.googleMapsUrl.startsWith('https://www.google.com/maps/search/?api=1&query=');
  
  if (isMunOk) correctMun++;
  if (isExact) exactTriangulation++;
  if (hasUrl) validGoogleMapsUrls++;

  results.push({
    valeNum: i + 1,
    municipio: res.municipio,
    barrio: res.barrio,
    lat: res.lat,
    lng: res.lng,
    metodo: res.detalles ? res.detalles[0] : '',
    url: res.googleMapsUrl
  });
});

console.log('=====================================================');
console.log('  INFORME DE CALIBRACIÓN - 50 VALES REALES HABANA   ');
console.log('=====================================================');
console.log('1. Precisión de Municipio: ' + correctMun + ' / 50 (' + (correctMun/50*100).toFixed(1) + '%)');
console.log('2. Triangulación Exacta de Nodos: ' + exactTriangulation + ' / 50 (' + (exactTriangulation/50*100).toFixed(1) + '%)');
console.log('3. Enlaces Google Maps Oficiales (v1): ' + validGoogleMapsUrls + ' / 50 (' + (validGoogleMapsUrls/50*100).toFixed(1) + '%)');
console.log('=====================================================');

// Sample output
console.log('\nMuestra representativa de ubicaciones calibradas:');
[1, 6, 8, 14, 21, 24, 27, 34, 38, 47].forEach(num => {
  const item = results[num - 1];
  console.log(`[Vale #${item.valeNum}] ${item.municipio} (${item.barrio}) -> [${item.lat}, ${item.lng}]`);
  console.log(`   Método: ${item.metodo}`);
  console.log(`   Google Maps: ${item.url}`);
});
