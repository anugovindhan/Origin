
import { Subject } from 'rxjs';

const subject = new Subject();

export const dataService = {
    setData: (d:any) => subject.next({ value: d }),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};