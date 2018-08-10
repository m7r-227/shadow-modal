import AbstractShadowModal from '../AbstractShadowModal';
import IBoostrap4Options from './IBoostrap4Options';
declare class Bootstrap4 extends AbstractShadowModal {
    backdrop: HTMLDivElement;
    modal: HTMLDivElement;
    dialog: HTMLDivElement;
    header: HTMLDivElement;
    modalTitle: HTMLDivElement;
    body: HTMLDivElement;
    footer: HTMLDivElement;
    constructor();
    open(): void;
    close(): void;
    isLarge: boolean;
    isSmall: boolean;
    isVerticallyCentered: boolean;
    hasHeader: boolean;
    hasFooter: any;
    static create(o: IBoostrap4Options): Bootstrap4;
}
export default Bootstrap4;
