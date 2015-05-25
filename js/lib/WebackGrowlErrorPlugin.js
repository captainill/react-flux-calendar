var notifier = require('node-notifier');

function WebackGrowlErrorPlugin() {
}
module.exports = WebackGrowlErrorPlugin;
WebackGrowlErrorPlugin.prototype.apply = function(compiler) {
	compiler.plugin("should-emit", function(compilation) {
		if(compilation.errors.length > 0){
			notifier.notify({
			  'title': 'Webpack Compile Error',
			  'message': compilation.errors[0].error
			});			
		}
	});
};
