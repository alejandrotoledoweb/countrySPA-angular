import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'countries-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();
  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  // @ViewChild('txtSearchInput')
  // public termInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer.pipe(debounceTime(300)).subscribe((value) => {
      console.warn('debouncer value:', value);
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitTerm(term: string): void {
    if (term.length === 0) {
      return;
    }

    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
    // how to do it without debounce
    // if (searchTerm.length === 0) {
    //   return;
    // }
    // this.onDebounce.emit(searchTerm);
  }
}
