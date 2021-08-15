import { from, fromEvent,interval, timer } from 'rxjs';
import { takeUntil,tap, mergeMap, finalize, switchMap, pluck, exhaustMap, switchMapTo} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

const startClick = document.getElementById('start');
const stopClick = document.getElementById('stop');
const pollingStatus = document.getElementById('polling-status');
const dogImg = document.getElementById('dog-img');

const startClick$ = fromEvent(startClick,'click');
const stopClick$ = fromEvent(stopClick,'click');


startClick$.pipe(
   exhaustMap(()=> timer(0,3000).pipe(
    tap(()=>  pollingStatus.innerHTML = 'Started'),
    switchMapTo(
         ajax.getJSON('https://random.dog/woof.json').pipe(pluck('url'))
    ),
       takeUntil(stopClick$),
        finalize(()=>pollingStatus.innerHTML = 'Stopped')
   )),
   
).subscribe(url=>
    (dogImg.src =url ));