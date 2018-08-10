import AbstractShadowModal from '../AbstractShadowModal';
import UikitOptions from './UikitOptions';

class Bulma extends AbstractShadowModal {
    public modal: HTMLDivElement;
    public header: HTMLDivElement;
    public modalTitle: HTMLHeadingElement;
    public body: HTMLDivElement;
    public footer: HTMLDivElement;

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

        this.modal = Array.prototype.filter.call(template.content.childNodes, (n: Node) => n instanceof HTMLElement)[0];

        this.header = this.modal.querySelector('.uk-modal-header') as HTMLDivElement;
        this.modalTitle = this.header.querySelector('.uk-modal-title') as HTMLHeadingElement;
        this.body = this.modal.querySelector('.uk-modal-body') as HTMLDivElement;
        this.footer = this.modal.querySelector('.uk-modal-footer') as HTMLDivElement;

        this.modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof HTMLElement) {
                if (this.modal.isSameNode(target)) {
                    this.close();
                } else if (target.dataset.close !== undefined) {
                    this.close();
                }
            }
        });

        this.shadow.appendChild(this.modal);
    }

    public open() {
        this.modal.classList.add('uk-open');
        this.modal.style.display = 'block';
    }

    public close() {
        this.modal.classList.remove('uk-open');
        this.modal.style.display = '';
    }

    public set hasHeader(val: boolean) {
        if (val) {
            this.header.classList.remove('uk-hidden');
        } else {
            this.header.classList.add('uk-hidden');
        }
    }

    public get hasHeader() {
        return !this.header.classList.contains('uk-hidden');
    }

    public set hasFooter(val) {
        if (val) {
            this.footer.classList.remove('uk-hidden');
        } else {
            this.footer.classList.add('uk-hidden');
        }
    }

    public get hasFooter() {
        return !this.footer.classList.contains('uk-hidden');
    }

    public static create(o?: UikitOptions) {
        const modal = document.createElement('uikit-modal') as Bulma;
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

export default Bulma;
