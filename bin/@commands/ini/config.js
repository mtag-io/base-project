const path = require('path')

module.exports = {
    defaultEnvVaultPath: '../../@env-vault',
    defaultAppName: path.basename(path.resolve('./')),
    defaultVersion: '0.1.0',
    defaultAuthor: 'bitbrother',
    defaultLicenseTypes: [
        'MIT',
        'UNLICENSED'
    ]
}