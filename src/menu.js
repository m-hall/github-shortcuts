'use strict';

const nav = '.Header-item nav';
const menuItemClassNames = 'js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade';
const shortcuts = ShortcutsStorage.getShortcuts();

function removeShortcut(shortcut) {
    shortcuts.splice(shortcuts.indexOf(shortcut), 1);
    ShortcutsStorage.setShortcuts(shortcuts);
}
function addShortcut(title, path) {
    shortcuts.push({title, path});
    ShortcutsStorage.setShortcuts(shortcuts);
}
function createShortcutLink(shortcut) {
    const span = document.createElement('span');
    span.style.position = 'relative';
    span.innerHTML = `
        <a href="${shortcut.path}" class="${menuItemClassNames}">${shortcut.title}</a>
        <button class="btn-link Link--muted" style="position: absolute; right: 0; top: -8px;">${ShortcutsIcons.remove}</button>
    `;
    span.querySelector('button').addEventListener('click', function () {
        removeShortcut(shortcut);
        span.remove();
    });

    return span;
}

const navmenu = document.querySelector(nav);

if (navmenu) {
    const shortcutsNav = document.createElement('nav');
    shortcutsNav.className = navmenu.className;
    shortcutsNav.style.paddingLeft = '16px';
    shortcutsNav.style.borderLeft = '1px solid';

    shortcutsNav.append(
        ...shortcuts.map(shortcut => createShortcutLink(shortcut))
    );
    navmenu.after(
        shortcutsNav
    );
}