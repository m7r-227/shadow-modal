import IShadowModal from '../IShadowModal';
export default interface IBoostrap4Options {
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
        click: (this: IShadowModal, ev: MouseEvent) => void;
    }>;
}
