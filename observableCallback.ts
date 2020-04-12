import {Observable, OperatorFunction, Subject} from "rxjs"

type ObservableCallbackTuple<T, K> = [Observable<K>, (arg: T) => void]

const pass = (input$: Observable<any>) => input$

export function observableCallback<T>(): ObservableCallbackTuple<T, T>

export function observableCallback<T, K>(
  operator: OperatorFunction<T, K>
): ObservableCallbackTuple<T, K>

export function observableCallback<T, K>(
  operator: OperatorFunction<T, K> = pass
): ObservableCallbackTuple<T, K> {
  const subject = new Subject<T>()
  return [subject.pipe(operator), (arg: T) => subject.next(arg)]
}
