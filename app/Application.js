
Ext.define('rcm.Application', {
    name: 'rcm',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
		//'Main',
		//,'Laporan'
		
		//=================
		
		'ExcelGrid'
		,'DetailInfo'		
		,'Sap'
		,'Login'
		,'AvRe'
		
		//=================
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
