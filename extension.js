const os = require('os');
const vscode = require('vscode');
const { execSync } = require('child_process');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  console.log('Congratulations, your extension "detect-theme" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('detect-theme.run', () => {
    const workbenchConfig = vscode.workspace.getConfiguration();
    let stdout;
    try {
      if (os.platform() === 'darwin') {
        stdout = execSync('defaults read -g AppleInterfaceStyle');
        if (stdout.toString().trim() === 'Dark') {
          workbenchConfig.update(
            'workbench.colorTheme',
            'Default Dark+',
            vscode.ConfigurationTarget.Global
          );

          vscode.window.showInformationMessage('Detected Theme: Dark');
        }
      }
    } catch (error) {
      if (/does not exist/.test(error.stderr)) {
        workbenchConfig.update(
          'workbench.colorTheme',
          'Default Light+',
          vscode.ConfigurationTarget.Global
        );
        vscode.window.showInformationMessage('Detected Theme: Light');
      }
    }
  });
  context.subscriptions.push(disposable);
};
// this method is called when your extension is deactivated
const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
