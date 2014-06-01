Ext.define('rcm.controller.Sap', {
    extend: 'Ext.app.Controller',
    //*
    views: [
        // TODO: add views here
        'laporan.Chart'
        ,'laporan.UploadFile'
        ,'laporan.SpeedoSap'
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
        //'Hirarki'
        'SapEPO'
        ,'WoOpen7'
        ,'WoOpen30'
        ,'WoOpen60'
        ,'WoOpenL60'
    ],
    
    models: [
		//'Hirarki',
    ],
    
    refs: [{
		ref: 'tabChart',
		selector: 'tabChart'
	}],
    
    init: function() {
		var me = this;
        me.control({
			
		});
    }
    
    
});
