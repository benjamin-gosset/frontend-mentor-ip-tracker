const ipmap = L.map('map', { zoomControl:false }).setView([51.505, -0.09], 17);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(ipmap);

const ipIcon = L.icon({
    iconUrl: './dist/img/icon-location.svg',
    iconSize: [45, 56],
    iconAnchor: [23, 56]
});

// Get User IP info on initial page load
function fetchDisplay(element) {
    if ( element ) {
        apiCall = 'https://geo.ipify.org/api/v1?apiKey=at_4UBflXkNNRmq5nGpaT6pAxkLzAA2c&ipAddress=' + element;
    } else {
        apiCall = 'https://geo.ipify.org/api/v1?apiKey=at_4UBflXkNNRmq5nGpaT6pAxkLzAA2c';
    }

    fetch(apiCall)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let ip = data['ip'];
        let location = data['location']['city'];
        let timezone = data['location']['timezone'];
        let isp = data['isp'];
        let lat = data['location']['lat'];
        let lng = data['location']['lng'];

        let input = document.querySelector('#ip');
        let ipTxt = document.querySelector('.ip .infos__data');
        let locationTxt = document.querySelector('.location .infos__data');
        let timezoneTxt = document.querySelector('.timezone .infos__data');
        let ispTxt = document.querySelector('.isp .infos__data');

        ipTxt.textContent = ip;
        input.value = ip;
        locationTxt.textContent = location;
        timezoneTxt.textContent = "UTC " + timezone;
        ispTxt.textContent = isp;

        ipmap.setView(new L.LatLng(lat, lng), 17);
        ipmap.panBy(new L.point(0, -100), {animate: false});
        let marker = L.marker([lat, lng], {icon: ipIcon}).addTo(ipmap);
    });
}

fetchDisplay();
//'77.75.66.239''195.221.67.55'lat	48.1192lng	-1.67376

let form = document.getElementById('ipForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let userIp = document.getElementById('ip').value;
    fetchDisplay(userIp);
})

