import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

export class InputHandler {
    private _name1Input: HTMLElement;
    private _name2Input: HTMLElement;

    constructor(){
        this._name1Input = document.getElementById("name1");
        this._name2Input = document.getElementById("name2");
    }
    onKeyUp(): Observable<string> {
        return fromEvent("keyup", this._name1Input).pipe(
            debounceTime(300)
        )
    }
}