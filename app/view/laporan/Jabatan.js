/* Afrendy Bayu, 10Des2014 */

Ext.define('rcm.view.laporan.Jabatan', {
    extend: 'Ext.form.Panel',
	xtype: 'tJabat',
	require: [

	],
	
	defaults: {
		width:480
	},
	
	initComponent: function() {
		var me=this;
		
		me.items = [{
			//*/
				xtype: 'textfield',
				fieldLabel: 'Prepared by',	//  Nama yang menyiapkan
				id: 'nPrep',
				emptyText: 'Prepared by',
				msgTarget: 'side'
			},{
			//*/
				xtype: 'textfield',
				fieldLabel: 'Jabatan',
				id: 'jPrep',
				emptyText: 'Position',
				msgTarget: 'side'
			},{
				fieldLabel: 'Reviewed by',	// Nama yang mengecek
				id: 'nRevi',
				xtype: 'textfield',
				msgTarget: 'side',
				emptyText: 'Reviewed by'
			},{
				xtype: 'textfield',
				fieldLabel: 'Jabatan',
				id: 'jRevi',
				emptyText: 'Position',
				msgTarget: 'side'
			},{
			//*/
				xtype: 'textfield',
				fieldLabel: 'Approved by',	// Nama yang menyetujui
				id: 'nAppr',
				emptyText: 'Approved by',
				msgTarget: 'side'
			},{
				xtype: 'textfield',
				fieldLabel: 'Jabatan',
				id: 'jAppr',
				emptyText: 'Position',
				msgTarget: 'side'
			},{
				xtype: 'button',
				id: 'idJabatOH',
				text: 'Simpan',
				width: 100,
				iconCls: 'savedisk',
				margin: '0 380'
		}],
		
		me.callParent(arguments);
		
	},
	
	enaSave: function()	{
		Ext.getCmp('save-rh').enable();
		Ext.getCmp('update-rh').enable();
	},
	
	disSave: function()	{
		Ext.getCmp('save-rh').disable();
		Ext.getCmp('update-rh').disable();
	},
	
	updateErrorState: function(a) {		
		var me = this, errorCmp, fields, errors;
		var ev = Ext.getCmp('idtfevent').getSubmitValue(),
			dd = Ext.getCmp('datedown').getSubmitValue(),
			td = Ext.getCmp('timedown').getSubmitValue(),
			du = Ext.getCmp('dateup').getSubmitValue(),
			tu = Ext.getCmp('timeup').getSubmitValue();
		var ex = Ext.getCmp('idexe').getSubmitValue();
		//console.log("ev: "+ev+", dd: "+dd+", td: "+td+", du"+du+", tu: "+tu);
		//if (ev && ev==1)	{		// standby
		if (a==1) {
			if (dd && td && du && tu)	{
				me.enaSave();
				//Ext.getCmp('save-rh').enable();
			} else {
				//Ext.getCmp('save-rh').disable();
				me.disSave();
			}
		}
		else if (a==2)	{	// PM
		//else if (ev && ev==2)	{	// PM
			var pm = Ext.getCmp('tipepm').getSubmitValue();
			//console.log("pm: "+pm);
			if (dd && td && du && tu && pm && ex)	{
				me.enaSave();
				//Ext.getCmp('save-rh').enable();
			} else {
				//Ext.getCmp('save-rh').disable();
				me.disSave();
			}
		}
		else if (a==3 || a==4)	{	// CR | BD
			//console.log("ev: "+ev+",pjg: "+ex.length);
			if (dd && td && du && tu && ex && ex.length>=2)	{
				//Ext.getCmp('save-rh').enable();
				me.enaSave();
			} else {
				//Ext.getCmp('save-task-fg-btn').disable();
				me.disSave();
			}
		}
		else {
			//Ext.getCmp('save-task-fg-btn').disable();
			me.disSave();
		}
	},
		
	pilihEventG: function(n)	{
		this.fireEvent('plhEventGagalXY', n);
		if (n==1)	{		// StandBy
			Ext.getCmp('TFpm').setVisible(false);
			Ext.getCmp('TFmt').setVisible(false);
			Ext.getCmp('TFst').setVisible(false);
			Ext.getCmp('TFTmbl').setVisible(false);
			Ext.getCmp('TFGrid').setVisible(false);
			Ext.getCmp('idexe').setVisible(false);
		} 
		else if (n==2)	{
			Ext.getCmp('TFpm').setVisible(true);
			Ext.getCmp('TFmt').setVisible(true);
			Ext.getCmp('TFst').setVisible(true);
			Ext.getCmp('TFTmbl').setVisible(false);
			Ext.getCmp('idexe').setVisible(true);
			Ext.getCmp('TFGrid').setVisible(false);
			//*/
		} else	{ // BD & CR
			Ext.getCmp('TFpm').setVisible(false);
			Ext.getCmp('TFmt').setVisible(true);
			Ext.getCmp('TFst').setVisible(true);
			Ext.getCmp('TFTmbl').setVisible(true);
			Ext.getCmp('idexe').setVisible(true);
			Ext.getCmp('TFGrid').setVisible(true);
		}
		this.updateErrorState(n);
	},

	setNilai: function(rec)	{
		Ext.getCmp('save-rh').setVisible(false);
		Ext.getCmp('update-rh').setVisible(true);
		
		//alert(Ext.getCmp('idtfevent').getValue());
		
		//alert("masuk "+(rec.get('idevent')+1)+", event: "+rec.get('event'));
		rcmSettings.bbb = rec;
		//var ev = parseInt(rec.get('idevent'));
		Ext.getCmp('fmEq').setValue(rec.get('nama')+" @"+rec.get('lok'));
		Ext.getCmp('fgid').setValue(rec.get('id'));
		Ext.getCmp('idtfevent').setValue(rec.get('idevent'));
		//Ext.getCmp('idtfevent').setValue(parseInt(rec.get('idevent'));
		//Ext.getCmp('idtfevent').setValue(rec.get('event'));
		Ext.getCmp('datedown').setValue(rec.get('downt'));
		Ext.getCmp('timedown').setValue(rec.get('downj'));
		Ext.getCmp('dateup').setValue(rec.get('upt'));
		Ext.getCmp('timeup').setValue(rec.get('upj'));
		Ext.getCmp('idexe').setValue(rec.get('exe'));
		Ext.getCmp('idtfket').setValue(rec.get('ket'));
		Ext.getCmp('datemulai').setValue(rec.get('startt'));
		Ext.getCmp('timemulai').setValue(rec.get('startj'));
		Ext.getCmp('dateselesai').setValue(rec.get('endt'));
		Ext.getCmp('timeselesai').setValue(rec.get('endj'));
		
		//alert(Ext.getCmp('idtfevent').getValue());
		//return (rec.get('tipeev'));
	}
});
