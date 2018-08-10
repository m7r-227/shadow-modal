(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ShadowModal = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    removeStyle(style) {
        if (style instanceof HTMLStyleElement) {
            const parent = style.parentNode;
            if (parent !== null && this.shadow.isSameNode(parent)) {
                this.shadow.removeChild(style);
            }
        }
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
    removeFooterBtn(button) {
        if (button instanceof HTMLButtonElement) {
            const parent = button.parentNode;
            if (parent !== null && this.footer.isSameNode(parent)) {
                this.footer.removeChild(button);
            }
        }
    }
}
exports.default = AbstractShadowModal;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShadowModal_1 = require("../AbstractShadowModal");
class Bootstrap4 extends AbstractShadowModal_1.default {
    constructor() {
        super();
        const bootstrap = document.createElement('link');
        bootstrap.setAttribute('rel', 'stylesheet');
        bootstrap.setAttribute('href', 'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
        this.shadow.appendChild(bootstrap);
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('modal-backdrop', 'fade', 'show', 'd-none');
        this.shadow.appendChild(this.backdrop);
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content text-dark">

                        <div class="modal-header">
                            <div class="modal-title"></div>
                            <button type="button" class="close" data-close>
                                <span data-close>&times;</span>
                            </button>
                        </div>

                        <div class="modal-body"></div>

                        <div class="modal-footer"></div>

                    </div>
                </div>
            </div>
        `;
        this.modal = Array.prototype.filter.call(template.content.childNodes, (n) => n instanceof HTMLElement)[0];
        this.dialog = this.modal.querySelector('.modal-dialog');
        this.header = this.modal.querySelector('.modal-header');
        this.modalTitle = this.header.querySelector('.modal-title');
        this.body = this.modal.querySelector('.modal-body');
        this.footer = this.modal.querySelector('.modal-footer');
        this.modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof HTMLElement) {
                if (this.modal.isSameNode(target)) {
                    this.close();
                }
                else if (target.dataset.close !== undefined) {
                    this.close();
                }
            }
        });
        this.shadow.appendChild(this.modal);
    }
    open() {
        this.modal.classList.add('show', 'd-block');
        this.backdrop.classList.remove('d-none');
    }
    close() {
        this.modal.classList.remove('show', 'd-block');
        this.backdrop.classList.add('d-none');
    }
    set isLarge(val) {
        if (val) {
            this.dialog.classList.remove('modal-sm');
            this.dialog.classList.add('modal-lg');
        }
        else {
            this.dialog.classList.remove('modal-lg');
        }
    }
    get isLarge() {
        return this.dialog.classList.contains('modal-lg');
    }
    set isSmall(val) {
        if (val) {
            this.dialog.classList.remove('modal-lg');
            this.dialog.classList.add('modal-sm');
        }
        else {
            this.dialog.classList.remove('modal-sm');
        }
    }
    get isSmall() {
        return this.dialog.classList.contains('modal-sm');
    }
    set isVerticallyCentered(val) {
        if (val) {
            this.dialog.classList.add('modal-dialog-centered');
        }
        else {
            this.dialog.classList.remove('modal-dialog-centered');
        }
    }
    get isVerticallyCentered() {
        return this.dialog.classList.contains('modal-dialog-centered');
    }
    set hasHeader(val) {
        if (val) {
            this.header.classList.remove('d-none');
        }
        else {
            this.header.classList.add('d-none');
        }
    }
    get hasHeader() {
        return !this.header.classList.contains('d-none');
    }
    set hasFooter(val) {
        if (val) {
            this.footer.classList.remove('d-none');
        }
        else {
            this.footer.classList.add('d-none');
        }
    }
    get hasFooter() {
        return !this.footer.classList.contains('d-none');
    }
    static create(o) {
        const modal = document.createElement('bootstrap4-modal');
        if (!o) {
            return modal;
        }
        if (o.title) {
            modal.setTitle(o.title);
        }
        if (o.content) {
            modal.setContent(o.content);
        }
        if (o.style) {
            modal.addStyle(o.style);
        }
        modal.isLarge = o.isLarge !== undefined ? o.isLarge : false;
        modal.isSmall = o.isSmall !== undefined ? o.isSmall : false;
        modal.isVerticallyCentered = o.isVerticallyCentered !== undefined ? o.isVerticallyCentered : false;
        modal.hasHeader = o.hasHeader !== undefined ? o.hasHeader : true;
        modal.hasFooter = o.hasFooter !== undefined ? o.hasFooter : true;
        if (o.footerBtns && o.footerBtns.length > 0) {
            o.footerBtns.forEach((fb) => {
                modal.addFooterBtn(fb.text, fb.classNames, fb.click);
            });
        }
        if (o.appendTo) {
            const target = document.querySelector(o.appendTo);
            if (target !== null) {
                target.appendChild(modal);
            }
        }
        return modal;
    }
}
customElements.define('bootstrap4-modal', Bootstrap4);
exports.default = Bootstrap4;

},{"../AbstractShadowModal":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShadowModal_1 = require("../AbstractShadowModal");
class Bulma extends AbstractShadowModal_1.default {
    constructor() {
        super();
        const bulma = document.createElement('link');
        bulma.setAttribute('rel', 'stylesheet');
        bulma.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css');
        this.shadow.appendChild(bulma);
        this.hideClasses = ['is-hidden-touch', 'is-hidden-tablet', 'is-hidden-desktop'];
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="modal">
                <div class="modal-background"></div>
                    <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Modal title</p>
                        <button class="delete" data-close="true"></button>
                    </header>
                    <section class="modal-card-body"></section>
                    <footer class="modal-card-foot"></footer>
                </div>
            </div>
        `;
        this.modal = Array.prototype.filter.call(template.content.childNodes, (n) => n instanceof HTMLElement)[0];
        this.background = this.modal.querySelector('.modal-background');
        this.header = this.modal.querySelector('.modal-card-head');
        this.modalTitle = this.header.querySelector('.modal-card-title');
        this.body = this.modal.querySelector('.modal-card-body');
        this.footer = this.modal.querySelector('.modal-card-foot');
        this.modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof HTMLElement) {
                if (this.background.isSameNode(target)) {
                    this.close();
                }
                else if (target.dataset.close !== undefined) {
                    this.close();
                }
            }
        });
        this.shadow.appendChild(this.modal);
    }
    open() {
        this.modal.classList.add('is-active');
    }
    close() {
        this.modal.classList.remove('is-active');
    }
    set hasHeader(val) {
        if (val) {
            this.header.classList.remove(...this.hideClasses);
        }
        else {
            this.header.classList.add(...this.hideClasses);
        }
    }
    get hasHeader() {
        return !this.hideClasses.every((c) => this.header.classList.contains(c));
    }
    set hasFooter(val) {
        if (val) {
            this.footer.classList.remove(...this.hideClasses);
        }
        else {
            this.footer.classList.add(...this.hideClasses);
        }
    }
    get hasFooter() {
        return !this.hideClasses.every((c) => this.footer.classList.contains(c));
    }
    static create(o) {
        const modal = document.createElement('bulma-modal');
        if (!o) {
            return modal;
        }
        if (o.title) {
            modal.setTitle(o.title);
        }
        if (o.content) {
            modal.setContent(o.content);
        }
        if (o.style) {
            modal.addStyle(o.style);
        }
        modal.hasHeader = o.hasHeader !== undefined ? o.hasHeader : true;
        modal.hasFooter = o.hasFooter !== undefined ? o.hasFooter : true;
        if (o.footerBtns && o.footerBtns.length > 0) {
            o.footerBtns.forEach((fb) => {
                modal.addFooterBtn(fb.text, fb.classNames, fb.click);
            });
        }
        if (o.appendTo) {
            const target = document.querySelector(o.appendTo);
            if (target !== null) {
                target.appendChild(modal);
            }
        }
        return modal;
    }
}
customElements.define('bulma-modal', Bulma);
exports.default = Bulma;

},{"../AbstractShadowModal":1}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bootstrap4_1 = require("./bootstrap4/Bootstrap4");
exports.Bootstrap4 = Bootstrap4_1.default;
const Bulma_1 = require("./bulma/Bulma");
exports.Bulma = Bulma_1.default;

},{"./bootstrap4/Bootstrap4":2,"./bulma/Bulma":3}]},{},[4])(4)
});
