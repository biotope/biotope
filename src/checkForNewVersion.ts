import * as boxen from 'boxen';
import fetch from 'node-fetch';

const getVersionFromPackageInfo = packageInfo => packageInfo['dist-tags'].latest;
const getRemoteVersion = async () => {
	const packageInfo = await fetch('https://registry.npmjs.org/biotope').then(r => r.json());
	return getVersionFromPackageInfo(packageInfo);
};

const getCurrentVersion = () => {
	const pjson = require('../package.json');
	return pjson.version;
};

const checkForNewVersion = async () => {
	const remoteVersion = await getRemoteVersion();
	const currentVersion = getCurrentVersion();

	if (currentVersion != remoteVersion) {
		console.log(boxen(
			`There is a new version of biotope. ${currentVersion} -> ${remoteVersion} run 'npm install biotope -g' to update`,
			{
				padding: 1,
				borderColor: 'red'
			}
		));
	}
}

export default checkForNewVersion;
