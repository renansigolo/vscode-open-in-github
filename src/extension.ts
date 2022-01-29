import * as vscode from "vscode";

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  const projectId = "my-adhd-website";
  const projectOwner = "renansigolo";
  const projectUrl = `https://github.com/${projectOwner}/${projectId}`;

  function openProjectUrl(projectUrl: string) {
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(projectUrl));
  }

  // register a command that is invoked when the status bar item is selected
  const myCommandId = "open-in-github.showOpenInGitHub";
  let showOpenInGitHubCommand = vscode.commands.registerCommand(
    myCommandId,
    () => {
      myStatusBarItem.show();
    }
  );

  let openInGitHubCommand = vscode.commands.registerCommand(
    "open-in-github.openInGitHub",
    () => {
      openProjectUrl(projectUrl);
    }
  );

  // create a new status bar item that we can now manage
  const showLabel = true;
  const iconOptions = ["github", "github-alt", "github-inverted"];

  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  myStatusBarItem.command = myCommandId;
  myStatusBarItem.tooltip = "Opens your GitHub project on the web browser";
  myStatusBarItem.text = `$(${iconOptions[2]}) ${
    showLabel ? "Open in GitHub" : ""
  }`;

  subscriptions.push(showOpenInGitHubCommand);
  subscriptions.push(openInGitHubCommand);
  subscriptions.push(myStatusBarItem);

  myStatusBarItem.show();

  // update status bar item once at start
  // updateStatusBarItem();
}

// this method is called when your extension is deactivated
export function deactivate() {}
