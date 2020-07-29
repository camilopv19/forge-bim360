// Authentication: POST -->token
const url = "https://security.azimutenergia.co/api/authentication";
const body = JSON.stringify({
    "username": "pactia.buro4",
    "password": "G&iBl={83w'EL2pim]g|Z$ARkHR?Xh"
});

// History: GET --> {json}
const pisos = {
    p5 : { id: '5dfb91044c6618853f236f1b', name: 'Piso 5'},
    p6 : { id: '5dfb91964c6618853f236f1c', name: 'Piso 6'},
    p7 : { id: '5dfb95655a26247b69757a59', name: 'Piso 7'},
    p8 : { id: '5dfb95bf5a26247b69757a5a', name: 'Piso 8'},
    p9 : { id: '5dfb96a25a26247b69757a5b', name: 'Piso 9'},
    p10 : { id: '5e270674212d7a033b45870c', name: 'Piso 10'},
    p11 : { id: '5e38215782d104f0b391995f', name: 'Piso 11'},
    p12 : { id: '5e3821ed82d104f0b3919960', name: 'Piso 12'},
    p13 : { id: '5dfbe8898e1ba408affa0fbf', name: 'Piso 13'},
    p14 : { id: '5dfbe8138e1ba408affa0fbe', name: 'Piso 14'},
    p15_1 : { id: '5dfbe7ae8e1ba408affa0fbd', name: 'Piso 15 Totalizador 1'},
    p15_2 : { id: '5dfceb8fa058b81b1c05d771', name: 'Piso 15 Totalizador 2'},
    p16 : { id: '5df00efe748d27a793c38929', name: 'Piso 16'}
};

const sensores = {
    s1: { id: 'act_ene', name: 'Energía'},
    s2: { id: 'act_pwr', name: 'Potencia'}
};

let data = [];
let i = 0;
let out_name = '';
let txtPiso = '';
let sensor = 's1';


$(document).ready(function () {

    $('.listElement').click(function () {
        let piso = $(this).attr('id');
        document.getElementById("piso").innerHTML = piso;
        sensor = document.getElementById("sensor").innerHTML;
        getToken(pisos[piso], sensores[sensor]);
    });
    $('.sensor').click(function () {
        sensor = $(this).attr('id');
        document.getElementById("sensor").innerHTML = sensor;
        txtPiso = document.getElementById("piso").innerHTML;
        getToken(pisos[txtPiso], sensores[sensor]);
    });
})

function getToken(piso, sensor) {
    out_name = piso.name;
    let start = moment().subtract(300, 'minute').format('YYYY-MM-DDTHH:mm:ss');
    let end = moment().format('YYYY-MM-DDTHH:mm:ss');
    let hUrl = `https://ems.api.azimutenergia.co/charts/history?msr[ids][$in]=${piso.id}&dat[stt][$gte]=${start}&dat[end][$lte]=${end}&var=${sensor.id}&gty=minute&gty[apx]=5&organization_id=25`;

    var options = {
        url,
        method: 'POST',
        timeout: 0,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body
    };

    $.ajax(options).done(function (response) {
        let token = response.id_token;
        history(token, hUrl);
    });
}

function history(token, hUrl) {
    let options = {
        method: 'GET',
        url: hUrl,
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': `Bearer ${token}`
        }
    };

    $.ajax(options).done(function (response) {
        data = response.data;
        loop();
    });
}

function loop() {
    document.getElementById("azimut").innerHTML = `<b>${out_name}:</b> ${data[i].d} </br><b>${sensores[sensor].name} activa: </b>${data[i].v} `;
    if (++i < data.length) {
        if (i == data.length - 1) i = 0;
        setTimeout(loop, 1000); // call myself in 1 second time if required
    }
}