/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/
//Ext.util.Cookies.set('greet', 'Greet from Sencha');
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false, 
    paths: {
        //"Extensible": "./modul/extensible-1.5.2/src/",
        //"Extensible.example": "./modul/extensible-1.5.2/examples/",
        'Chart' : './modul/Chart/'
    }
});

//Ext.require('Chart.ux.Highcharts');
//Ext.require('Chart.ux.Highcharts.BarSerie');

Ext.syncRequire([
  'Ext.util.Observable',
  'Ext.util.Cookies'
  //,'Chart.ux.Highcharts'
]);
//*
Ext.application({
    name: 'rcm',

    extend: 'rcm.Application',
    
    autoCreateViewport: true

});
//*/

/*
Ext.application({
    name: 'rcm',

    launch: function() {
        Ext.util.Cookies.set('greet', 'Greet from Sencha');
        Ext.Msg.alert('Sencha', Ext.util.Cookies.get('greet'));
    }
});
//*/
