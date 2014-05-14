Ext.define('rcm.view.nav.Tanggalan', {
	extend: 'Ext.picker.Date',
	alias: 'widget.tanggalan',
    xtype: 'taskTanggalan',
	minHeight: 75,
	//height: 100,
	layout: 'fit',
	todayText : 'Hari ini',

//*
    initComponent: function() {
		var me=this;
		me.items=[{
			xtype: 'datepicker',
			id: 'app-nav-picker',
			cls: 'ext-cal-nav-picker'
		}];
		me.listeners= {
			'select': {
				fn: function(dp, dt){
					var t = new Date(dt);
					//alert(Ext.Date.format(t, 'y-m-d'));
					this.fireEvent('klikKalender', Ext.Date.format(t, 'Y-m-d'));
				},
				scope: this
			}
		};
		me.callParent();
	}
});
