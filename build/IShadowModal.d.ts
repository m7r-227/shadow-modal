export default interface IShadowModal {
    modal: HTMLElement;
    header: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;
    open(): void;
    close(): void;
    setTitle(text: string): void;
    setContent(content: string | HTMLElement): HTMLElement | null;
    addStyle(rules: string): HTMLStyleElement;
    removeStyle(style: HTMLStyleElement): void;
    addFooterBtn(text: string, classNames?: string | string[], callback?: (this: IShadowModal, ev: MouseEvent) => void): HTMLButtonElement;
    removeFooterBtn(button: HTMLButtonElement): void;
    hasHeader: boolean;
    hasFooter: boolean;
}
