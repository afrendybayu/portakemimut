/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.SapOcPs', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['nama',
		//{ name:'tPlCost',type:'float' },
		'tPlCost',
		{ name:'tAcCost',type:'float' }]
});
