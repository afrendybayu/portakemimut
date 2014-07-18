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
		,'Event'
		,'Aksi'
		,'Cause'
    ],
    
    models: [
		//'RunningHour'
		'Event'
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
				plhFilterFMEA: me.plhFilterClick,
				plhEquipGagal: me.plhEquipClick,
				plhCauseGagal: me.plhCauseClick,
				plhAksiGagal: me.plhAksiClick,
				plhModeGagal: me.plhModeClick,
				plhOPartGagal: me.plhOPartClick
				
				//,infoDetailGagal: me.infoDG
			},
			'#tambah-fmea-btn': {
				click: me.tmbhFMEAClick
			}
			
		});
    },
    //*/
    
    tmbhFMEAClick: function()	{
		var rec = new rcm.model.Event({
            eql:'',ideql:'',opart:'',idopart:'',mode:'',idmode:'',cause:'',idcause:'',aksi:'',idaksi:''
        });
        this.getEventStore().insert(0, rec);
        this.getTaskFMEAGrid().getView().refresh();
		//alert('tambah FNMEA');
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
	}
});
