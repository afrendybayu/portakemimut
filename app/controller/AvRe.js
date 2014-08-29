Ext.define('rcm.controller.AvRe', {
    extend: 'Ext.app.Controller',
    //*
    views: [
		'lapobama.AvGroup'
		,'lapobama.SpeedoAv'
		,'lapobama.BlnAv'
		
		,'utama.HoChart'
    ],

    stores: [
		'AvReUnit','AvHome','ReHome','AvGroup','AvSpeedo','ReSpeedo'
		
		,'SpAvGcUt','SpAvGsUt','SpAvPmUt','SpReGcUt','SpReGsUt','SpRePmUt'
		,'HoOrderC','HoMan'
    ],
    
    models: [
		//'Hirarki',
    ],
    
    refs: [{
		ref: 'tAvGroup',
		selector: 'tAvGroup'
	},{
		ref: 'content',
		selector: 'content'
	},{
		ref: 'taskBlnAv',
		selector: 'taskBlnAv'
	}],
    
    init: function() {
		var me = this;
        me.control({
			'tAvGroup': {
				AvGroupCl: me.AvGroupClick
			},
			'content': {
				updateAvRe: me.updateAvRe,
				updateHome: me.updateHome
			},
			'#btnCariAVx': {
				click: me.filterAvRe
			}
		});
    },
	
	onLaunch: function() {
		//console.log("AvRe");
		this.updateAvRe();
		//this.ubahLabelWO();
	},
	
	updateAvRe: function() {
		var me = this;
		me.getAvGroupStore().load({
			scope: me,
			callback: function(rec, operation, success) {
				if (success) {
					me.AvGroupClick(0,0);
				}
			}
		});
		me.getAvHomeStore().load();
		me.getReHomeStore().load();
	},
	
	updateHome: function()		{
		var me=this;
		me.getSpAvGcUtStore().load();
		me.getSpAvGsUtStore().load();
		me.getSpAvPmUtStore().load();
		me.getSpReGcUtStore().load();
		me.getSpReGsUtStore().load();
		me.getSpRePmUtStore().load();
		
		me.getHoOrderCStore().load();
		me.getHoManStore().load();
		me.getAvReUnitStore().load();
		//alert("Home Update");
	},
	
	filterAvRe: function()	{
		var me = this,
			tFG = me.getTaskBlnAv(),
            form = tFG.down('form').getForm();
		var t = new Date(form.findField('iblnAvReU').getValue());
		//var	dd = me.getDate(); 
		//alert(t.getMonth()+"-"+t.getFullYear());
		alert(t.toJSON());
		//me.getAvReUnitStore().load({param:{wkt: t.toJSON()} });
		me.AvHomeStore().load({ param:{wkt: t.toJSON()} });
		me.ReHomeStore().load({ param:{wkt: t.toJSON()} });
	},
	
	AvGroupClick: function(d,app,bln) 	{
		var me=this,plh,wkt;
		
		wkt=(bln)?bln:me.getTAvGroup().waktu;		
		plh=(app==1)?me.getAvGroupStore().getAt(d.point.x).data:me.getAvGroupStore().getAt(0).data;

		//Ext.getCmp('iflAvRe').setText(plh.nama+", id:"+plh.id+", w: "+wkt);
		Ext.getCmp('iflAvRe').setText(plh.nama+", "+wkt);
		
		// matikan dulu
		//me.getTAvSpeedo().chartConfig.min = rcm.view.Util.Ubb(plh.av);
		
		
		
		me.getAvSpeedoStore().getAt(0).set('av',plh.av);
		me.getReSpeedoStore().getAt(0).set('av',plh.re);
		//me.getTAvSpeedo().setTitle(plh.kode);
		//me.getTAvSpeedo().setSubTitle("Availability "+wkt);
		me.getAvReUnitStore().load({ params:{tgl:wkt, eq:plh.id} });
		
		Ext.getCmp('spAvR').kode = Ext.getCmp('spReR').kode = plh.id+'@'+wkt;
		//alert(me.getTAvSpeedo().kode);
		
		Ext.getCmp('spAvR').setTitle(plh.kode);
		Ext.getCmp('spAvR').setSubTitle("Availability "+wkt);
		
		Ext.getCmp('spReR').setTitle(plh.kode);
		Ext.getCmp('spReR').setSubTitle("Reliability "+wkt);
		
		Ext.getCmp('Av2Thn').setTitle("Availability "+plh.kode+" Annually");
		Ext.getCmp('Re2Thn').setTitle("Reliability "+plh.kode+" Annually");

	},
	
	cariAvRe: function()	{
		var me=this, 
			tgl=Ext.getCmp("iblnAvReU").getValue(),
			th = rcm.view.Util.U1th(tgl),
			thn="YTD/Avg "+th,			
			thnm1=rcm.view.Util.Uthm1(tgl),
			bln=rcm.view.Util.Ublnini(tgl),
			av=me.getTAvHome().series,
			re=me.getTReHome().series,
			ar=me.getTAv2Thn().series,
			av2=Ext.getCmp('Av2Thn').series,
			re2=Ext.getCmp('Re2Thn').series;
		
		me.AvGroupClick(0,0, bln);		
		me.getAvHomeStore().load({ params:{ tgl:tgl } });
		me.getReHomeStore().load({ params:{ tgl:tgl } });
		me.getAvGroupStore().load({ params:{ wkt:tgl } });
		
		me.getTAvGroup().setSubTitle("Gas Comp "+bln);

		// Mending masukkan ke View //
		av[0].config.name = thnm1;
		av[1].config.name = thn;
		av[2].config.name = bln;
		me.getTAvHome().draw();
		
		re[0].config.name = thnm1;
		re[1].config.name = thn;
		re[2].config.name = bln;
		me.getTReHome().draw();

		av2[0].config.name = "Av"+thnm1;
		av2[1].config.name = "Av"+thnm1;
		av2[2].config.name = "Av"+th;
		av2[3].config.name = "Av"+th;
		Ext.getCmp('Av2Thn').draw();
		
		re2[0].config.name = "Re"+thnm1;
		re2[1].config.name = "Re"+thnm1;
		re2[2].config.name = "Re"+th;
		re2[3].config.name = "Re"+th;
		Ext.getCmp('Re2Thn').draw();
		//*/
	}
});
