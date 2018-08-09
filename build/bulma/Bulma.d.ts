import AbstractShadowModal from '../AbstractShadowModal';
import IBulmaOptions from './IBulmaOptions';
declare class Bulma extends AbstractShadowModal {
    modal: HTMLDivElement;
    backdrop: HTMLDivElement;
    header: HTMLDivElement;
    modalTitle: HTMLDivElement;
    body: HTMLDivElement;
    footer: HTMLDivElement;
    private hideClasses;
    constructor();
    open(): void;
    close(): void;
    hasHeader: boolean;
    hasFooter: any;
    static create(o: IBulmaOptions): Bulma;
}
export default Bulma;
