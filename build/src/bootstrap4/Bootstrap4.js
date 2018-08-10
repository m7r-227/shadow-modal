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
