'use strict';

const projectSearch = '.project-header-search';
const filterInput = '[name=card_filter_query]';
const remove = 'x-16';
const containerClassNames = 'pr-4';
const linkClassNames = 'btn-link Link--primary project-header-link v-align-middle';

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