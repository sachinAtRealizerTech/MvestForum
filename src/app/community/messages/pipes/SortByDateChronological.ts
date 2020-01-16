/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core';
import { sortBy } from 'lodash';
import { Thread } from '../model/threads';

@Pipe({ name: 'sortByDateChronological' })
export class SortByDateChronological implements PipeTransform {

    transform(value: Thread[], order = '', column: string = ''): any[] {

        let sorted = value.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
        return sorted;
    }

}