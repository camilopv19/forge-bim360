/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

var viewer;

// @urn the model to show
// @viewablesId which viewables to show, applies to BIM 360 Plans folder
function launchViewer(urn, viewableId) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken,
    api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

  function onDocumentLoadSuccess(doc) {
    // if a viewableId was specified, load that view, otherwise the default view
    var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
    viewer.loadDocumentNode(doc, viewables).then(i => {
      viewer.loadExtension("Autodesk.VisualClusters");
      viewer.loadExtension('Autodesk.Hyperlink');
      viewer.loadExtension("Autodesk.PDF");
      viewer.loadExtension('Autodesk.DocumentBrowser');
      viewer.loadExtension('Autodesk.Geolocation');
      viewer.loadExtension('Autodesk.CrossFadeEffects');
      viewer.loadExtension('Autodesk.Edit2D');
      viewer.loadExtension('Autodesk.ViewCubeUi');
      viewer.loadExtension('Autodesk.BIM360.GestureDocumentNavigation');
      viewer.loadExtension('Autodesk.BIM360.RollCamera');
      viewer.loadExtension('Autodesk.Viewing.SceneBuilder');
      viewer.loadExtension('Autodesk.Snapping');
      viewer.loadExtension('Autodesk.Viewing.Popout');
      viewer.loadExtension('Autodesk.Viewing.ZoomWindow');
      viewer.loadExtension('Autodesk.Viewing.Wireframes');
      viewer.loadExtension('Autodesk.Section');
      viewer.loadExtension('Autodesk.DefaultTools.NavTools');
      viewer.loadExtension('Autodesk.Measure');
      viewer.loadExtension('Autodesk.Viewing.FusionOrbit');
      viewer.loadExtension('Autodesk.BimWalk');
      viewer.loadExtension('Autodesk.GoHome');
      viewer.loadExtension('Autodesk.Explode');
      viewer.loadExtension('Autodesk.FullScreen');
      viewer.loadExtension('Autodesk.LayerManager');
      viewer.loadExtension('Autodesk.ModelStructure');
      viewer.loadExtension('Autodesk.PropertiesManager');
      viewer.loadExtension('Autodesk.ViewerSettings');
      //viewer.loadExtension('Autodesk.BIM360.Minimap');
      // any additional action here?
    });
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}