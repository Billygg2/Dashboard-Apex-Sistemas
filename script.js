// Datos base del gráfico
const years = [2001, 2005, 2010, 2015, 2020, 2024]; // Años que se usarán en el eje X
const osData = { // Porcentaje de uso de cada sistema operativo en esos años
  Windows: [90, 85, 80, 76, 72, 68],
  Linux: [5, 10, 12, 13, 15, 10],
  macOS: [5, 5, 8, 11, 13, 22]
};

const filters = { Windows: true, Linux: false, macOS: false };

// Tipo inicial de gráfico ('area' o 'bar')
let currentType = 'area';

// Configuración
const baseOptions = {
  chart: {
    type: 'area',        
    height: 420,         
    toolbar: { show: true }, 
    zoom: { enabled: false } 
  },
  dataLabels: { enabled: false }, 
  stroke: { curve: 'smooth', width: 3 }, 
  markers: { size: 4 }, 
  grid: { borderColor: '#e6eef7', strokeDashArray: 4 }, 
  legend: { position: 'bottom', horizontalAlign: 'center' }, 
  xaxis: { // Configuración del eje X
    categories: years.map(String), // Etiquetas (los años)
    labels: { style: { colors: '#64748b' } }
  },
  yaxis: { // Configuración del eje Y
    title: { text: '%' },
    labels: { style: { colors: '#64748b' } },
    min: 0,
    max: 100
  },
  fill: { // Estilo del relleno del área
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.05,
      stops: [0,90,100]
    }
  },
  tooltip: { theme: 'light' }, // Estilo del cuadro de información al pasar el mouse
  title: { 
    text: 'Tendencia de uso (%)',
    align: 'left',
    style: { color: '#0f172a', fontWeight: 700 }
  },
  series: [{ name: 'Windows', data: osData.Windows }]
};

const chart = new ApexCharts(document.querySelector("#chart"), baseOptions);

chart.render();

// Función para actualizar los valores mostrados en los widgets de porcentaje
function updateStats() {
  document.getElementById("valWindows").textContent = osData.Windows.at(-1) + "%";
  document.getElementById("valLinux").textContent = osData.Linux.at(-1) + "%";
  document.getElementById("valMac").textContent = osData.macOS.at(-1) + "%";
}
updateStats(); 

// Función que actualiza el gráfico según los filtros y el tipo (área o barras)
function updateChart() {
  // Filtra qué sistemas operativos están activos
  const selected = Object.keys(filters).filter(k => filters[k]);
  const newSeries = selected.map(name => ({ name, data: osData[name] }));
  
  // Actualiza el gráfico existente sin volver a crearlo
  chart.updateOptions({
    chart: { type: currentType }, // Cambia entre 'area' o 'bar'
    stroke: { curve: currentType === 'area' ? 'smooth' : 'straight', width: 3 },
    series: newSeries 
  });
}

// Filtros de selección de sistema operativo (checkboxes)
document.getElementById("chkWindows").addEventListener("change", e => {
  filters.Windows = e.target.checked;
  updateChart(); 
});

document.getElementById("chkLinux").addEventListener("change", e => {
  filters.Linux = e.target.checked;
  updateChart();
});

document.getElementById("chkMac").addEventListener("change", e => {
  filters.macOS = e.target.checked;
  updateChart();
});

// Selector del tipo de gráfico (radio buttons)
document.querySelectorAll("input[name='chartType']").forEach(radio => {
  radio.addEventListener("change", e => {
    currentType = e.target.value; // Cambia entre 'area' o 'bar'
    updateChart(); 
  });
});