export default interface IShadowModal {
    modal: HTMLElement;
    header: HTMLElement;
    modalTitle: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;
    hasHeader: boolean;
    hasFooter: boolean;
    open(): void;
    close(): void;
    setTitle(text: string): void;
    setContent(content: string | HTMLElement): HTMLElement | null;
    addStyle(rules: string): HTMLStyleElement;
    addFooterBtn(text: string, classNames?: string | string[], callback?: (this: IShadowModal, ev: MouseEvent) => void): HTMLButtonElement;
}
