import IShadowModal from '../IShadowModal';
export default interface IBulmaOptions {
    title?: string;
    content?: string | HTMLElement;
    appendTo?: string;
    hasHeader?: boolean;
    hasFooter?: boolean;
    style?: string;
    footerBtns?: Array<{
        text: string;
        classNames?: string | string[];
        click?: (this: IShadowModal, ev: MouseEvent) => void;
    }>;
}
