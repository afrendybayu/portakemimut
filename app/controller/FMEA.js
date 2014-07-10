Ext.define('rcm.controller.FMEA', {
    extend: 'Ext.app.Controller',

    views: [
		//'rcm.view.Util',
		//'dataentry.ExcelGrid'
    ],

    stores: [
		'Equip'
		,'OPart'
		,'FMode'
		,'PM'
    ],
    
    models: [
		//'RunningHour'
    ],
    
	refs: [{
		ref: 'taskFMEAGrid',
		selector: 'taskFMEAGrid'
	},{
		ref: 'isiFormGagal',
		selector: 'isiFormGagal'
	}],
	//*
	init: function() {
		var me = this;
        me.control({
			'taskFMEAGrid': {
				//editDGClick: me.edDG
				//,hapusDGClick: me.hpsDG
				//,infoDetailGagal: me.infoDG
			},
			'#tambah-fmea-btn': {
				click: me.tmbhFMEAClick
			}
			
		});
    },
    //*/
    
    tmbhFMEAClick: function()	{
		alert('tambah FNMEA');
	}
	/*
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
	},

	cariDG: function()	{
		alert("tampil tanggal: "+Ext.getCmp("iblnDGaw").getValue()+" "+Ext.getCmp("iblnDGak").getValue());
		this.getDaftarGagalStore().load({ 
			params:{ tw:Ext.getCmp("iblnDGaw").getValue(), tk:Ext.getCmp("iblnDGak").getValue() } });
	}
	//*/
});
