Ext.define('rcm.controller.AvRe', {
    extend: 'Ext.app.Controller',
	
	requires: [
		'Chart.ux.Highcharts',
		'Chart.ux.Highcharts.BarSerie',
		'Chart.ux.Highcharts.Serie',
		'Chart.ux.Highcharts.SplineSerie',
		'Chart.ux.Highcharts.GaugeSerie',
		'Chart.ux.Highcharts.ColumnSerie',
		'Chart.ux.Highcharts.PieSerie'
    ],
    
    views: [
		'lapobama.AvGroup'
		,'lapobama.SpeedoAv'
		,'lapobama.BlnAv'

		,'lapobama.AvHome'
		,'lapobama.ReHome'
		,'lapobama.Av2Thn'
		,'lapobama.AvReChart'
		
		,'utama.HoChart'
		,'login.LoginAuth'
    ],

    stores: [
		'AvReUnit','AvHome','ReHome','AvGroup','AvSpeedo','ReSpeedo'
		,'SapHistoriUt'
		
		,'SpAvGcUt','SpAvGsUt','SpAvPmUt','SpReGcUt','SpReGsUt','SpRePmUt'
		,'HoOrderC','HoMan','HoTeco'
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
	},{
		ref: 'authlogin',
		selector: 'authlogin'
	},{
		ref : 'tAvSpeedo',
		selector : 'tAvSpeedo'
	},{
		ref : 'tReHome',
		selector : 'tReHome'	
	},{
		ref : 'tAvHome',
		selector : 'tAvHome'
	},{
		ref : 'tAv2Thn',
		selector : 'tAv2Thn'
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
				click: me.filterAvRe	//me. cariAvRe
			},
			'tAvHome' : {
				AvHomeCl: me.AvHomeClick
			},
			'tReHome' : {
				ReHomeCl: me.AvHomeClick
			},
			'#srUtama': {
				click: me.hdlThnUtama
			},
		});
    },
    
    hdlThnUtama : function(){
		var me = this;
		var t=Ext.getCmp('iThnUtama').getValue();
		
		//alert('Filter Tahun Dahsboard '+t);
		
		me.getSpAvGcUtStore().load({params: {th:t} });
		me.getSpAvGsUtStore().load({params: {th:t} });
		me.getSpAvPmUtStore().load({params: {th:t} });
		me.getSpReGcUtStore().load({params: {th:t} });
		me.getSpReGsUtStore().load({params: {th:t} });
		me.getSpRePmUtStore().load({params: {th:t} });
		
		me.getHoOrderCStore().load({params: {thn:t} });
		me.getHoManStore().load({params: {thn:t} });
		me.getHoTecoStore().load({params: {thn:t} });
		//var taon = new Date();
		//console.log(taon);
		
		me.getSapHistoriUtStore().load({params: {tgl:t} });
		//me.getAvReUnitStore().load();
		//Ext.getCmp('tSapHx').draw();
		
		
		
	},
	
	getDelayedStore: function()	{
		//console.log("AvRe getDelayedStore");
		var me=this;
		me.getAvHomeStore().load();
		me.getReHomeStore().load();
		//me.getAvSpeedoStore().load();
		//me.getReSpeedoStore().load();
		me.getAvGroupStore().load();		// list equip masing2 pergroup
		me.getAvReUnitStore().load();
		
		
		//me.filterAvRe();	// ----------->

	},
	
	onLaunch: function() {
		//console.log("AvRe onLaunch");
		
		var me = this,
			task = new Ext.util.DelayedTask(function(){
			me.getDelayedStore();
		});
		//task.delay(rcmSettings.dlySap*1000);
		task.delay(rcmSettings.dlyAR*1000);
		
		//me.getTAvGroup().cat = 5;
		
		//this.updAvRe();


		//this.updateAvRe();
		
	},
	
	updateAvRe: function(t,n,id) {
		var me = this;
		//if (me.getAuthlogin().level>0)	return;
		me.updAvRe(t,n,id);
		/*
		me.getAvGroupStore().load({
			params: {wkt: t, gr:id},
			scope: me,
			callback: function(rec, operation, success) {
				if (success) {
					me.AvGroupClick(0,0,t,n);
				}
			}
		});
		//*/
		//me.getAvHomeStore().load();
		//me.getReHomeStore().load();
	},
	
	updAvRe: function(t,n,id) {
		//alert("LOAD List Group: "+t+" "+n+" "+id);
		var me = this;
		me.getAvGroupStore().load({
			params: {wkt: t, gr:id},
			scope: me,
			callback: function(rec, operation, success) {
				if (success) {
					me.AvGroupClick(0,0,t,n);
				}
			}
		});
	},
	
	updateHome: function()		{
		var me=this;
		if (me.getAuthlogin().level>0)	return;
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
	
	gantiLabel: function(me,av,re,av2,re2,th,thn,bln,thnm1)	{
		av[0].config.name = thnm1;		// ------->
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
		
		Ext.getCmp('spAvR').setSubTitle("Availability "+bln);
		Ext.getCmp('spReR').setSubTitle("Reliability "+bln);
		me.getTAvGroup().setSubTitle("Gas Comp "+bln);
	},
	
	filterAvRe: function()	{
		var me = this,
			tFG = me.getTaskBlnAv(),
			av=me.getTAvHome().series,
			re=me.getTReHome().series,
			av2=Ext.getCmp('Av2Thn').series,
			re2=Ext.getCmp('Re2Thn').series,
			form = tFG.down('form').getForm();
			
		var t = new Date(form.findField('iblnAvReU').getValue()),
			d = t.toJSON(),
			th = rcm.view.Util.U1th(t),
			thn="YTD/Avg "+th,			
			thnm1=th-1;		//rcm.view.Util.Uthm1(t),
			bln=rcm.view.Util.Ublnini(t);

		me.getTAvGroup().waktu = bln;
		//console.log (bln);
		//var c = (me.getTAvGroup().cat)?me.getTAvGroup().cat:5;
		//alert(me.getTAvGroup().cat);
		me.updateAvRe(bln,me.getTAvGroup().nama,me.getTAvGroup().cat);
		//*
		me.getAvHomeStore().load({ params:{wkt:d} });
		me.getReHomeStore().load({ params:{wkt:d} });
		//me.getAvReUnitStore().load({ params:{wkt:d,gr:me.getTAvGroup().cat} });
		//*/
		
		me.gantiLabel(me, av,re,av2,re2,th,thn,bln,thnm1);	// ---------->
		
		
		
		
		
		
		/*
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
		
		Ext.getCmp('spAvR').setSubTitle("Availability "+bln);
		Ext.getCmp('spReR').setSubTitle("Reliability "+bln);
		me.getTAvGroup().setSubTitle("Gas Comp "+bln);
		//*/
	},
	
	AvHomeClick: function(d, nama, id)	{
		var me=this;
		//alert("AvRe AvHomeClick "+id+", tgl: "+d.series.name);
		//this.getAvGroupStore().load({ params:{gr:id, tgl: d.series.name} })
		me.getTAvGroup().waktu = d.series.name;
		me.getTAvGroup().nama = nama;
		me.getTAvGroup().cat = id;
		//alert(nama + " "+ d.series.name+" " +id);
		me.updateAvRe(d.series.name,nama,id);
	},
	
	AvGroupClick: function(d,app,bln,kat) 	{
		var me=this,plh,wkt,nnm;
		//alert("bln: "+bln+", waktu: "+me.getTAvGroup().waktu);
		wkt=(bln)?bln:me.getTAvGroup().waktu;
		//wkt=bln;
		plh=(app==1)?me.getAvGroupStore().getAt(d.point.x).data:me.getAvGroupStore().getAt(0).data;

		//alert("wkt: "+wkt+",plh: "+plh);
		//console.log("AvGroupClick "+plh.nama+","+wkt);
		//console.log(plh);
		//Ext.getCmp('iflAvRe').setText(plh.nama+", id:"+plh.id+", w: "+wkt);
		Ext.getCmp('iflAvRe').setText(plh.nama+", "+wkt);
		
		// matikan dulu
		//me.getTAvSpeedo().chartConfig.min = rcm.view.Util.Ubb(plh.av);
		nnm = (kat)?kat:me.getTAvGroup().nama;
		me.getTAvGroup().setSubTitle(nnm+" "+wkt);
		me.getAvSpeedoStore().getAt(0).set('av',plh.av);
		me.getReSpeedoStore().getAt(0).set('av',plh.re);
		
//		me.getAvReUnitStore().load({ params:{wkt:wkt, gr:me.getTAvGroup().cat} });
		me.getAvReUnitStore().load({ params:{wkt:wkt, eq:plh.id} });

		Ext.getCmp('spAvR').kode = Ext.getCmp('spReR').kode = plh.id+'@'+wkt;
		//alert(me.getTAvSpeedo().kode);
		
		Ext.getCmp('spAvR').setTitle(plh.kode);
		Ext.getCmp('spAvR').setSubTitle("Availability "+wkt);
		
		Ext.getCmp('spReR').setTitle(plh.kode);
		Ext.getCmp('spReR').setSubTitle("Reliability "+wkt);
		
		Ext.getCmp('Av2Thn').setTitle("Availability "+plh.kode+" Annually");
		Ext.getCmp('Re2Thn').setTitle("Reliability "+plh.kode+" Annually");
		
		var tx = rcm.view.Util.UcariThn(wkt.toString());
		//*
		var av2=Ext.getCmp('Av2Thn').series,
			re2=Ext.getCmp('Re2Thn').series;
		//av2[0].config.name = "Av"+(tx-1);
		
		// -------------------->
		av2[1].config.name = "Av"+(tx-1);
		av2[2].config.name = "Av"+tx;
		av2[3].config.name = "Av"+tx;
		Ext.getCmp('Av2Thn').draw();
		
		re2[0].config.name = "Re"+(tx-1);
		re2[1].config.name = "Re"+(tx-1);
		re2[2].config.name = "Re"+tx;
		re2[3].config.name = "Re"+tx;
		Ext.getCmp('Re2Thn').draw();
		//*/

	}
	/*
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
		
	}
	//*/
});
