

Ext.define('rcm.Application', {
    name: 'rcm',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
		//'Main'
		'ExcelGrid',
		'DetailInfo'
    ],

    stores: [
        // TODO: add stores here
        //'Hirarki'
    ]
});

/*
Ext.application({
    name: 'rcm',
    autoCreateViewport: true,

    controllers: [
		'DataEntry',
		'Konfig'
	],
    //models: ['DaftarGagal'],
    //stores: ['DaftarGagal'],
    //launch: function() {
	//	consolle.log("Launching rcm app");
    //}
});
//*/
