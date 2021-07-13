'use strict';

const nav = '.Header-item nav';
const menuItemClassNames = 'js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade';

const saveShortcutsKey = 'mh-links';


function loadShortcuts() {
    const raw = localStorage.getItem(saveShortcutsKey);

    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw);
    } catch(e) { }

    return [];
}
function saveShortcuts(shortcuts = []) {
    localStorage.setItem(saveShortcutsKey, JSON.stringify(shortcuts));
}

function createShortcut(title, path) {
    const link = document.createElement('a');
    link.className = menuItemClassNames;
    link.href = path;
    link.innerText = title;

    return link;
}

const navmenu = document.querySelector(nav);

if (navmenu) {
    const shortcuts = document.createElement('nav');
    shortcuts.className = navmenu.className;
    shortcuts.style.paddingLeft = '16px';
    shortcuts.style.borderLeft = '1px solid';
    shortcuts.append(createShortcut('Web TV board', '/orgs/plexinc/projects/81'));
    navmenu.after(
        shortcuts
    );
}