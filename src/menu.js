'use strict';

const nav = '.Header-item nav';
const menuItemClassNames = 'js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade';
const shortcuts = ShortcutsStorage.getShortcuts();

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
    const span = document.createElement('span');
    span.className = 'shortcut-link';
    span.innerHTML = `
        <a href="${shortcut.path}" class="${menuItemClassNames}">${shortcut.title}</a>
        <button class="btn-link Link--muted">${ShortcutsIcons.remove}</button>
    `;
    span.querySelector('button').addEventListener('click', function () {
        removeShortcut(shortcut);
        span.remove();
    });

    return span;
}
function createShortcutsNav() {
    const shortcutsNav = document.createElement('nav');
    shortcutsNav.className = `shortcuts-menu ${navmenu.className}`;
    shortcutsNav.append(
        ...shortcuts.map(shortcut => createShortcutLink(shortcut))
    );

    return shortcutsNav;
}
function createAddButton() {
    const button = document.createElement('button');
    button.className = 'btn-link Link--muted';
    button.innerHTML = ShortcutsIcons.add;
    button.addEventListener('click', function () {
        const title = prompt('Title', document.title);
        if (!title) {
            return;
        }
        const path = prompt(
            `Path to "${title}"`,
            window.location.href.replace(/^https?:\/\/[^\/]*github.com/, '')
        );
        if (!path) {
            return;
        }
        const link = createShortcutLink(addShortcut(title, path));
        button.before(link);
    });

    return button;
}

const navmenu = document.querySelector(nav);

if (navmenu) {
    navmenu.after(
        createShortcutsNav(),
        createAddButton()
    );
}