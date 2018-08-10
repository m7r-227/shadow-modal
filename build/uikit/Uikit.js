"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShadowModal_1 = require("../AbstractShadowModal");
class Bulma extends AbstractShadowModal_1.default {
    constructor() {
        super();
        const uikit = document.createElement('link');
        uikit.setAttribute('rel', 'stylesheet');
        uikit.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css');
        this.shadow.appendChild(uikit);
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="uk-modal">
                <div class="uk-modal-dialog">
                    <button class="uk-modal-close-default uk-close uk-icon" type="button" data-close></button>
                    <div class="uk-modal-header">
                        <h2 class="uk-modal-title"></h2>
                    </div>
                    <div class="uk-modal-body">
                    </div>
                    <div class="uk-modal-footer uk-text-right">
                    </div>
                </div>
            </div>
        `;
        this.modal = Array.prototype.filter.call(template.content.childNodes, (n) => n instanceof HTMLElement)[0];
        this.header = this.modal.querySelector('.uk-modal-header');
        this.modalTitle = this.header.querySelector('.uk-modal-title');
        this.body = this.modal.querySelector('.uk-modal-body');
        this.footer = this.modal.querySelector('.uk-modal-footer');
        this.modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof HTMLElement) {
                console.log(target);
                // if (this.background.isSameNode(target)) {
                //     this.close();
                // } else if (target.dataset.close !== undefined) {
                //     this.close();
                // }
            }
        });
        this.shadow.appendChild(this.modal);
    }
    open() {
        this.modal.classList.add('uk-open');
        this.modal.style.display = 'block';
    }
    close() {
        this.modal.classList.remove('uk-open');
        this.modal.style.display = '';
    }
    set hasHeader(val) {
        if (val) {
            this.header.classList.remove('uk-hidden');
        }
        else {
            this.header.classList.add('uk-hidden');
        }
    }
    get hasHeader() {
        return !this.header.classList.contains('uk-hidden');
    }
    set hasFooter(val) {
        if (val) {
            this.footer.classList.remove('uk-hidden');
        }
        else {
            this.footer.classList.add('uk-hidden');
        }
    }
    get hasFooter() {
        return !this.footer.classList.contains('uk-hidden');
    }
    static create(o) {
        const modal = document.createElement('uikit-modal');
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
customElements.define('uikit-modal', Bulma);
exports.default = Bulma;
