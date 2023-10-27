import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'countries-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();
  @Output()
  onValue: EventEmitter<string> = new EventEmitter();
  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  // @ViewChild('txtSearchInput')
  // public termInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((value) => {
      console.warn('debouncer value:', value);
      this.onDebounce.emit(value);
    });
  }

  emitTerm(term: string): void {
    if (term.length === 0) {
      return;
    }

    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
    // if (searchTerm.length === 0) {
    //   return;
    // }
    // this.onDebounce.emit(searchTerm);
  }
}
