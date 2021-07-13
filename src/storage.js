
const shortcutsKey = 'gh-shortcuts';

const ShortcutsStorage = {
    key: 'gh-shortcuts',
    loaded: false,
    data: null,
    load() {
        try {
            const raw = localStorage.getItem(this.key);
            this.data = JSON.parse(raw);
        } catch(e) {
            this.data = {};
        }

        this.loaded = true;
    },
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    },
    getShortcuts() {
        return this.data.shortcuts || [];
    },
    getProjectFilters(project) {
        return this.data[`filters-${project}`] || [];
    },
    getGlobalFilters() {
        return this.data.filters || [];
    },
    setShortcuts(shortcuts) {
        this.data.shortcuts = shortcuts;
        this.save();
    },
    setProjectFitlers(project, filters) {
        this.data[`filters-${project}`] = filters;
        this.save();
    },
    setGlobalFilters(filters) {
        this.data[`filters`] = filters;
        this.save();
    }
};

ShortcutsStorage.load();
