import { Injectable } from '@angular/core';
import { Thread } from '../model/threads';


@Injectable({
    providedIn: 'root'
})
export class MessageUtils {

    constructor() {

    }
    public static getArrayLength(arr: any) {
        return arr.length;
    }
    public static getDynamicNameForThread(threads) {

    }

    public static isThreadOneToOne(thread: Thread) {
        return thread.participants.length == 2;
    }
}