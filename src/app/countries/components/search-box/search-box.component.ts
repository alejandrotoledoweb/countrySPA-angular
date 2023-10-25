import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'countries-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  // @ViewChild('txtSearchInput')
  // public termInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  emitTerm(term: string): void {
    if (term.length === 0) {
      return;
    }

    this.onValue.emit(term);
  }
}
