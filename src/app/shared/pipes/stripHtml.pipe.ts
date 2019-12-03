import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'stripHtml' })
export class stripHtmlPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/<[^>]+>/g, '');
    }
}