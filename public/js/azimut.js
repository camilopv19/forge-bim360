// var Request = require("request");
// var moment = require("moment");
// const r = require('./response');
const r = [{
        d: '2020-07-01T03:50',
        v: 0.801329
    },
    {
        d: '2020-07-01T03:55',
        v: 1.008
    },
    {
        d: '2020-07-01T04:00',
        v: 1.116
    },
    {
        d: '2020-07-01T04:05',
        v: 0.828
    },
    {
        d: '2020-07-01T04:10',
        v: 0.756
    },
    {
        d: '2020-07-01T04:15',
        v: 0.9
    },
    {
        d: '2020-07-01T04:20',
        v: 1.212
    },
    {
        d: '2020-07-01T04:25',
        v: 0.648
    },
    {
        d: '2020-07-01T04:30',
        v: 0.708
    },
    {
        d: '2020-07-01T04:35',
        v: 0.828
    },
    {
        d: '2020-07-01T04:40',
        v: 1.068
    },
    {
        d: '2020-07-01T04:45',
        v: 0.78
    },
    {
        d: '2020-07-01T04:50',
        v: 0.636
    },
    {
        d: '2020-07-01T04:55',
        v: 0.936
    },
    {
        d: '2020-07-01T05:00',
        v: 1.068
    },
    {
        d: '2020-07-01T05:05',
        v: 0.84
    },
    {
        d: '2020-07-01T05:10',
        v: 0.828
    },
    {
        d: '2020-07-01T05:15',
        v: 1.08866
    },
    {
        d: '2020-07-01T05:20',
        v: 1.152
    },
    {
        d: '2020-07-01T05:25',
        v: 0.708
    },
    {
        d: '2020-07-01T05:30',
        v: 0.687379
    },
    {
        d: '2020-07-01T05:35',
        v: 0.996
    },
    {
        d: '2020-07-01T05:40',
        v: 1.028571
    },
    {
        d: '2020-07-01T05:45',
        v: 0.636
    },
    {
        d: '2020-07-01T05:50',
        v: 0.648
    },
    {
        d: '2020-07-01T05:55',
        v: 1.152
    },
    {
        d: '2020-07-01T06:00',
        v: 1.08
    },
    {
        d: '2020-07-01T06:05',
        v: 1.336455
    },
    {
        d: '2020-07-01T06:10',
        v: 1.044
    },
    {
        d: '2020-07-01T06:15',
        v: 1.056
    },
    {
        d: '2020-07-01T06:20',
        v: 0.94485
    },
    {
        d: '2020-07-01T06:25',
        v: 0.636
    },
    {
        d: '2020-07-01T06:30',
        v: 0.792
    },
    {
        d: '2020-07-01T06:35',
        v: 0.972
    },
    {
        d: '2020-07-01T06:40',
        v: 0.975251
    },
    {
        d: '2020-07-01T06:45',
        v: 0.636
    },
    {
        d: '2020-07-01T06:50',
        v: 0.708
    },
    {
        d: '2020-07-01T06:55',
        v: 1.044
    },
    {
        d: '2020-07-01T07:00',
        v: 0.96
    },
    {
        d: '2020-07-01T07:05',
        v: 0.648
    },
    {
        d: '2020-07-01T07:10',
        v: 0.645847
    },
    {
        d: '2020-07-01T07:15',
        v: 1.56
    },
    {
        d: '2020-07-01T07:20',
        v: 1.32
    },
    {
        d: '2020-07-01T07:25',
        v: 1.608
    },
    {
        d: '2020-07-01T07:30',
        v: 1.083612
    },
    {
        d: '2020-07-01T07:35',
        v: 1.488
    },
    {
        d: '2020-07-01T07:40',
        v: 2.28
    },
    {
        d: '2020-07-01T07:45',
        v: 2.436
    },
    {
        d: '2020-07-01T07:50',
        v: 2.364
    },
    {
        d: '2020-07-01T07:55',
        v: 2.304
    },
    {
        d: '2020-07-01T08:00',
        v: 1.7701
    },
    {
        d: '2020-07-01T08:05',
        v: 2.1
    },
    {
        d: '2020-07-01T08:10',
        v: 2.088
    },
    {
        d: '2020-07-01T08:15',
        v: 2.448
    },
    {
        d: '2020-07-01T08:20',
        v: 1.968
    },
    {
        d: '2020-07-01T08:25',
        v: 1.716
    },
    {
        d: '2020-07-01T08:30',
        v: 0.9
    },
    {
        d: '2020-07-01T08:35',
        v: 1.188
    },
    {
        d: '2020-07-01T08:40',
        v: 0.78
    }
];


// Authentication: POST -->token
const url = "https://security.azimutenergia.co/api/authentication";
const body = JSON.stringify({
    "username": "pactia.buro4",
    "password": "G&iBl={83w'EL2pim]g|Z$ARkHR?Xh"
});

// History: GET --> {json}
// let start = moment().subtract(300, 'minute').format('YYYY-MM-DDTHH:mm:ss');
// let end = moment().format('YYYY-MM-DDTHH:mm:ss');
// let piso5 = "5dfb91044c6618853f236f1b";
// let piso7 = "5dfb95655a26247b69757a59";
// let hUrl = `https://ems.api.azimutenergia.co/charts/history?msr[ids][$in]=${piso5}&dat[stt][$gte]=${start}&dat[end][$lte]=${end}&var=act_pwr&gty=minute&gty[apx]=5&organization_id=25`;
// // let hUrl = `https://ems.api.azimutenergia.co/charts/history?msr[ids][$in]=${piso5}&dat[stt][$gte]=2020-02-27T00:00:00&dat[end][$lte]=2020-03-04T23:59:59&var=act_pwr&gty=minute&gty[apx]=5&organization_id=25`;

let answer = [];

function getToken() {
    Request.post({
        "headers": {
            "content-type": "application/json"
        },
        url,
        body
    }, (err, res, body) => {
        if (err) return console.dir(err);

        let token = JSON.parse(body).id_token;
        history(token);
    });
}



function history(token) {
    let options = {
        "method": "GET",
        "url": hUrl,
        "headers": {
            "Content-Type": "application/xml",
            // "Authorization": `Bearer eyJraWQiOiI4aFdvcHV3dm8xU2FORFE1NXdwRllcL3VwVStqSmd3YURFSDJ5cWZJZks4bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlMDE1ZTViNS00NmQzLTRhYmQtOGUyNC1hYmI5MTYxOTM0YjciLCJhdWQiOiIxOHEzbmJjYTQ0NjVhY24wNWY0amYxaTV2aSIsImV2ZW50X2lkIjoiMmEzYjVjMjQtOWUwMC00MmM5LWIxY2UtZmJlZDAzMWE0OTBlIiwic3JjIjoiYXBpIiwidG9rZW5fdXNlIjoiaWQiLCJwbXMiOiJHRVRcL2NoYXJ0c1wvaGlzdG9yeToqOjoqOixHRVRcL21lYXN1cmVyc1wve2lkfToqOjoqOiIsImF1dGhfdGltZSI6MTU5MDA5MTA2MSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNjRIUkk1aVZlIiwiY29nbml0bzp1c2VybmFtZSI6InBhY3RpYS5idXJvNCIsImV4cCI6MTU5MDA5NDY2MSwiaWF0IjoxNTkwMDkxMDYxfQ.fiMojMLb_gL5MsotsM9c8P_KRiX-3HdxhCf1vwLhAIloOz33I8-1sigP2gW8pQj8VSm6qzyR5LLnNYe8NHXaDDwEv44TxB0A6-20Ev8Ob2PstBDv5U5Z3OdLCwat-bLUCyDMYN9nFWhaNkf7I4xv9DGOSOpJm1yjk7_Wy-FnuknHpRx0WVuBsRFI-xmSsPK20bkJ5bVgvcrc4DpDvs6NaPTCpaWTvedxAZ9rmbQhJgXBHtimyW0tFX85MW9SdPZvJ4kOqGg7MiPyQc0tBBiFbfnr-upgfT4L_WR19Zi27QBLlQLZhhR44OxgLq3lJlRV_wJGR0x55u2EVwMFnCfY6g`
            "Authorization": `Bearer ${token}`
        }
    };
    // console.log('\n');
    Request(options, function (error, response) {
        if (error) throw new Error(error);

        // document.getElementById("azimut").innerText = JSON.parse(response.body).data[0].v;
        // return answer;
        // console.log(JSON.parse(response.body).data);
    });
}

// getToken();


var i = 0;
(function loop() {
    document.getElementById("azimut").innerHTML = '<b>Piso 5:</b> '+ r[i].d + ' - Valor: ' + r[i].v;
    if (++i < r.length) {
        setTimeout(loop, 1000); // call myself in 1 second time if required
    }
})();


// module.exports = {getToken, answer};