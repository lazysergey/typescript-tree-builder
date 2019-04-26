import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';

export class InputHandler {
  private _name1Input: HTMLInputElement;
  private _name2Input: HTMLInputElement;
  private _resultContainer: HTMLElement;

  constructor() {
    this._name1Input = document.getElementById("name1") as HTMLInputElement;
    this._name2Input = document.getElementById("name2") as HTMLInputElement;
    this._resultContainer = document.getElementById("result");
  }

  private _createEventObservable(target: HTMLInputElement) {
    return fromEvent(target, "keyup").pipe(
      debounceTime(300),
      map((event: KeyboardEvent) => this._getValue(event)),
      filter(value => !!value),
      distinctUntilChanged()
    )
  }

  private _getValue(event: KeyboardEvent){
    return (event.target as HTMLInputElement).value;
  }

  onKeyUp(): Observable<any> {
    return combineLatest(
      this._createEventObservable(this._name1Input),
      this._createEventObservable(this._name2Input),
      (value1, value2) => ({
        input1: value1,
        input2: value2
      })
    )
  }

  set result(value: string) {
    this._resultContainer.innerText = value;
  }
}