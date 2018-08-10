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
