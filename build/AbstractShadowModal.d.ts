import IShadowModal from './IShadowModal';
declare abstract class AbstractShadowModal extends HTMLElement implements IShadowModal {
    abstract modal: HTMLElement;
    abstract header: HTMLElement;
    abstract modalTitle: HTMLElement;
    abstract body: HTMLElement;
    abstract footer: HTMLElement;
    protected shadow: ShadowRoot;
    constructor();
    abstract open(): void;
    abstract close(): void;
    setTitle(text: string): void;
    setContent(content: string | HTMLElement): HTMLElement | null;
    addStyle(rules: string): HTMLStyleElement;
    removeStyle(style: HTMLStyleElement): void;
    addFooterBtn(text: string, classNames?: string | string[], callback?: (this: IShadowModal, ev: MouseEvent) => void): HTMLButtonElement;
    removeFooterBtn(button: HTMLButtonElement): void;
    abstract hasHeader: boolean;
    abstract hasFooter: boolean;
    destroy(): void;
}
export default AbstractShadowModal;