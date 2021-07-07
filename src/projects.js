'use strict';

const projectSearch = '.project-header-search';
const filterInput = '[name=card_filter_query]';
const remove = 'x-16';
const containerClassNames = 'pr-4';
const linkClassNames = 'btn-link Link--primary project-header-link v-align-middle';

const savedFiltersKey = 'mh-filters';


function loadFiltersByKey(key) {
    const raw = localStorage.getItem(key);

    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw);
    } catch(e) { }

    return [];
}
function saveFiltersByKey(key, filters = []) {
    localStorage.setItem(key, JSON.stringify(filters));
}
const getGlobalSavedFilters = () => loadFiltersByKey(savedFiltersKey);
const getProjectSavedFilters = () => loadFiltersByKey(`${savedFiltersKey}-${document.location.pathname}`);
const saveGlobalFilters = (filters) => saveFiltersByKey(savedFiltersKey, filters);
const saveProjectFilters = (filters) => saveFiltersByKey(`${savedFiltersKey}-${document.location.pathname}`, filters);

function emit(element, eventType) {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent(eventType, true, true);
    element.dispatchEvent(evt);
}

function createFilterLink(filter) {
    const div = document.createElement('div');
    div.className = containerClassNames;
    div.innerHTML = `
        <button class='${linkClassNames}' type='button'>
            ${filter}
        </button>
    `;
    
    div.querySelector('button').addEventListener('click', () => {
        const input = document.querySelector(filterInput);
        input.value = filter;
        emit(input, 'input');
    });

    return div;
}

const search = document.querySelector(projectSearch);

if (search) {
    search.before(
        createFilterLink('no:assignee'),
        createFilterLink('assignee:m-hall'),
    );
}