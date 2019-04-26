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
        this._subscribeToOnClick(this._name1Input);
        this._subscribeToOnClick(this._name2Input);
    }

    private _createKeyUpObservable(target: HTMLInputElement) {
        return fromEvent(target, "keyup").pipe(
            debounceTime(300),
            map((event: KeyboardEvent) => this._getValue(event)),
            filter(value => !!value),
            distinctUntilChanged()
        )
    }

    private _subscribeToOnClick(target: HTMLInputElement) {
        return fromEvent(target, "focus").subscribe(event => 
        (event.target as HTMLInputElement).setSelectionRange(0, (event.target as HTMLInputElement).value.length)
        )
    }

    private _getValue(event: KeyboardEvent) {
        return (event.target as HTMLInputElement).value;
    }

    onKeyUp(): Observable<any> {
        return combineLatest(
            this._createKeyUpObservable(this._name1Input),
            this._createKeyUpObservable(this._name2Input),
            (value1, value2) => ({
                input1: value1,
                input2: value2
            })
        )
    }

    set result(value: string) {
        this._resultContainer.innerHTML = value;
    }
}