import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Pipe({
    name: 'doc'
})

export class DocPipe implements PipeTransform {
    constructor(private firestore: FirestoreService) {

    }
    transform(value: any, ...args: any[]): Observable<any> {
        return this.firestore.doc$(value.path);
    }
}