import AbstractShadowModal from '../AbstractShadowModal';
import UikitOptions from './UikitOptions';
declare class Uikit extends AbstractShadowModal {
    modal: HTMLDivElement;
    header: HTMLDivElement;
    modalTitle: HTMLHeadingElement;
    body: HTMLDivElement;
    footer: HTMLDivElement;
    constructor();
    open(): void;
    close(): void;
    hasHeader: boolean;
    hasFooter: any;
    static create(o?: UikitOptions): Uikit;
}
export default Uikit;
