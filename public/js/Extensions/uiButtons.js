///////////////////////////////////////////////////////////////////////////////
// Autodesk.ADN.Viewing.Extension.UIComponent
// by Philippe Leefsma, May 2015
// https://adndevblog.typepad.com/cloud_and_mobile/2015/05/building-self-contained-ui-components-for-the-viewer.html
///////////////////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.UIComponent = function (viewer, options) {

  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _panel = null;
  var _panel0 = null;

  this.load = function () {

    var ctrlGroup = getControlGroup();

    createControls(ctrlGroup);

    _panel = new Autodesk.ADN.Viewing.Extension.UIComponent.Panel(
      viewer.container,
      newGUID(),
      false); // Flag to define the HTML content of the UIComponent: Ops = true

    _panel0 = new Autodesk.ADN.Viewing.Extension.UIComponent.Panel(
      viewer.container,
      newGUID(),
      true);

    console.log('newGUID loaded');

    return true;
  };

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function newGUID() {
    //id generator
    var d = new Date().getTime();

    var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });
    return guid;
  };
  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  this.unload = function () {

    try {

      var toolbar = viewer.getToolbar(true);

      toolbar.removeControl(
        'Autodesk.ADN.UIComponent.ControlGroup');
    } catch (ex) {
      $('#uiButtons').remove();
    }

    console.log('Autodesk.ADN.Viewing.Extension.UIComponent unloaded');

    return true;
  };

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function getControlGroup() {

    var toolbar = null;

    try {
      toolbar = viewer.getToolbar(true);

      if (!toolbar) {
        toolbar = createDivToolbar();
      }
    } catch (ex) {
      toolbar = createDivToolbar();
    }

    var control = toolbar.getControl(
      'Autodesk.ADN.Gallery.ControlGroup');

    if (!control) {

      control = new Autodesk.Viewing.UI.ControlGroup(
        'Autodesk.ADN.UIComponent.ControlGroup');

      toolbar.addControl(control);
    }

    return control;
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function createDivToolbar() {

    var toolbarDivHtml =
      '<div id="uiButtons"> </div>';
    $(viewer.container).append(toolbarDivHtml);

    $('#divToolbar').css({
      'bottom': '0%',
      'left': '50%',
      'z-index': '100',
      'position': 'absolute'
    });
    $(viewer.container).append(toolbarDivHtml);

    var toolbar = new Autodesk.Viewing.UI.ToolBar(true);

    $('#uiButtons')[0].appendChild(
      toolbar.container);

    return toolbar;
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function createControls(parentGroup) {

    var btn = createButton(
      'Autodesk.ADN.UIComponent.Button.Show',
      'sostenibilidad',
      'Sostenibilidad',
      onShowPanel);

    var btn0 = createButton(
      'btnOperaciones',
      'pactia',
      'Pactia+',
      onShowPanel0);

    parentGroup.addControl(btn);
    parentGroup.addControl(btn0);
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function onShowPanel() {

    _panel.setVisible(true);
  }

  function onShowPanel0() {

    _panel0.setVisible(true);
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function createButton(id, className, tooltip, handler) {

    var button = new Autodesk.Viewing.UI.Button(id);

    // button.icon.className = className;
    button.icon.classList.add(className);

    button.setToolTip(tooltip);

    button.onClick = handler;

    return button;
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  Autodesk.ADN.Viewing.Extension.UIComponent.Panel = function (
    parentContainer,
    baseId,
    ops) {

    let _cTitle = 'Residuos';
    let _left = "10px"


    this.content = document.createElement('div');


    this.content.id = baseId + 'PanelContentId1';
    this.content.className = 'uicomponent-panel-content';

    if (ops) {
      _cTitle = 'Crear solicitud';
      _left = '400px';
    }

    Autodesk.Viewing.UI.DockingPanel.call(
      this,
      parentContainer,
      baseId,
      _cTitle, {
        shadow: ops
      }
    );

    this.container.style.top = "100px";
    this.container.style.left = _left;

    this.container.style.width = "380px";
    this.container.style.height = "400px";

    this.container.style.resize = "auto";
    this.container.style.background = "#2D2E2E";

    var html = [
      '<div class="uicomponent-panel-container1">',
      '<div class="uicomponent-panel-controls-container1">',
      '<div>',
      '<button class="btn btn-info" id="' + baseId + 'addBtn">',
      '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Añadir item',
      '</button>',
      '<input class="uicomponent-panel-input" type="text" placeholder=" Nombre (Por defecto: Fecha)" id="' + baseId + 'itemName">',
      '</div>',
      '<br>',
      '<div>',
      '<button class="btn btn-warning" id="' + baseId + 'clearBtn">',
      '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <label> Limpiar  </label>',
      '</button>',
      '</div>',
      '</div>',
      '<div id="' + baseId + 'PanelContainerId" class="list-group uicomponent-panel-list-container">',
      '</div>',
      '</div>'
    ].join('\n');

    var _opsHtml = [
      '<div class="uicomponent-panel-container1">',
      '<div class="uicomponent-panel-controls-container1">',
      '<form>',
      '<input class="uicomponent-panel-input" type="text" placeholder=" (Por defecto: Fecha)" id="' + baseId + 'fecha">',
      '<br>',
      '<input class="uicomponent-panel-input" type="text" placeholder="Inmueble" id="' + baseId + 'inmueble">',
      '<br>',
      '<input class="uicomponent-panel-input" type="text" placeholder="Sistema" id="' + baseId + 'sistema">',
      '<br>',
      '<br>',
      '<br>',
      '<div>',
      '<button class="btn btn-warning" id="' + baseId + 'clearForm">',
      '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span><label>Limpiar</label>',
      '</button>',
      '</div>',
      '<button class="btn btn-info" id="' + baseId + 'notifBtn">',
      '<span class="glyphicon glyphicon-bullhorn" aria-hidden="true"></span> Enviar',
      '</button>',
      '</form>',
      '</div>',
      '</div>',
    ].join('\n');

    $('#' + baseId + 'PanelContentId1').html(ops ? _opsHtml : html);

    /////////////////////////////////////////////
    //
    //    addBtn
    /////////////////////////////////////////////
    $('#' + baseId + 'addBtn').click(function () {

      var name = $('#' + baseId + 'itemName').val();
      $('#' + baseId + 'itemName').val('');

      name = name.length ? name :
        new Date().toString('d/M/yyyy H:mm:ss');

      var item = {
        name: name,
        id: newGUID(),
        handler: function () {
          alert('Item: ' + name + ' seleccionado!')
        }
      }

      var html = [
        '<div class="list-group-item uicomponent-panel-item" id="' + item.id + '">',
        name,
        '</div>'

      ].join('\n');

      $('#' + baseId + 'PanelContainerId').append(html);

      $('#' + item.id).click(function () {
        item.handler();
      });
    });
    /////////////////////////////////////////////
    //
    //    nofitBtn
    /////////////////////////////////////////////
    $('#' + baseId + 'nofitBtn').click(function () {

    });

    $("form").submit(function (e) {
      e.preventDefault();
      var values = {};
      $('form > input').each(
        function (idx, child) {
          if (idx === 0) {
            let date = $(child).val();
            date = date.length ? date : new Date().toString('d/M/yyyy H:mm:ss');
            $(child).val(date);
          }
          values[child.id.replace(baseId,'')] = $(child).val();
        }
      )
      console.log(values);
      // alert( JSON.stringify(values));
      alert('Datos enviados');
      
    });

    /////////////////////////////////////////////
    //
    //clearBtn
    /////////////////////////////////////////////
    $('#' + baseId + 'clearBtn').click(function () {

      $('#' + baseId + 'PanelContainerId > div').each(
        function (idx, child) {
          $(child).remove();
        }
      )
    });
    /////////////////////////////////////////////
    //
    //clearForm
    /////////////////////////////////////////////
    $('#' + baseId + 'clearForm').click(function () {
      $('form > input').each(
        function (idx, child) {
          $(child).val('');
        }
      )
    });
  };

  Autodesk.ADN.Viewing.Extension.UIComponent.Panel.prototype = Object.create(
    Autodesk.Viewing.UI.DockingPanel.prototype);

  Autodesk.ADN.Viewing.Extension.UIComponent.Panel.prototype.constructor =
    Autodesk.ADN.Viewing.Extension.UIComponent.Panel;

  Autodesk.ADN.Viewing.Extension.UIComponent.Panel.prototype.initialize = function () {
    // Override DockingPanel initialize() to:
    // - create a standard title bar
    // - click anywhere on the panel to move

    this.title = this.createTitleBar(
      this.titleLabel ||
      this.container.id);

    this.closer = this.createCloseButton();
    this.initializeMoveHandlers(this.title);
    this.container.appendChild(this.title);
    this.container.appendChild(this.content);
    this.initializeCloseHandler(this.closer);
    this.container.appendChild(this.closer);

  };

  var css = [

    'div.uicomponent-panel-content {',
    'height: calc(100% - 60px);',
    '}',

    'div.uicomponent-panel-container1 {',
    'height: calc(100% - 60px);',
    'margin: 10px;',
    '}',

    'div.uicomponent-panel-controls-container1 {',
    'margin-bottom: 10px;',
    '}',

    'div.uicomponent-panel-list-container {',
    'height: calc(100% - 60px);',
    'overflow-y: auto;',
    '}',

    'div.uicomponent-panel-item {',
    'margin-left: 0;',
    'margin-right: 0;',
    'color: #FFFFFF;',
    'background-color: #3F4244;',
    'margin-bottom: 5px;',
    'border-radius: 4px;',
    '}',

    'div.uicomponent-panel-item:hover {',
    'background-color: #5BC0DE;',
    '}',

    'label.uicomponent-panel-label {',
    'color: #FFFFFF;',
    '}',

    'input.uicomponent-panel-input {',
    'height: 30px;',
    'width: 60%;',
    'border-radius: 5px;',
    'color: black;',
    '}'

  ].join('\n');

  $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css"/>').appendTo('head');
  $('<style type="text/css">' + css + '</style>').appendTo('head');
};

Autodesk.ADN.Viewing.Extension.UIComponent.prototype =
  Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.UIComponent.prototype.constructor =
  Autodesk.ADN.Viewing.Extension.UIComponent;

Autodesk.Viewing.theExtensionManager.registerExtension(
  'uiButtons',
  Autodesk.ADN.Viewing.Extension.UIComponent);