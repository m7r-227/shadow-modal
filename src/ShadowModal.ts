import IOptions from './IOptions';
class ShadowModal extends HTMLElement {
    public backdrop: HTMLDivElement;
    public modal: HTMLDivElement;
    public dialog: HTMLDivElement;
    public header: HTMLDivElement;
    public modalTitle: HTMLDivElement;
    public body: HTMLDivElement;
    public footer: HTMLDivElement;

    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

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

        // get the first HTMLElement of the template content
        this.modal = Array.prototype.filter.call(template.content.childNodes, (n: Node) => n instanceof HTMLElement)[0];

        this.dialog = this.modal.querySelector('.modal-dialog') as HTMLDivElement;
        this.header = this.modal.querySelector('.modal-header') as HTMLDivElement;
        this.modalTitle = this.header.querySelector('.modal-title') as HTMLDivElement;
        this.body = this.modal.querySelector('.modal-body') as HTMLDivElement;
        this.footer = this.modal.querySelector('.modal-footer') as HTMLDivElement;

        // Close the modal when clicking outside of modal-dialog
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
        this.modal.classList.add('show', 'd-block');
        this.backdrop.classList.remove('d-none');
    }

    public close() {
        this.modal.classList.remove('show', 'd-block');
        this.backdrop.classList.add('d-none');
    }

    public setTitle(text: string) {
        this.modalTitle.textContent = text;
    }

    public setContent(content: string | HTMLElement): HTMLElement | null {
        // remove body content
        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }

        // append content to the modal body
        if (content instanceof HTMLElement) {
            this.body.appendChild(content);
        } else if (typeof content === 'string') {
            this.body.innerHTML = content;
        }
        return this.body.firstChild;
    }

    public addStyle(rules: string) {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(rules));
        this.shadow.appendChild(style);
        return style;
    }

    public removeStyle(style: HTMLStyleElement) {
        if (style instanceof HTMLStyleElement) {
            const parent = style.parentNode;
            if (parent !== null && this.shadow.isSameNode(parent)) {
                this.shadow.removeChild(style);
            }
        }
    }

    public addFooterBtn(text: string, classNames?: string | string[], callback?: (this: ShadowModal, ev: MouseEvent) => void) {
        const button = document.createElement('button');
        button.textContent = text;
        if (classNames) {
            if (typeof classNames === 'string') {
                classNames = classNames.split(' ');
            } else if (!Array.isArray(classNames) || classNames.some((c) => typeof c !== 'string')) {
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

    public removeFooterBtn(button: HTMLButtonElement) {
        if (button instanceof HTMLButtonElement) {
            const parent = button.parentNode;
            if (parent !== null && this.footer.isSameNode(parent)) {
                this.footer.removeChild(button);
            }
        }
    }

    public set isLarge(val: boolean) {
        if (val) {
            this.dialog.classList.remove('modal-sm');
            this.dialog.classList.add('modal-lg');
        } else {
            this.dialog.classList.remove('modal-lg');
        }
    }

    public get isLarge() {
        return this.dialog.classList.contains('modal-lg');
    }

    public set isSmall(val: boolean) {
        if (val) {
            this.dialog.classList.remove('modal-lg');
            this.dialog.classList.add('modal-sm');
        } else {
            this.dialog.classList.remove('modal-sm');
        }
    }

    public get isSmall() {
        return this.dialog.classList.contains('modal-sm');
    }

    public set isVerticallyCentered(val: boolean) {
        if (val) {
            this.dialog.classList.add('modal-dialog-centered');
        } else {
            this.dialog.classList.remove('modal-dialog-centered');
        }
    }

    public get isVerticallyCentered() {
        return this.dialog.classList.contains('modal-dialog-centered');
    }

    public set hasHeader(val: boolean) {
        if (val) {
            this.header.classList.remove('d-none');
        } else {
            this.header.classList.add('d-none');
        }
    }

    public get hasHeader() {
        return !this.header.classList.contains('d-none');
    }

    public set hasFooter(val: boolean) {
        if (val) {
            this.footer.classList.remove('d-none');
        } else {
            this.footer.classList.add('d-none');
        }
    }

    public get hasFooter() {
        return !this.footer.classList.contains('d-none');
    }

    public destroy() {
        const parent = this.parentNode;
        if (parent !== null) {
            parent.removeChild(this);
        }
    }

    public static create(o: IOptions) {
        const modal = document.createElement('shadow-modal') as ShadowModal;
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

customElements.define('shadow-modal', ShadowModal);

export default ShadowModal;
