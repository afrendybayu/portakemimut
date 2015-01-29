/* Afrendy Bayu, 27Jan2015 */
Ext.define('rcm.model.SapTipe', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	fields: [ 'text', 'nama', { name: 'id', type: 'int' }]
});
