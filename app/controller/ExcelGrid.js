
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
		,'dataentry.FMEAGrid'
		
    ],

    stores: [
		'Hirarki'
		,'RunningHour'
		,'EventList'
		
		,'Equip'
		,'OPart'
		,'FMode'
		,'PM'
		
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
			'#samadown-fmea-btn': {
				click: me.samadownFMEAClick
			},
			'#samarun-fmea-btn': {
				click: me.samarunFMEAClick
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
            tFG = me.getTaskFormGagal(),
			form =  tFG.down('form').getForm(),
			sDG = Ext.create('rcm.model.DaftarGagal'),
			dRHs = me.getRunningHourStore().getAt(e.rowIdx).data,
			dRHsJ = dRHs.eq+" @"+dRHs.Lokasi;
		
		sDG.set('eq',rcmSettings.eqx); sDG.set('nama',dRHsJ); 
		sDG.set('downt',rcmSettings.tgl); //sDG.set('server','rcmSettings.server');
		tFG.down('form').getForm().reset();
		
		//alert("tgl: "+rcmSettings.tgl);
		//form.findField('eq').setValue(dRHsJ);
		//form.findField('fgid').setValue(dRHs.id); 
		//form.findField('datedownxx').setValue('10-07-2014');
		//rcmSettings.bbbb = form.findField('datedown');
		//form.findField('datedown').setValue(rcmSettings.tgl);
		
		Ext.getCmp('datedown').setValue(rcmSettings.tgl);
		//Ext.getCmp('dateup').setValue(rcmSettings.tgl);
		Ext.getCmp('fmEq').setValue(dRHsJ);
		Ext.getCmp('fgid').setValue(dRHs.id);
		Ext.getCmp('idtfevent').setValue(1);
		//Ext.getCmp('datedown').setValue(Ext.util.Cookies.get('tgl'));
		
		tFG.down('form').loadRecord(sDG);
		tFG.setTitle('Form Notifikasi ' + dRHsJ);
		
		me.getTaskIsiFormGagal().pilihEventG(1);
		
		//tFG.setWidth(500);
		tFG.show();
		
		me.getEquipStore().load({ params:{unit:dRHs.id} });
		me.getOPartStore().load({ params:{unit:dRHs.id} });
		me.getFModeStore().load({ params:{unit:dRHs.id} });
		me.getPMStore().load({ params:{unit:dRHs.id} });
		
		//alert("Form Gagal: "+ " tgl: "+rcmSettings.tgl);
	},
    
    updateGrid: function(view, e) {
        var me		=this, tv=e.value; 
			drow	=this.getRunningHourStore().getAt(e.rowIdx);

		if ((tv=='')||(tv==e.originalValue))	{		//||
			//alert("updateGrid numpang lewat");
		} else if (tv==e.originalValue)	{
			//console.log("update nilai, sudah beda");
		} else if ((tv==24)||(tv=="24:00"))	{
			//this.simpanRH(e);
		} else {
			this.buildFormGagal(e);
		}
	},
    
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
	
	getDate: function (w) {
		var t = new Date(w);
		return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate();
	},

	getTime: function (w) {
		var t = new Date(w);
		return t.getHours()+':'+t.getMinutes();
	},
	
	samadownFMEAClick: function()	{
		var me = this,
			tFG = me.getTaskFormGagal(),
            form = tFG.down('form').getForm();
		var	dd = me.getDate(form.findField('datedown').getValue()), 
			td = me.getTime(form.findField('timedown').getValue());
		//alert(rcm.view.Util.Udate(dd));
		form.findField('datemulai').setValue(rcm.view.Util.Udate(dd));
		form.findField('timemulai').setValue(rcm.view.Util.Utime(td));
	},
	
	samarunFMEAClick: function() {
		var me=this,
			tFG = me.getTaskFormGagal(),
            form = tFG.down('form').getForm();
		var	dd = me.getDate(form.findField('dateup').getValue()), 
			td = me.getTime(form.findField('timeup').getValue());
		//alert(rcm.view.Util.Udate(dd));
		form.findField('dateselesai').setValue(rcm.view.Util.Udate(dd));
		form.findField('timeselesai').setValue(rcm.view.Util.Utime(td));
	},

    
    onLaunch: function() {
		Ext.getCmp('idwest').collapse();
		//var t = new Date();
		this.ubahFieldRH();
		//Ext.util.Cookies.set('tgl',t);
		Ext.util.Cookies.set('now',Ext.Date.format(new Date(),"Y-m-d"));
		//rcm.view.Util.setCookie("tgl",t);
		//alert("t: "+t+"  cook: "+Ext.decode(rcm.view.Util.getCookie("tgl")));
        //alert("tgl: "+Ext.util.Cookies.get('tgl'));
        //Ext.getCmp('idwest').collapse();
        
        
        
        Ext.apply(Ext.form.field.VTypes, {
			daterange: function(val, field) {
				var date = field.parseDate(val);

				if (!date) {
					return false;
				}
				if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
					var start = Ext.getCmp('datedown').getValue();
					var enddate = Ext.getCmp('dateup').getValue();
					
					//console.log("startd: "+Date.parse(start)+", enddate: "+Date.parse(enddate));
					
					var endtime = field.up('form').down('#' + field.endTimeField);
					if (Date.parse(start)==Date.parse(enddate))	{
						if (Ext.getCmp('timedown').getValue())	{
							var sttime = field.up('form').down('#' + field.startTimeField);
							endtime.setMinValue(sttime.getSubmitValue());
							//console.log("tgl up SAMA: "+sttime.getSubmitValue());
						}
					}
					else {
						endtime.setMinValue("00:00");
					}
					
					//start.setMaxValue(date);
					//start.validate();
					this.dateRangeMax = date;
				}
				else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
					//console.log("tanggal down");
		
					
					var end = field.up('form').down('#' + field.endDateField);
					
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				return true;
			},
			daterangeText: 'Start date must be less than end date',
			timerange: function(val, field)	{
				var time = field.parseDate(val);
				if(!time){
					return;
				}
				
				
				if (field.startTimeField && (!this.timeRangeMax || (time.getTime() != this.timeRangeMax.getTime()))) {
					//console.log("pilih jam up");
					//var startt = Ext.getCmp('timedown').getValue();
					var start = field.up('form').down('#' + field.startTimeField);
					start.maxValue = time.getHours()+":"+time.getMinutes();
					
					//console.log("st max: "+start.maxValue);
					start.validate();
					this.timeRangeMax = time;
				}
				else if (field.endTimeField && (!this.timeRangeMin || (time.getTime() != this.timeRangeMin.getTime()))) {
					if (Ext.getCmp('dateup').getValue())	{
						//console.log("pilih jam down");
						
						var startd = Ext.getCmp('datedown').getValue();
						var endd = Ext.getCmp('dateup').getValue();
						var endtime = field.up('form').down('#' + field.endTimeField);
						if (Date.parse(startd)==Date.parse(endd))	{
							endtime.setMinValue(Ext.getCmp('timedown').getSubmitValue());
							//endtime.validate();
						}
						else {
							endtime.setMinValue("00:00");
						}					
					}
					
					
					//endtime.validate();
					//this.timeRangeMin = time;
				}
				return true;
			},
			timerangeText: 'Start Time must be less than end time',
		});
        
        
	}

});
