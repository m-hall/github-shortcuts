'use strict';

const nav = '[role="navigation"] > [role="list"]';
const menuItemClassNames = 'AppHeader-context-item';//'js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade';
const shortcuts = ShortcutsStorage.getShortcuts();
const menuDialog = new GHDialog();

let shortcutsNav;

menuDialog.addTextInput('title', 'Title', 'Title of the menu item');
menuDialog.addTextInput('path', 'Path', 'Path to Github page');
menuDialog.addButton('cancel', 'Cancel', 'Escape');
menuDialog.addButton('ok', 'Confirm', 'Enter');

function removeShortcut(shortcut) {
    shortcuts.splice(shortcuts.indexOf(shortcut), 1);
    ShortcutsStorage.setShortcuts(shortcuts);
}
function addShortcut(title, path) {
    const shortcut = {title, path}
    shortcuts.push(shortcut);
    ShortcutsStorage.setShortcuts(shortcuts);
    return shortcut;
}
function createShortcutLink(shortcut) {
    const span = document.createElement('li');
    span.style.position = 'relative';
    span.innerHTML = `
        <a href="${shortcut.path}" class="${menuItemClassNames}">${shortcut.title}</a>
        <button class="ghsh-remove btn-link Link--muted">${ShortcutsIcons.remove}</button>
    `;
    span.querySelector('.ghsh-remove').addEventListener('click', function () {
        removeShortcut(shortcut);
        span.remove();
    });

    return span;
}
function createShortcutsNav() {
    shortcutsNav = document.createDocumentFragment();
    shortcutsNav.append(
        ...shortcuts.map(shortcut => createShortcutLink(shortcut))
    );

    return shortcutsNav;
}
function createSeparator() {
    const span = document.createElement('li');
    span.innerHTML = '<span style="width: 1px; height: var(--base-size-20, 20px); background: var(--color-border-default); margin: 0 calc((var(--control-medium-size, 32px) - var(--base-size-20, 20px))/2);" />';
    
    return span;
}
function createAddButton() {
    const button = document.createElement('button');
    button.className = 'btn-link Link--muted';
    button.innerHTML = ShortcutsIcons.add;
    button.addEventListener('click', async function () {
        const output = await menuDialog.open({
            title: document.title,
            path: window.location.href.replace(/^https?:\/\/[^\/]*github.com/, '')
        });
        if (output.button !== 'ok') {
            return;
        }
        const link = createShortcutLink(addShortcut(output.values.title, output.values.path));
        shortcutsNav.append(link);
    });

    return button;
}

const navmenu = document.querySelector(nav);

if (navmenu) {
    navmenu.append(
        createSeparator(),
        createShortcutsNav(),
        createAddButton()
    );
}