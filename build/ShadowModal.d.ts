import IOptions from './IOptions';
declare class ShadowModal extends HTMLElement {
    backdrop: HTMLDivElement;
    modal: HTMLDivElement;
    dialog: HTMLDivElement;
    header: HTMLDivElement;
    modalTitle: HTMLDivElement;
    body: HTMLDivElement;
    footer: HTMLDivElement;
    private shadow;
    constructor();
    open(): void;
    close(): void;
    setTitle(text: string): void;
    setContent(content: string | HTMLElement): HTMLElement | null;
    addStyle(rules: string): HTMLStyleElement;
    removeStyle(style: HTMLStyleElement): void;
    addFooterBtn(text: string, classNames?: string | string[], callback?: (this: ShadowModal, ev: MouseEvent) => void): HTMLButtonElement;
    removeFooterBtn(button: HTMLButtonElement): void;
    isLarge: boolean;
    isSmall: boolean;
    isVerticallyCentered: boolean;
    hasHeader: boolean;
    hasFooter: boolean;
    destroy(): void;
    static create(o: IOptions): ShadowModal;
}
export default ShadowModal;
