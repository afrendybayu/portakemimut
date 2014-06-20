Ext.define('rcm.controller.Laporan', {
    extend: 'Ext.app.Controller',
    /*
    requires: [
		//'Chart.ux.Highcharts'
    ],
	//*/
	views: [
        // TODO: add views here
		
		'lapobama.AvReChart'
		,'lapobama.AvGroup'
		//,'lapobama.AvHome'
		,'lapobama.ReHome'
		,'lapobama.SpeedoAv'
    ],

    controllers: [
        // TODO: add controllers here
		
    ],

    stores: [
        // TODO: add stores here
        'AvGroup'
		,'AvHome'
		,'ReHome'
		
    ],
    
    models: [
		
		'AvGroup'
		,'AvHome'
		,'ReHome'
    ],
    
    refs: [{
		ref : 'tAvReChart',
		selector : 'tAvReChart'
	},{
		ref : 'tAvGroup',
		selector : 'tAvGroup'
	},{
		ref : 'tAvSpeedo',
		selector : 'tAvSpeedo'
	/*
	},{
		ref : 'tAvHome',
		selector : 'tAvHome'
	//*/
	}],
    
    init: function() {
		var me = this;
        me.control({
			'tAvGroup': {
				AvGroupCl: me.AvGroupClick
			}
		});
		
    },
	
	AvGroupClick: function(d,nama) 	{
		var plh=this.getAvGroupStore().getAt(d.point.x).data;
		var	wkt=this.getTAvGroup().waktu;
		//console.log ("pencet avgroup " + plh + wkt );
		//Ext.getCmp('iflAvRe').setText(plh.nama+", id:"+plh.id+", w: "+wkt);
		Ext.getCmp('iflAvRe').setText(plh.nama+", "+wkt);
		this.getTAvSpeedo().chartConfig.min = rcm.view.Util.Ubb(plh.av);
		this.getAvSpeedoStore().getAt(0).set('av',plh.av);
		//this.getReSpeedoStore().getAt(0).set('av',plh.re);
		this.getTAvSpeedo().setTitle(plh.kode);
		this.getTAvSpeedo().setSubTitle("Availability "+wkt);
		this.getAvReUnitStore().load({ params:{tgl:wkt, eq:plh.id} });
		//this.getTAvReChart().items.items[1].items.items[0].items.items[0].setTitle('Reliability '+wkt);
		/*
		Ext.getCmp('spAvR').setTitle(plh.kode);
		Ext.getCmp('spAvR').setSubTitle("Availability "+wkt);
		
		Ext.getCmp('spReR').setTitle(plh.kode);
		Ext.getCmp('spReR').setSubTitle("Reliability "+wkt);
		
		Ext.getCmp('Av2Thn').setTitle("Availability "+plh.kode+" Annually");
		Ext.getCmp('Re2Thn').setTitle("Reliability "+plh.kode+" Annually");
		//*/

	},
	
	onPanelRendered: function(){
		console.log('cek laporan');
	}
    
    
});
