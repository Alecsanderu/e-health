import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isDefined } from '../../config/functions/is-defined';
import { valueIsEmpty } from '../../config/functions/is-empty.function';


type IconPosition = 'left' | 'right';
type StyleType = 'link' | 'text' | 'outlined' | null;
type Severity = 'primary' | 'danger' | 'secondary' | 'success' | 'warning' | 'help' | 'info';

@Directive()
export class BaseButton implements OnInit {

    @Input() label: string = '';
    @Input() icon: string = '';
    @Input() iconPos: IconPosition = 'left';
    @Input() loading: boolean = false;
    @Input() disabled: boolean = false;
    @Input() styleType: StyleType = null;
    @Input() extraStyleClass: string = '';

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    private readonly severity: Severity;
    private readonly customStyleClass?: string;

    constructor(severity: Severity, customStyleClass?: string) {
        this.severity = severity;
        this.customStyleClass = customStyleClass;
    }

    get styleClass(): string {

        if( isDefined( this.customStyleClass ) ) {
            return this.customStyleClass;
        }

        const severityClass = `p-button-${ this.severity }`;
        const styleTypeClass = isDefined( this.styleType )
                               ? `p-button-${ this.styleType }`
                               : '';

        return 'p-button-sm ' + severityClass + ' ' + styleTypeClass + ' ' + this.extraStyleClass;
    }

    ngOnInit(): void {
        if( valueIsEmpty( this.label ) && valueIsEmpty( this.icon ) ) {
            this.label = '<<No icon or label>>';
        }
    }

    onBtnClicked(): void {
        this.onClick.emit();
    }
}
