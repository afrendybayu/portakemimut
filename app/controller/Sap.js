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
		'SapEPO'
        ,'WoOpen7','WoOpen30','WoOpen60','WoOpenL60'
        ,'SapCause','SapDamage','SapOPart','SapSymptom'
		,'SapCauseInfo','SapDamageInfo','SapOPartInfo','SapSymptomInfo',
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
    },
    
	ubahLabelWO: function()	{
		var me=this;
		//console.log("onLauch SAP");
		me.getWoOpen7Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo3s7').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpen30Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo7s30').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpen60Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo30s60').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpenL60Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo60').setText(rec[0].get('teks'));
			}
		});
	},
	
	onLaunch: function() {
		this.ubahLabelWO();
	},
    
});
