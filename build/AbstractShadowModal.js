"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractShadowModal extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    setTitle(text) {
        this.modalTitle.textContent = text;
    }
    setContent(content) {
        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
        if (content instanceof HTMLElement) {
            this.body.appendChild(content);
        }
        else if (typeof content === 'string') {
            this.body.innerHTML = content;
        }
        return this.body.firstChild;
    }
    addStyle(rules) {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(rules));
        this.shadow.appendChild(style);
        return style;
    }
    addFooterBtn(text, classNames, callback) {
        const button = document.createElement('button');
        button.textContent = text;
        if (classNames) {
            if (typeof classNames === 'string') {
                classNames = classNames.split(' ');
            }
            else if (!Array.isArray(classNames) || classNames.some((c) => typeof c !== 'string')) {
                throw new Error('classNames must be of type string or string[]');
            }
            if (classNames.length > 0) {
                button.classList.add(...classNames);
            }
        }
        if (typeof callback === 'function') {
            button.addEventListener('click', callback.bind(this));
        }
        this.footer.appendChild(button);
        return button;
    }
}
exports.default = AbstractShadowModal;
