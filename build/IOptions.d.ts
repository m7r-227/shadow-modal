import ShadowModal from './ShadowModal';
export default interface IOptions {
    title?: string;
    content?: string | HTMLElement;
    appendTo?: string;
    isLarge?: boolean;
    isSmall?: boolean;
    isVerticallyCentered?: boolean;
    hasHeader?: boolean;
    hasFooter?: boolean;
    style?: string;
    footerBtns?: Array<{
        text: string;
        classNames: string | string[];
        click: (this: ShadowModal, ev: MouseEvent) => void;
    }>;
}
