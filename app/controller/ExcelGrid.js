
Ext.define('rcm.controller.ExcelGrid', {
    extend: 'Ext.app.Controller',

    views: [
		'Ext.form.field.Text'
		
		,'rcm.view.Util'
		,'rcm.view.MonthYear'
		,'dataentry.ExcelGrid'
		,'dataentry.DetailInfo'
		,'dataentry.FormGagal'
		,'dataentry.IsiTabForm'
    ],

    stores: [
		'Hirarki'
		,'RunningHour'
		,'EventList'
    ],
    
    models: [
		'RunningHour'
    ],
    
    refs: [{
		ref: 'excelgrid',
		selector: 'excelgrid'
	},{
		ref: 'taskFormGagal',
		selector: 'taskFormGagal',
		xtype: 'taskFormGagal',
		autoCreate: true
	},{
		ref: 'taskIsiFormGagal',
		selector: 'taskIsiFormGagal',
		xtype: 'taskIsiFormGagal',
		autoCreate: true
	},{
		ref: 'taskTanggalan',
		selector: 'taskTanggalan'
	}],

    init: function() {
		var me = this;
        me.control({
			'excelgrid': {
				recordedit: me.updateGrid,
				EqClick: me.equipClick
				//specialkey: me.handleSpecialKey,
			},
			'taskTanggalan': {
				klikKalender: me.KalenderClick
			},
			'#cancel-eg': {
				click: me.hideFormGagal
			},
			'taskIsiFormGagal': {
				plhEventGagalXY: me.pilihEventGagalXY
			}
		});
    },
    
    equipClick: function(catx)	{
		var t;
		if (rcmSettings.tgl==0)	{
			t=new Date();
			//console.log("masuk sini: "+ t);
		}
		else t = new Date(rcmSettings.tgl);
		//alert(t);
		//else t = rcmSettings.tgl;
		var pt = (t.getFullYear())+"-"+rcm.view.Util.Upad(t.getMonth()+1)+"-"+rcm.view.Util.Upad(t.getDate());
		Ext.suspendLayouts();
		this.getExcelgrid().reconfigure(this.getRunningHourStore().load({ params:{tgl:t, cat:catx} }), rcm.view.Util.UxcolGrid());
		Ext.resumeLayouts(true);
	},
	
	pilihEventGagalXY: function(n)	{
		this.getTaskFormGagal().ubahLebar(n);
	},
	
	hideFormGagal: function()	{
		this.getTaskFormGagal().close();
		this.getRunningHourStore().reload();
	},
	
	buildFormGagal: function(e)	{
		var me = this,
            taskFormGagal = me.getTaskFormGagal();
            
		taskFormGagal.setWidth(500);
		taskFormGagal.show();
		
		//alert("Form Gagal: "+ " tgl: "+rcmSettings.tgl);
	},
    
    updateGrid: function(view, e) {
        var me=this, tv=e.value; drow=this.getRunningHourStore().getAt(e.rowIdx);
        //var at=e.row;
        //rcmSettings.asa = this.getRunningHourStore().getAt(e.rowIdx).data;
		//*
		if ((tv=='')||(tv==e.originalValue))	{		//||
			//alert("updateGrid numpang lewat");
		} else if (tv==e.originalValue)	{
			//console.log("update nilai, sudah beda");
		} else if ((tv==24)||(tv=="24:00"))	{
			//this.simpanRH(e);
		} else {
			this.buildFormGagal(e);
			
		}
		//*/
	},
    //*/
    ubahFieldRH: function(x)	{
		this.getRunningHourModel().setFields(rcm.view.Util.Ublntgl(x));
	},
	
	KalenderClick: function(pt)	{
		rcmSettings.tgl = pt;
		//alert("KalenderClick tgl: "+pt);
		var tab=rcmSettings.tab.split("_");
		//console.log("tab: "+tab[0]+", no: "+tab[1]);
		if ((tab[0].localeCompare("tu")==0) && (tab[1].localeCompare("rh")==0))	{
			//pt = (t.getFullYear())+"-"+rcm.view.Util.Upad(t.getMonth()+1)+"-"+rcm.view.Util.Upad(t.getDate());
			this.ubahFieldRH(pt);
			//*
			Ext.suspendLayouts();			
			this.getExcelgrid().reconfigure(this.getRunningHourStore().load({ params:{tgl:pt, cat:rcmSettings.cat} }), rcm.view.Util.UxcolGrid());
			Ext.resumeLayouts(true);
		}
	},
    
    onLaunch: function() {
		var t = new Date();
		this.ubahFieldRH();
		Ext.util.Cookies.set('tgl',t);
		//rcm.view.Util.setCookie("tgl",t);
		//alert("t: "+t+"  cook: "+Ext.decode(rcm.view.Util.getCookie("tgl")));
        //alert("tgl: "+Ext.util.Cookies.get('tgl'));
	}

});
