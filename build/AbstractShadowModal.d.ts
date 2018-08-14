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
    addFooterBtn(text: string, classNames?: string | string[], callback?: (this: IShadowModal, ev: MouseEvent) => void): HTMLButtonElement;
    abstract hasHeader: boolean;
    abstract hasFooter: boolean;
}
export default AbstractShadowModal;
