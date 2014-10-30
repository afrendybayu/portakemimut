
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
		,'dataentry.PropGrid'
		,'dataentry.InfoFMEA'
		,'dataentry.DaftarGagal'
		//,'dataentry.HitungRelia'
		,'Ext.ux.grid.FiltersFeature'
		,'Ext.draw.Text'
		//,'Content'
		,'dataentry.Tab'
    ],

    stores: [
		'Hirarki'
		,'RunningHour'
		,'DaftarGagal'
		,'EventList'
		,'Event'
		,'EventInfo'
		,'LoginSesi'
		,'Equip'
		,'OPart'
		,'FMode'
		,'PM'
		,'Aksi'
		,'Cause'
		,'DaftarRelia'
    ],
    
    models: [
		'RunningHour'
		,'Event'
		,'LoginSesi'
    ],
    
    refs: [{
		ref: 'excelgrid',
		selector: 'excelgrid'
	},{
		ref: 'tabRh',
		selector: 'tabRh'
	},{
		ref: 'taskFMEAGrid',
		selector: 'taskFMEAGrid'
	},{
		ref: 'taskDaftarGagal',
		selector: 'taskDaftarGagal'
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
			'#tambah-fmea-btn': {
				click: me.tmbhFMEAClick
			},
			'#samadown-fmea-btn': {
				click: me.samadownFMEAClick
			},
			'#samarun-fmea-btn': {
				click: me.samarunFMEAClick
			},
			//*
			'#save-rh': {
				click: me.simpanGagalClick
			},
			'#update-rh': {
				click: me.updateGagalClick
			},
			'#btnHtgReliax': {
				click: me.htgRe
			},
			'#btnClrReliax': {
				click: me.clrRe
			},
			//*/
			'taskIsiFormGagal': {
				plhEventGagalXY: me.pilihEventGagalXY
			},
			'taskFMEAGrid': {
				plhFilterFMEA: me.plhFilterClick,
				plhEquipGagal: me.plhEquipClick,
				plhCauseGagal: me.plhCauseClick,
				plhAksiGagal: me.plhAksiClick,
				plhModeGagal: me.plhModeClick,
				plhOPartGagal: me.plhOPartClick,
				hpsFMEAGagal: me.hapusFMEAClick
				//,infoDetailGagal: me.infoDG
			},
			'taskDaftarGagal': {
				editDGClick: me.edDGClick
				,hapusDGClick: me.hpsDGClick
			}
			
			//*/
			
		});
    },
    
	tmbhFMEAClick: function()	{
		var rec = new rcm.model.Event({
            eql:'',ideql:'',opart:'',idopart:'',mode:'',idmode:'',cause:'',idcause:'',aksi:'',idaksi:''
        });
        this.getEventStore().insert(0, rec);
        this.getTaskFMEAGrid().getView().refresh();
        //rcmSettings.ggg = this.getTaskFMEAGrid().getView();
		//alert('tambah FNMEA');
	},
    
    htgRe: function()	{
		var co = this.getTabRh(),
			dg = this.getTaskDaftarGagal();

		if (dg.end.id==null)	{
			Ext.Msg.alert('Error', 'Pilih baris event end');
			return;
		}
		if (dg.start.id==null)	{
			Ext.Msg.alert('Error', 'Pilih baris event start');
			return;
		}
		//console.log();
		//return;
		Ext.getCmp('lblRelia').setText('Reliability '+dg.jdl.n+' @'+dg.jdl.l);
		
		this.getDaftarReliaStore().load({
			params:{unit:dg.end.u,aw:dg.start.id,ak:dg.end.id },
			scope: this,
			callback: function()	{
				//alert('jos');
				co.showRelia();
			}
		});

	},
	
	clrRe: function()	{
		var dg = this.getTaskDaftarGagal(),
			rs = Ext.select('*[name=rstart]').elements,
			re = Ext.select('*[name=rend]').elements;

		for (var i=0; i<re.length; i++)	{
			rs[i].checked = false;
			re[i].checked = false;
		}
		dg.start='-';
		dg.end='-';
	},
    
    plhFilterClick: function(n)		{
		var me=this;
		//rcmSettings.aaaa = me.getEventStore();
		//alert(n.col+" pilihFMEAGagal "+me.getEventStore()+"<--");
		if (n.col==2)	{		// col 2 = OPart
			//console.log("masuk Opart");
			me.getOPartStore().clearFilter(true);
			me.getOPartStore().filter('cat',n.cat);
		}
		else if (n.col==3)	{	// col 3 = FMode
			//console.log("masuk FMode");
			me.getFModeStore().clearFilter(true);
			me.getFModeStore().filter('cat',n.cat);
		}
	},
	
	plhEquipClick: function(drow)	{
		var me=this, rec=me.getEventStore().getRange()[drow.row];
		
		//console.log("ideq: "+drow.ideq+", cat: "+drow.cat+", row: "+drow.row);
		rec.set('ideql',drow.ideq);
		rec.set('cat',drow.cat);
	},
	
	plhCauseClick: function(dd,drow)	{
		var rec = this.getEventStore().getRange()[drow.row];
		rec.set('idcause',drow.cause);
	},
	
	plhAksiClick: function(dd, drow)	{
		var rec = this.getEventStore().getRange()[drow.row];
		rec.set('idaksi',drow.aksi);
	},
	
	plhModeClick: function(dd, drow)	{
		var rec = this.getEventStore().getRange()[drow.row];
		rec.set('idmode',drow.mode);
	},
	
	plhOPartClick: function(dd, drow)	{
		var rec = this.getEventStore().getRange()[drow.row];
		rec.set('idopart',drow.opart);
	},
	
	hapusFMEAClick: function(dd, drow, grid)	{
		var de=this;
		var ee=dd.get('eql')+"<br/>Object Part "+dd.get('opart');
		Ext.Msg.show({
            title: 'Hapus FMEA '+dd.get('eql'),
            msg: 'Hapus FMEA '+ee,
            buttons: Ext.Msg.YESNO,
            fn: function(response) {
                if(response === 'yes') {
					//dd.destroy();
					//this.getEventStore.destroy();
					dd.destroy({
						callback: function(dd, operation) {
							//console.log('sukses hapusFMEAClick');
							this.getTaskFMEAGrid().getView().refresh();
						}
					});
                }
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
	
	edDGClick: function(rec)	{
	
		//alert("Controller editDG ganti ke ExcelGrid");
		var me = this, ev = rec.get('idevent'), un = rec.get('unit_id'),
            tFG = me.getTaskFormGagal();
		
		tFG.down('form').getForm().reset();
		
		me.getTaskIsiFormGagal().pilihEventG(rec.get('idevent'));
		me.getTaskIsiFormGagal().setNilai(rec);

		if (ev==2)	{
			me.getPMStore().load({ 
				params:{unit:un},
				scope: this,
				callback: function(dt, operation, success) {
					//alert("success: "+rec.get('tipeev'));
					if (success) {
						Ext.getCmp('tipepm').setValue(rec.get('tipeev').split(","));
					}
				}
			});
			
		}
		
		if (ev>2)	{
			me.getEquipStore().load({ params:{unit:un} });
			me.getOPartStore().load({ params:{unit:un} });
			me.getFModeStore().load({ params:{unit:un} });
			me.getEventStore().load({ params:{down:rec.get('id')} });
		}
		//Ext.getCmp('idtfket').setValue('cobacoab');

		tFG.setTitle('Edit Form Notifikasi');
		tFG.show();
	},
	
	hpsDGClick: function(task,row,grid)	{
		//alert("Controller hpsDG ganti ke ExcelGrid");
		var de = this,
			ee = task.get('event')+" "+task.get('nama'),
			gagal = new rcm.model.DaftarGagal(task.data);
		//console.log(task.data);
		//return;
		Ext.Msg.show({
            title: ee,
            msg: 'Hapus Kejadian '+ee,
            buttons: Ext.Msg.YESNO,
            fn: function(response) {
                if(response === 'yes') {
					//task.destroy();
					//*
					gagal.destroy({
						success: function() {
							//alert("masuk");
							de.getRunningHourStore().reload();
							de.getDaftarGagalStore().reload();
						}
					});
                }
            }
        });

	},
	
	pilihEventGagalXY: function(n)	{
		this.getTaskFormGagal().ubahLebar(n);
	},
	
	hideFormGagal: function()	{
		this.getTaskFormGagal().close();
		this.getRunningHourStore().reload();
	},
	
	buildFormGagal: function(e)	{
		var me = this;
		var DSesi = me.getLoginSesiStore();
		DSesi.load({
			scope: this,
			callback: function(records, operation, success) {
				var res = operation.request.scope.reader.jsonData["sesi"];
				if (res.akses == 0){
					//console.log('masuk sebagai admin');
					//rcmSettings.eeee = me;
					me.getExcelgrid().ngedit = 1;
					//
				}
				else{
					//console.log('tidak jelas');
					me.getExcelgrid().ngedit = 0;
					//tFG.hide();
					return;
				}
				// the operation object
				// contains all of the details of the load operation
				//console.log(res.nama);
			}
		});
		
		var	go = 0,
            tFG = me.getTaskFormGagal(),
			form =  tFG.down('form').getForm(),
			sDG = Ext.create('rcm.model.DaftarGagal'),
			dRHs = me.getRunningHourStore().getAt(e.rowIdx).data,
			dRHsJ = dRHs.eq+" @"+dRHs.Lokasi;
			//DSesi = Ext.create('rcm.model.LoginSesi');
		
		
		
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
		
		me.getEventStore().loadData([],false);
		me.getTaskIsiFormGagal().pilihEventG(1);

		//tFG.setWidth(500);
		// tFG.show();
		tFG.show();
		// tFG.hide()
		/*
		var DSesi = me.getLoginSesiStore();
		DSesi.load({
			scope: this,
			callback: function(records, operation, success) {
				var res = operation.request.scope.reader.jsonData["sesi"];
				if (res.akses == 0){
					//console.log('masuk sebagai admin');
					//rcmSettings.eeee = me;
					me.getExcelgrid().ngedit = 1;
					tFG.show();
				}
				else{
					//console.log('tidak jelas');
					me.getExcelgrid().ngedit = 0;
					//tFG.hide();
					return;
				}
				// the operation object
				// contains all of the details of the load operation
				//console.log(res.nama);
			}
		});
		//*/
		
		
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
		//console.log("KalenderClick tgl: "+pt);
		var tab=rcmSettings.tab.split("_");
		//console.log("tab: "+tab[0]+", no: "+tab[1]);
		//if ((tab[0].localeCompare("tu")==0) && (tab[1].localeCompare("rh")==0))	{
		if ((tab[0]=="tu") && (tab[1]=="rh"))	{
			//pt = (t.getFullYear())+"-"+rcm.view.Util.Upad(t.getMonth()+1)+"-"+rcm.view.Util.Upad(t.getDate());
			//console.log("1cat: "+rcmSettings.cat);
			this.ubahFieldRH(pt);
			//console.log("2cat: "+rcmSettings.cat);
			//*
			Ext.suspendLayouts();
			//console.log("3cat: "+rcmSettings.cat);
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
		//console.log("onLauch ExcelGrid");
		//this.getExcelgrid().ngedit = 1;
		//alert(this.getExcelgrid().ngedit);
		Ext.getCmp('idwest').collapse();
		
		//rcmSettings.qqqq = this.getExcelgrid();

		Ext.getCmp('htmleddet').setReadOnly(true);
		this.ubahFieldRH();
		//Ext.util.Cookies.set('tgl',t);
		Ext.util.Cookies.set('now',Ext.Date.format(new Date(),"Y-m-d"));
		
		
		
		//alert("t: "+t+"  cook: "+Ext.decode(rcm.view.Util.getCookie("tgl")));

		//this.getAvGroupStore().load();
        /*
        this.getAvGroupStore().load({
			scope: this,
			callback: function(rec, operation, success) {
				if (success) {
					me.AvGroupClick(0,0);
				}
			}
		});
        //*/
        
        /*
        Ext.define('Ext.view.override.Table', {
			override: 'Ext.view.Table',
		 
			doStripeRows: function(startRow, endRow) {
				var me = this,
					rows,
					rowsLn,
					i,
					row;
		 
		 
				if (me.rendered && me.stripeRows) {
					rows = me.getNodes(startRow, endRow);
		 
					for (i = 0, rowsLn = rows.length; i < rowsLn; i++) {
						row = rows[i];
		 
						if (row) { // self updating; check for row existence
							row.className = row.className.replace(me.rowClsRe, ' ');
							startRow++;
		 
							if (startRow % 2 === 0) {
								row.className += (' ' + me.altRowCls);
							}
						}
					}
				}
			}
		 
		});
		//*/
        
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
			timerangeText: 'Start Time must be less than end time'
		});
        
        
	},
	
	simpanGagalClick: function()	{
		this.simpanFormGagal();
		this.getTaskFormGagal().close();
		
		//this.updateAVReDash();
	},

//*
	ambilDataForm: function()	{
		var taskFormGagal = this.getTaskFormGagal(),
            windowEl = taskFormGagal.getEl(),
            form = taskFormGagal.down('form').getForm(),
            me = this,
            task = form.getRecord(),
            o = {};

		o.id = form.findField('fgid').getValue();
		o.eq = form.findField('eq');
		o.cat = rcmSettings.cat;
		o.event = form.findField('tfevent').getValue();
		o.tipeev = form.findField('tipepm').getValue();
		o.ket = form.findField('tfket').getValue();
		o.exe = form.findField('exe').getValue();
		o.dd = this.getDate(form.findField('datedown').getValue()); 
		o.td = this.getTime(form.findField('timedown').getValue());
		o.dm = this.getDate(form.findField('datemulai').getValue()); 
		o.tm = this.getTime(form.findField('timemulai').getValue());
		o.ds = this.getDate(form.findField('dateselesai').getValue()); 
		o.ts = this.getTime(form.findField('timeselesai').getValue());
		o.du = this.getDate(form.findField('dateup').getValue()); 
		o.tu = this.getTime(form.findField('timeup').getValue());
		
		return o;
	},
	
	simpanFormGagal: function()	{
		var me=this,
			o = me.ambilDataForm();
			
		var rec = new rcm.model.DaftarGagal({ edit:0,
			id:'u'+o.id,downt:o.dd,downj:o.td,startt:o.dm,startj:o.tm,endt:o.ds,endj:o.ts,upt:o.du,upj:o.tu,
			event:o.event,tipeev:o.tipeev,ket:o.ket,exe:o.exe,server:rcmSettings.server,cat:rcmSettings.cat
        });
		
		rcmSettings.sadsad = rec;
        
        rec.save({				// update
            success: function(respon, operation) {
				var resp = operation.request.scope.reader.jsonData["tasks"];
				var recx = me.getEventStore().getRange();

				if (o.event>2)	{
					for (var i=0, len1=resp.length; i<len1; ++i) {
						for (var j=0,len2=recx.length; j<len2; ++j)	{
							if (recx[j].data.ideql==resp[i].eq)	{
								recx[j].set('iddown',resp[i].id);
							}
						}
					}
					me.getEventStore().sync({
						success: function()	{
							me.getDaftarGagalStore().reload();
						},
						failure: function()	{
							//console.log("getEventStore gagal");
						},
						callback: function()	{
							//console.log("getEventStore callback");
						}										
					});				// create ()

				}
				me.getDaftarGagalStore().reload();
				me.getRunningHourStore().reload();
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                me.getDaftarGagalStore().reload();
				me.getRunningHourStore().reload();
            }
        });
	},
	
	cariID: function(obj)	{
		var id='';
		for(var i=0; i<obj.length; i++)	{
			id = 'e'+obj[i].id+id;
		}
		return id;
	},

	updateGagalClick: function()	{
		//console.log('masuk updateGagalClick');
		var me=this;
		var o = me.ambilDataForm();
		var resp,id;
		
		var rec = new rcm.model.DaftarGagal({ edit:1,
			id:o.id,downt:o.dd,downj:o.td,startt:o.dm,startj:o.tm,endt:o.ds,endj:o.ts,upt:o.du,upj:o.tu,
			event:o.event,tipeev:o.tipeev,ket:o.ket,exe:o.exe,server:rcmSettings.server,cat:rcmSettings.cat
        });

        rec.save({			//rec.sync({ tidak ada 
            success: function(respon, operation) {
				//console.log('masuk updateGagalClick sukses');
				resp = operation.request.scope.reader.jsonData["tasks"];
				var recx = me.getEventStore().getRange();
				//rcmSettings.ttt = me.getEventStore();
				//rcmSettings.zzz = resp;
				//rcmSettings.qqq = recx;
				if (o.event!=1)	{
					for (var i=0, len1=resp.length; i<len1; i++) {
						for (var j=0,len2=recx.length; j<len2; j++)	{
							//console.log("resp: "+i+",recx: "+j+", apa ini callback ideql: "+recx[j].get('ideql')+", eq: "+resp[i].eq);
							if (recx[j].data.ideql==resp[i].eq)	{
								recx[j].set('iddown',resp[i].id);
							}
						}
					}
					//console.log("sukses rec DaftarGagal");
				}
				me.getDaftarGagalStore().reload();
				me.getRunningHourStore().reload();
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            },
            callback : function(respon, operation)	{
				//console.log("------ pa ini callback o.event: "+o.event);
				resp = operation.request.scope.reader.jsonData["tasks"];
				var recx = me.getEventStore().getRange();
				//rcmSettings.fff = resp;
				//alert(this.cariID(resp));
				//rcmSettings.hhh = recx;
				if (o.event!=1)	{
					
					//*
					for (var i=0, len1=resp.length; i<len1; i++) {
						for (var j=0,len2=recx.length; j<len2; j++)	{
							//console.log("resp: "+i+",recx: "+j+", apa ini callback ideql: "+recx[j].get('ideql')+", eq: "+resp[i].eq);
							if (recx[j].get('ideql')==resp[i].eq)	{
								recx[j].set('iddown',resp[i].id);
								break;
							}
						}
					}
					//*/
					//console.log("apa ini callback 4");
					me.getEventStore().sync();
					//console.log("apa ini callback resp.length: ");
				}
				// matikan dulu, nanti hidupkan lagi
				me.getDaftarGagalStore().reload();
				me.getRunningHourStore().reload();
				
				id='';
				for(var i=0; i<resp.length; i++)	{
					id = 'e'+resp[i].id+id;
				}
				//alert(id);
				me.getEventInfoStore().load({params:{down:id}});
			}
        });

		me.getTaskFormGagal().close();
		
		
		//me.updateAVReDash();
	}
//*/
});
