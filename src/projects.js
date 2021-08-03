'use strict';

const projectSearch = '.project-header-search';
const filterInput = '[name=card_filter_query]';
const remove = 'x-16';
const linkClassNames = 'btn-link Link--primary project-header-link v-align-middle';

const projectPath = window.location.pathname;

const globalFilters = ShortcutsStorage.getGlobalFilters();
const projectFilters = ShortcutsStorage.getProjectFilters(projectPath);
const filterDialog = new GHDialog();

filterDialog.addTextInput('title', 'Title', 'Title of the filter');
filterDialog.addTextInput('filter', 'Filter', 'Actual filter value');
filterDialog.addCheckbox('global', 'Global', 'Leave blank if this filter only applies to this project.');
filterDialog.addButton('cancel', 'Cancel', 'Escape');
filterDialog.addButton('ok', 'Confirm', 'Enter');

function emit(element, eventType) {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent(eventType, true, true);
    element.dispatchEvent(evt);
}

function removeFilter(filter) {
    if (globalFilters.includes(filter)) {
        globalFilters.splice(globalFilters.indexOf(filter), 1);
        ShortcutsStorage.setGlobalFilters(globalFilters);
    } else if (projectFilters.includes(filter)) {
        projectFilters.splice(projectFilters.indexOf(filter), 1);
        ShortcutsStorage.setProjectFitlers(projectPath, projectFilters);
    }
}
function addFilter(title, filter, isGlobal) {
    const filterObject = {title, filter};

    if (isGlobal) {
        globalFilters.push(filterObject);
        ShortcutsStorage.setGlobalFilters(globalFilters);
    } else {
        projectFilters.push(filterObject);
        ShortcutsStorage.setProjectFitlers(projectPath, projectFilters);
    }

    return filterObject;
}
function createFilterLink(filter, isGlobal) {
    const div = document.createElement('div');
    div.className = 'ghsh-container mr-1';
    div.innerHTML = `
        <button class='ghsh-filter ${linkClassNames} mr-3 ${isGlobal ? 'ghsh-filter--global' : ''}' type='button'>
            ${filter.title}
        </button>
        <button class="ghsh-remove btn-link Link--muted">${ShortcutsIcons.remove}</button>
    `;
    
    div.querySelector('.ghsh-filter').addEventListener('click', () => {
        const input = document.querySelector(filterInput);
        input.value = filter.filter;
        emit(input, 'input');
    });
    div.querySelector('.ghsh-remove').addEventListener('click', function () {
        removeFilter(filter);
        div.remove();
    });

    return div;
}

function createAddFilterButton() {
    const button = document.createElement('button');
    button.className = 'btn-link Link--muted pr-4';
    button.innerHTML = `
        ${ShortcutsIcons.add}
    `;
    button.title = 'Save filter';
    button.addEventListener('click', async function () {
        const filter = document.querySelector(filterInput).value;
        const output = await filterDialog.open({
            title: filter,
            filter: filter,
            global: false
        });
        if (output.button !== 'ok') {
            return;
        }
        const link = createFilterLink(
            addFilter(
                output.values.title,
                output.values.filter,
                output.values.global
            ),
            output.values.global
        );
        button.before(link);
    });

    return button;
}

const search = document.querySelector(projectSearch);

if (search) {
    search.before(
        ...globalFilters.map(f => createFilterLink(f, true)),
        ...projectFilters.map(f => createFilterLink(f, false)),
        createAddFilterButton()
    );
}