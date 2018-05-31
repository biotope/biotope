const nodePlop = require('node-plop');
const chalk = require('chalk');
const plop = nodePlop('node_modules/biotope-generator/index.js');
const componentGenerator = plop.getGenerator('statefulComponent');

module.exports = () => {
	componentGenerator.runPrompts().then(function (res) {
		componentGenerator.runActions(res).then(function (result) {
			result.changes.forEach(function(line) {
				console.log(chalk.green('[SUCCESS]'), line.type, line.path.replace(process.cwd(), ''));
			});
			result.failures.forEach(function (line) {
				const logs = [chalk.red('[FAILED]')];
				if (line.type) { logs.push(line.type); }
				if (line.path) { logs.push(line.path); }

				const error = line.error || line.message;
				logs.push(chalk.red(error));

				console.log.apply(console, logs);
			});
		})
		.catch(function (err) {
			console.error(chalk.red('[ERROR]'), err.message);
			process.exit(1);
		});
	});
};