import AbstractShadowModal from '../AbstractShadowModal';
import UikitOptions from './UikitOptions';
declare class Bulma extends AbstractShadowModal {
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
    static create(o?: UikitOptions): Bulma;
}
export default Bulma;
