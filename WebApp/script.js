
// Crea el mapa
const mapa = L.map("mapa", {
    maxBounds: [[41.4725, 2.0757], [41.2693, 2.2728]],
    maxBoundsViscosity: 0.5,
    // layers: [osm],
    center: [41.38700,2.17],
    zoom: 12,
    zoomControl: false,
    preferCanvas: true
});
mapa.attributionControl.setPrefix("");

let mapboxAccessToken = 'pk.eyJ1Ijoic2FsY2MiLCJhIjoiY2swa3U1NzE3MG41ODNnbGlkbTQxcWk4cCJ9.U5QB2TPSrjzfU9zCQJtt1g';
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    tileSize: 512,
    minZoom: 11,
    maxZoom: 20,
    zoomOffset: -1
}).addTo(mapa);

// Canvia el cursor quan s'arrossega el mapa
mapa.on("dragstart", () => {
    document.getElementById("mapa").style.cursor = "move";
});
mapa.on("dragend", () => {
    document.getElementById("mapa").style.cursor = "default";
});


function getColor(numerito) {
    numerito *= 100;
    console.log(numerito);
    if (numerito > 87) return '#d73027';
    if (numerito > 77) return '#f46d43';
    if (numerito > 67) return '#fdae61';
    if (numerito > 57) return '#fee08b';
    if (numerito > 47) return '#ffffbf';
    if (numerito > 37) return '#d9ef8b';
    if (numerito > 27) return '#a6d96a';
    if (numerito > 17) return '#66bd63';
    return '#1a9850';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.diferencia),
        weight: 2,
        opacity: 1,
        color: '#666',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function restyleLayer() {
    geojson.eachLayer(function(featureInstanceLayer) {
        featureInstanceLayer.setStyle({
            fillColor: getColor(featureInstanceLayer.feature.properties.diferencia),
            weight: 2,
            opacity: 1,
            color: '#666',
            dashArray: '3',
            fillOpacity: 0.7
        });
    });
}


let geojson;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    mapa.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

let info = L.control();

info.onAdd = function (mapa) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (properties) {
    this._div.innerHTML = '<h4>Predicció</h4>' +  (properties ?
        '<b>' + properties.NOM + '</b><br />' + Math.round(properties.predLloguer) + '€/mes | ' + Math.round(properties.diferencia * 100) + '% <br />'
        : 'Passa el ratolí sobre un barri.');
};


info.addTo(mapa);

geojson = L.geoJson(barris, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mapa);



let myInput = document.getElementById('salari');

myInput.addEventListener('input', function () {
    actualitzar_diferencia();
});

function sliderChange(value) {
    actualitzar_diferencia();
}

let mySlider = new rSlider({
    target: '#any',
    values:  [2021, 2022, 2023, 2024, 2025, 2026],
    tooltip: false,
    labels: true,
    set: [2021],
    onChange: sliderChange
});


function actualitzar_diferencia() {
    let salari = parseFloat(myInput.value);
    let any = parseInt(mySlider.getValue());

    for (let i = 0; i < 73; ++i) {
        let pred_lloguer = lloguersPreds[i];
        barris.features[i].properties.predLloguer = pred_lloguer[4 * (any - 2014) - 1];
        barris.features[i].properties.diferencia = pred_lloguer[4 * (any - 2014) - 1] / salari;
    }
    restyleLayer();
}


