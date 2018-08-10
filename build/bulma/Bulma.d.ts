import AbstractShadowModal from '../AbstractShadowModal';
import IBulmaOptions from './IBulmaOptions';
declare class Bulma extends AbstractShadowModal {
    modal: HTMLDivElement;
    background: HTMLDivElement;
    header: HTMLElement;
    modalTitle: HTMLParagraphElement;
    body: HTMLElement;
    footer: HTMLElement;
    private hideClasses;
    constructor();
    open(): void;
    close(): void;
    hasHeader: boolean;
    hasFooter: any;
    static create(o?: IBulmaOptions): Bulma;
}
export default Bulma;
