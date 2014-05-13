/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        "Extensible": "./modul/extensible-1.5.2/src/",
        "Extensible.example": "./modul/extensible-1.5.2/examples/",
        "Chart" : "./modul/Chart/"
    }
});

Ext.application({
    name: 'rcm',

    extend: 'rcm.Application',
    
    autoCreateViewport: true

});
