Ext.define('rcm.controller.Sapu', {
    extend: 'Ext.app.Controller',
    //*

	views: [
        // TODO: add views here
        'sapu.Sapu'
        
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
		
		'SapuUnit'
		,'RunningHour'
    ],
    
    models: [
		'SapuUnit'
		//,'RunningHour'
	],
    
    refs: [{
			ref: 'content',
			selector: 'content'
		},{
			ref: 'tSapu',
			selector : 'tSapu'
		
	}],
    
    init: function() {
		var me = this;
        me.control({
			'content': {
				updateSapu: me.updateNyapu
				
			},
			'tSapu' : {
				clickUnit : me.klikUnit
			},
			'tSapu button[text=Submit]' : {
				click : me.SubmitSapu
			},
			'tSapu button[text=Delete]' : {
				click : me.DeleteSapu
			}
		
		});
	},
	DeleteSapu: function(){
			//alert ('hapus hapus hapusss');
			var me = this;
			var spgrid = this.getTSapu(),
			datax = spgrid.getSelectionModel().getSelection(),
			awl = Ext.getCmp('t_awal').value,
			akh = Ext.getCmp('t_akhir').value;
			console.log(datax);
			
			//for(var i = 0, lgt = datax.length; i < lgt; i++){
				////ndelete = Ext.create(rcm.model.SapuUnit,{id_unit:datax[i].data.id_unit, awal:awl, akhir:akh});
				//ndel  = new rcm.model.SapuUnit(datax);
				
					//ndel.destroy({
						//success: function(ndel, operation){
							
							//}
						
						
						//});
			//}
			
			//for(var i = 0, lgt = datax.length; i < lgt; i++){
				////console.log(datax[i].data.id_unit);
				
				////ndelete = new rcm.model.SapuUnit(datax[i]);
				////ndelete = Ext.create(rcm.model.SapuUnit,{id_unit:datax[i].data.id_unit, awal:awl, akhir:akh});
				////console.log (ndelete);
					
					//ndelete.destroy({
						//success: function(ndelete, operation){
							////me.getFormAksisStore().reload();
							////me.getRunningHourStore().reload();
						//}

					//});
					
				
				//}
			
			
			
	},
	SubmitSapu: function(){
			var me = this;
			//console.log('nyapu mase');
			var sapugrid = this.getTSapu(),
			datanya = sapugrid.getSelectionModel().getSelection();
			var satu = Ext.getCmp('t_awal').value;
			var dua = Ext.getCmp('t_akhir').value;
			
			//console.log(datanya);
			//console.log(satu + dua);
			//console.log(datanya[].data.id_unit);
			
			for(var i = 0; i < datanya.length; i++){
					//console.log(datanya[i].data.id_unit);
					//console.log(satu + dua);
				//console.log (i);
				nyapu = Ext.create(rcm.model.SapuUnit,{id_unit:datanya[i].data.id_unit, flag:datanya[i].data.flag, awal:satu, akhir:dua});
				//console.log (nyapu);
				nyapu.save({
					success: function(record, operation){
						//me.getFormAksisStore().reload();
						me.getRunningHourStore().reload();
					}
				});
				
				//if (i == datanya.length ){
					//alert ('selesai');
					//}
				//else {continue};
			}
	},
	klikUnit : function(cat){
		//console.log('klik unit ini : '+cat);
		//console.log(cat);
		this.getSapuUnitStore().load({ params: { f:cat } });
	},
	
	updateNyapu: function(){
		var me=this;
		//console.log('update lagi yah');
		me.getSapuUnitStore().load();
		
	}
		
    
	
	
	
});
