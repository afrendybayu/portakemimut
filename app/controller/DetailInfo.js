Ext.define('rcm.controller.DetailInfo', {
    extend: 'Ext.app.Controller',

    views: [
		//'rcm.view.Util',
		//'dataentry.ExcelGrid'
    ],

    controllers: [

    ],

    stores: [
		'DetailGagal'
		,'EventInfo'
		,'Note'
    ],
    
    models: [
		//'RunningHour'
    ],
    
	refs: [{
		ref: 'taskDaftarGagal',
		selector: 'taskDaftarGagal'
	}],
	
	init: function() {
		var me = this;
        me.control({
			'taskDaftarGagal': {
				editDGClick: me.edDG
				,hapusDGClick: me.hpsDG
				,infoDetailGagal: me.infoDG
			}
			
		});
    },

	edDG: function()	{
		alert("Controller edDG");
	},
	
	hpsDG: function()	{
		alert("Controller hpsDG");
	},
	
	infoDG: function(id, ev)	{
		this.getDetailGagalStore().load({ params:{id:id} });
		
		this.getEventInfoStore().load({ 
			params:{id:id}
			,scope: this
			/*
			,callback: function(rec, operation, success) {
				if (success) {
					rcmSettings.asa = rec;
				}
			}
			//*/
		});
		
		this.getNoteStore().load({ 
			params:{id:id},
			scope: this,
			callback: function(rec, operation, success) {
				if (success) {
					Ext.getCmp('htmleddet').setValue(rec[0].get('ket'));
				}
			}
		});
		
		var html = Ext.getCmp('idinfofmea');
		if (ev>2)	{
			html.expand();
		}
		else 	{	//
			html.collapse();
		}
		
		Ext.getCmp('bgDetail').expand();
		
		//alert("Controller infoDG");
	}

});
