const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your challange is now active!');

    // Генерація команди для розширення
    let disposable = vscode.commands.registerCommand('extension.doHardFunnyChallenge', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            if (selection.isEmpty) {
                // Якщо текст не вибрано, у челенджі задіяно увесь файл
                performHardFunnyChallenge(document, editor);
            } else {
                // Якщо вибрана частина, то застосовується до неї
                performHardFunnyChallenge(document, editor, selection);
            }
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

function performHardFunnyChallenge(document, editor, selection) {
    const challenges = [
        {
            label: 'Reverse the entire document',
            challenge: () => {
                //Отримання файлу або частини
                let modifiedText = document.getText(selection || undefined);
                //Розбиття - зміна порядку - склеювання
                modifiedText = modifiedText.split('').reverse().join('');

                editor.edit(editBuilder => {
                    if (selection) {
                        editBuilder.replace(selection, modifiedText);
                    } else {
                        editBuilder.replace(document.validateRange(new vscode.Range(0, 0, document.lineCount - 1, Infinity)), modifiedText);
                    }
                });
            }
        },
        {
            label: 'Replace all letters with emojis',
            challenge: () => {
                let modifiedText = document.getText(selection || undefined);
                //Заміна літер на випвдкові емодзі
                modifiedText = modifiedText.replace(/[a-zA-Z]/g, getRandomEmoji);

                editor.edit(editBuilder => {
                    if (selection) {
                        editBuilder.replace(selection, modifiedText);
                    } else {
                        editBuilder.replace(document.validateRange(new vscode.Range(0, 0, document.lineCount - 1, Infinity)), modifiedText);
                    }
                });
            }
        },
         
    ];

    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomIndex];

    challenge.challenge();
}

function getRandomEmoji() {
    const emojis = ['😄', '🎉', '🤪', '🍕', '🌮', '🦄', '🌈'];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

module.exports = {
    activate,
    deactivate
};
