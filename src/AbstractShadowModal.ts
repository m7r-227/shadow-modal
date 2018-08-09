import IShadowModal from './IShadowModal';

abstract class AbstractShadowModal extends HTMLElement implements IShadowModal {
    public abstract modal: HTMLElement;
    public abstract header: HTMLElement;
    public abstract modalTitle: HTMLElement;
    public abstract body: HTMLElement;
    public abstract footer: HTMLElement;

    protected shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    public abstract open(): void;

    public abstract close(): void;

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

    public addFooterBtn(text: string, classNames?: string | string[], callback?: (this: IShadowModal, ev: MouseEvent) => void) {
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

    public abstract set hasHeader(val: boolean);

    public abstract get hasHeader();

    public abstract set hasFooter(val: boolean);

    public abstract get hasFooter();

    public destroy() {
        const parent = this.parentNode;
        if (parent !== null) {
            parent.removeChild(this);
        }
    }
}

export default AbstractShadowModal;
