// *******************************************
// Property Inspector Extension
// https://forge.autodesk.com/blog/property-inspector-viewer
// *******************************************
function PropertyInspectorExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null;
    this.panel2 = null;
}

PropertyInspectorExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
PropertyInspectorExtension.prototype.constructor = PropertyInspectorExtension;

PropertyInspectorExtension.prototype.load = function () {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    return true;
};

PropertyInspectorExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

PropertyInspectorExtension.prototype.createUI = function () {
    var viewer = this.viewer;
    var panel = this.panel;
    var panel2 = this.panel2;

    /** MEDIDAS */
    var medidasPanel = new Autodesk.Viewing.UI.Button('btnMedidas');
    medidasPanel.icon.classList.add('energy');
    medidasPanel.onClick = function (e) {
        // if null, create it
        if (panel == null) {
            panel = new PropertyInspectorPanel(viewer, viewer.container, 'medidasPanel', 'Medidas');
            panel.showProperties(viewer.model.getRootId());
        }
        // show/hide docking panel
        panel.setVisible(!panel.isVisible());

    };

    /** PISOS */
    var floorPanel = new Autodesk.Viewing.UI.Button('btnPisos');
    floorPanel.icon.classList.add('pisos');
    floorPanel.onClick = function (e) {
        // if null, create it
        if (panel2 == null) {
            panel2 = new FloorsPanel(viewer, viewer.container, 'pisosPanel', 'Aislar capas');
            panel2.showProperties(viewer.model.getRootId());
        }
        // show/hide docking panel
        panel2.setVisible(!panel2.isVisible());

    }

    medidasPanel.addClass('propertyInspectorToolbarButton');
    medidasPanel.setToolTip('Consumo energético');
    floorPanel.addClass('propertyInspectorToolbarButton');
    floorPanel.setToolTip('Aislar pisos');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('PropertyInspectorToolbar');
    this.subToolbar.addControl(medidasPanel);
    this.subToolbar.addControl(floorPanel);

    viewer.toolbar.addControl(this.subToolbar);
};

PropertyInspectorExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('PropertyInspectorExtension', PropertyInspectorExtension);

// *******************************************
// Property Inspector Extension
// *******************************************

function PropertyInspectorPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    this.breadcrumbsItems = [];
    Autodesk.Viewing.UI.PropertyPanel.call(this, container, id, title, options);

    this.container.style.height = "220px";
    this.container.style.width = "340px";
    this.container.style.top = "10px";

    this.showBreadcrumbs = function () {
        // Create it if not there yet
        if (!this.breadcrumbs) {
            this.breadcrumbs = document.createElement('span');
            this.title.appendChild(this.breadcrumbs);
        } else {
            while (this.breadcrumbs.firstChild) {
                this.breadcrumbs.removeChild(this.breadcrumbs.firstChild);
            }
        }
    }; // showBreadcrumbs

    this.showProperties = function (dbId) {
        var piso;
        var domElem = document.getElementById('currSelect');
        var domElem1 = document.getElementById('txt');
        var fecha = document.getElementById('fecha');
        var fechacap = document.getElementById('fechacap');
        var ea = document.getElementById('ea');
        var eav = document.getElementById('eav');
        var pa = document.getElementById('pa');
        var pav = document.getElementById('pav');
        fecha.innerHTML = '';
        fechacap.innerHTML = '';
        ea.innerHTML = '';
        eav.innerHTML = '';
        pa.innerHTML = '';
        pav.innerHTML = '';
        domElem.innerText = '';
        domElem1.innerText = '';
        this.removeAllProperties();


        var that = this;
        this.viewer.getProperties(dbId, props => {
            props.properties.forEach(prop => {

                piso = typeof prop.displayValue == 'string' ? prop.displayValue.replace('Nivel', '').trim() : '';

                if (prop.displayCategory === 'Constraints' &&
                    prop.displayName.slice(0, 5) === 'Level' &&
                    Number.parseInt(piso) > 4
                ) {
                    let index = 'p' + piso;
                    getToken(pisos[index], that);
                    domElem1.innerText = 'Piso: ';
                    domElem.innerText = piso;

                    that.addProperty(
                        'Ubicación',
                        prop.displayValue
                    );


                } else
                if (
                    prop.displayCategory === 'Constraints' &&
                    prop.displayName.slice(0, 5) === 'Level') {
                    domElem.innerText = prop.displayValue;
                    domElem1.innerText = 'Ubicación: ';
                }
            });
        });

        this.breadcrumbsItems.push(dbId);
        this.showBreadcrumbs();
    }; // showProperties

    this.onBreadcrumbClick = function (event) {
        var dbId = parseInt(event.currentTarget.text);
        console.log('event');
        console.log(event.currentTarget.text);
        var index = this.breadcrumbsItems.indexOf(dbId)
        this.breadcrumbsItems = this.breadcrumbsItems.splice(0, index);

        this.showProperties(dbId);
    }; // onBreadcrumbClicked

    // This is overriding the default property click handler
    // of Autodesk.Viewing.UI.PropertyPanel
    this.onPropertyClick = function (property) {
        if (!property.name.includes('[dbId]')) {
            return;
        }

        var dbId = property.value;
        this.showProperties(dbId);
    }; // onPropertyClick

    this.onSelectionChanged = function (event) {
        var dbId = event.dbIdArray[0];

        if (!dbId) {
            dbId = this.viewer.model.getRootId();
        }

        this.breadcrumbsItems = [];
        this.showProperties(dbId);
    } // onSelectionChanged

    viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        this.onSelectionChanged.bind(this)
    );

}; // PropertyInspectorPanel
PropertyInspectorPanel.prototype = Object.create(Autodesk.Viewing.UI.PropertyPanel.prototype);
PropertyInspectorPanel.prototype.constructor = PropertyInspectorPanel;


// *******************************************
// Floors Extension
// *******************************************

function FloorsPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    this.breadcrumbsItems = [];
    Autodesk.Viewing.UI.PropertyPanel.call(this, container, id, title, options);

    this.container.style.height = "360px";
    this.container.style.width = "220px";
    this.container.style.top = "10px";
    this.container.style.left = "0px";

    this.showBreadcrumbs = function () {
        // Create it if not there yet
        if (!this.breadcrumbs) {
            this.breadcrumbs = document.createElement('span');
            this.title.appendChild(this.breadcrumbs);
        } else {
            while (this.breadcrumbs.firstChild) {
                this.breadcrumbs.removeChild(this.breadcrumbs.firstChild);
                this.breadcrumbs.onclick = this.onBreadcrumbClick.bind(this);
            }
        }
    }; // showBreadcrumbs

    this.showProperties = function () {
        this.removeAllProperties();
        var that = this;

        // that.addProperty('Key', 'Value (HTML code)', 'Group');
        that.addProperty('Piso', '5', 'Con sensor');
        that.addProperty('Piso', '6', 'Con sensor');
        that.addProperty('Piso', '7', 'Con sensor');
        that.addProperty('Piso', '8', 'Con sensor');
        that.addProperty('Piso', '9', 'Con sensor');
        that.addProperty('Piso', '10', 'Con sensor');
        that.addProperty('Piso', '12', 'Con sensor');
        that.addProperty('Piso', '13', 'Con sensor');
        that.addProperty('Piso', '14', 'Con sensor');
        that.addProperty('Piso', '15', 'Con sensor');
        that.addProperty('Piso', '16', 'Con sensor');
        that.addProperty('Piso', '1A', 'Sin sensor');
        that.addProperty('Piso', '1B', 'Sin sensor');
        that.addProperty('Piso', '2A', 'Sin sensor');
        that.addProperty('Piso', '2B', 'Sin sensor');
        that.addProperty('Piso', '3A', 'Sin sensor');
        that.addProperty('Piso', '3B', 'Sin sensor');
        that.addProperty('Piso', '4A', 'Sin sensor');
        that.addProperty('Piso', '4B', 'Sin sensor');
        that.addProperty('Piso', 'CUBIERTA', 'Sin sensor');

        this.showBreadcrumbs();
    }; // showProperties

    // This is overriding the default property click handler
    // of Autodesk.Viewing.UI.PropertyPanel
    this.onPropertyClick = function (property) {
        if (property.value != 'CUBIERTA') {
            let piso = property.value;
            property.value = 'Nivel ' + piso;
        }
        property.name = 'Level';
        property.category = 'Constraints';
        isolate(property);

    }; // onPropertyClick

    this.onSelectionChanged = function (event) {
        this.breadcrumbsItems = [];
    } // onSelectionChanged

    viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        this.onSelectionChanged.bind(this)
    );

}; // FloorsPanel
FloorsPanel.prototype = Object.create(Autodesk.Viewing.UI.PropertyPanel.prototype);
FloorsPanel.prototype.constructor = FloorsPanel;

/** ISOLATION */
function isolate(property) {
    let _viewer = viewerApp.getCurrentViewer();
    _viewer.search('"' + property.value + '"', function (dbIds) {
        getSubset(dbIds, property.name, property.value, function (dbIds) {
            _viewer.isolate(dbIds)
        })
    }, function (error) {}, [property.attributeName])
}
function getSubset(dbIds, name, value, callback) {
    let _viewer = viewerApp.getCurrentViewer();
    _viewer.model.getBulkProperties(dbIds, {
        propFilter: [name],
        ignoreHidden: true
    }, function (data) {
        var newDbIds = []
        for (var key in data) {
            var item = data[key]
            if (item.properties[0].displayValue === value) {
                newDbIds.push(item.dbId)
            }
        }

        console.log("getSubset, dbIds.length after = " + newDbIds.length)

        callback(newDbIds)

    }, function (error) {})
}

/** AZIMUT */
// Authentication: POST -->token
let meas = [];
const url = "https://security.azimutenergia.co/api/authentication";
const body = JSON.stringify({
    "username": "pactia.buro4",
    "password": "G&iBl={83w'EL2pim]g|Z$ARkHR?Xh"
});

// History: GET --> {json}
const pisos = {
    p5: {
        id: '5dfb91044c6618853f236f1b',
        name: 'Piso 5'
    },
    p6: {
        id: '5dfb91964c6618853f236f1c',
        name: 'Piso 6'
    },
    p7: {
        id: '5dfb95655a26247b69757a59',
        name: 'Piso 7'
    },
    p8: {
        id: '5dfb95bf5a26247b69757a5a',
        name: 'Piso 8'
    },
    p9: {
        id: '5dfb96a25a26247b69757a5b',
        name: 'Piso 9'
    },
    p10: {
        id: '5e270674212d7a033b45870c',
        name: 'Piso 10'
    },
    p11: {
        id: '5e38215782d104f0b391995f',
        name: 'Piso 11'
    },
    p12: {
        id: '5e3821ed82d104f0b3919960',
        name: 'Piso 12'
    },
    p13: {
        id: '5dfbe8898e1ba408affa0fbf',
        name: 'Piso 13'
    },
    p14: {
        id: '5dfbe8138e1ba408affa0fbe',
        name: 'Piso 14'
    },
    p15: {
        id: '5dfbe7ae8e1ba408affa0fbd',
        name: 'Piso 15 Totalizador 1'
    },
    p15_2: {
        id: '5dfceb8fa058b81b1c05d771',
        name: 'Piso 15 Totalizador 2'
    },
    p16: {
        id: '5df00efe748d27a793c38929',
        name: 'Piso 16'
    }
};

const sensores = {
    s1: {
        id: 'act_ene',
        name: 'Energía',
        unit: 'kWh',
        domEl: 'ea',
        domTxt: 'eav'
    },
    s2: {
        id: 'act_pwr',
        name: 'Potencia',
        unit: 'kW',
        domEl: 'pa',
        domTxt: 'pav'
    }
};

async function getToken(piso, that) {
    let start = moment().subtract(15, 'minute').format('YYYY-MM-DDTHH:mm:ss');
    let end = moment().format('YYYY-MM-DDTHH:mm:ss');
    let hUrl = `https://ems.api.azimutenergia.co/charts/history?msr[ids][$in]=${piso.id}&dat[stt][$gte]=${start}&dat[end][$lte]=${end}&var=${sensores['s1'].id}&gty=minute&gty[apx]=5&organization_id=25`;
    let hUrlp = `https://ems.api.azimutenergia.co/charts/history?msr[ids][$in]=${piso.id}&dat[stt][$gte]=${start}&dat[end][$lte]=${end}&var=${sensores['s2'].id}&gty=minute&gty[apx]=5&organization_id=25`;

    var options = {
        url,
        method: 'POST',
        timeout: 0,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body,
        success: function (response) {
            let token = response.id_token;
            history(token, hUrl, 's1', that);
            history(token, hUrlp, 's2', that);
        }
    };

    await $.ajax(options);
}


async function history(token, hUrl, s, that) {
    let data = [];
    let options = {
        method: 'GET',
        async: true,
        url: hUrl,
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': `Bearer ${token}`
        },
        success: function (response) {
            let ind = response.data.length - 1;

            data = response.data[ind];
            let valUnit = `${data.v} ${sensores[s].unit}`;
            let fecha = data.d.replace('T', ' ');
            document.getElementById("fecha").innerHTML = `Fecha captura: `;
            document.getElementById("fechacap").innerHTML = fecha;

            document.getElementById(sensores[s].domEl).innerHTML = `<b>${sensores[s].name} activa: </b>`;
            document.getElementById(sensores[s].domTxt).innerHTML = valUnit;

            if (s == 's1') that.addProperty('Hora', fecha);
            that.addProperty(`${sensores[s].name} activa`, valUnit);
        }
    };

    await $.ajax(options);
}