Ext.define('rcm.controller.Sap', {
    extend: 'Ext.app.Controller',
    //*
    views: [
        // TODO: add views here
        'laporan.Chart'
        ,'laporan.UploadFile'
        ,'laporan.SpeedoSap'
        ,'laporan.GridCause'
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
		},{
			ref: 'taskGridCause',
			selector: 'taskGridCause',
			xtype: 'taskGridCause',
			autoCreate: true
	}],
    
    init: function() {
		var me = this;
        me.control({
			//*
			'taskGridCause': {
				sapFilter: me.grafikFilter,
				clrChartCause: me.grafikCauseClear
			}
			/*
			'causechart': {
				chartFilterCause: me.grafikCauseClick
			}
			//*/
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
	
	grafikCauseClear: function()	{
		var tab=rcmSettings.tsp.split("_");
		if ((tab[0].localeCompare("ts")==0) && (tab[1]=='ca'))	{
			this.getSapCauseInfoStore().clearFilter();
		} else if ((tab[0].localeCompare("ts")==0) && (tab[1]=='da'))	{
			this.getSapDamageInfoStore().clearFilter();
		}
		
	},
	
	grafikFilter: function(n, d)	{
		if (n.localeCompare("dam")==0)	{
			this.getSapDamageInfoStore().clearFilter(true);
			this.getSapDamageInfoStore().filter('damage',d.kode);
		} else if (n.localeCompare("cau")==0)	{
			this.getSapCauseInfoStore().clearFilter(true);
			this.getSapCauseInfoStore().filter('cause',d.kode);
		} else if (n.localeCompare("opt")==0)	{
			this.getSapOPartInfoStore().clearFilter(true);
			this.getSapOPartInfoStore().filter('opart',d.kode);
		}
		//*/
	},
    
});
