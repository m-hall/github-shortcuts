
class GHDialog {
    constructor() {
        this.dialog = document.createElement('dialog');
        this.dialog.className = 'gh-shortcuts-dialog';
        this.inputs = {};
        this.buttons = {};
        this.keys = {};
        this.form = document.createElement('form');
        this.form.method = 'dialog';
        this.dialog.addEventListener('keydown', (e) => {
            if (this.keys[e.key]) {
                this.dialog.close(this.keys[e.key]);
            }
        });
        this.dialog.addEventListener('close', (e) => {
            this.resolve({
                values: this.getValues(),
                button: this.dialog.returnValue,
            });
        });
        this.formInputs = document.createElement('div');
        this.form.append(this.formInputs);
        this.menu = document.createElement('menu');
        this.form.append(this.menu);
        this.dialog.append(this.form);
        document.body.append(this.dialog);
    }
    addTextInput(id, label, placeholder) {
        const container = document.createElement('label');
        const labelNode = document.createElement('span');
        labelNode.innerText = label;
        container.append(labelNode);
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        container.append(input);
        this.formInputs.append(container);
        this.inputs[id] = input;
    }
    addCheckbox(id, label, description) {
        const container = document.createElement('label');
        const labelNode = document.createElement('span');
        labelNode.innerText = label;
        container.append(labelNode);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.title = description;
        container.append(input);
        this.formInputs.append(container);
        this.inputs[id] = input;
    }
    addButton(id, label, key) {
        const button = document.createElement('button');
        button.innerText = label;
        button.value = id;
        if (key) {
            this.keys[key] = id;
        }
        this.menu.append(button);
        this.buttons[id] = button;
    }
    getValues() {
        return Object.keys(this.inputs).reduce((values, key) => {
            const input = this.inputs[key];
            switch (input.type) {
                case 'checkbox':
                    values[key] = input.checked;
                    break;
                case 'text':
                default:
                    values[key] = input.value;
            }
            return values;
        }, {});
    }
    open(defaults) {
        return new Promise((resolve, reject) => {
            Object.keys(defaults).forEach(key => {
                this.inputs[key].value = defaults[key];
            });
            this.resolve = resolve;
            this.reject = reject;
            this.dialog.showModal();
        })
    }
}