import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroupTyped } from '../../../../config/interfaces/typed-form-group.interface';


@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: [ './form-title.component.scss']
})
export class FormTitleComponent implements OnInit {
  @Input()
  showEditButton!: boolean;
  @Input()
  text!: string;
  @Input()
  icon!: string;
  @Input()
  form?: FormGroupTyped<any>;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClicked(): void {
    this.onClick.emit();
  }

  changeEnableIcon(): 'pi pi-lock-open' | 'pi pi-lock'  {
    if (this.form?.enabled) { return  'pi pi-lock-open'; }
    return 'pi pi-lock';
  }
}
