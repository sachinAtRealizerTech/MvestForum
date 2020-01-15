import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
//import {}

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe extends
    DatePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        //console.log('date from custompipe-', super.transform(value, "EEEE d MMMM y h:mm a"));
        let date = new Date();
        let yestarday = date.setDate(date.getDate() - 1);
        if (super.transform(value, "EEE d MMMM y") == super.transform(new Date(), "EEE d MMMM y")) {
            //console.log('date from custompipe-', value);
            return super.transform(value, "h:mm a");
        } else if (super.transform(value, "EEE d MMMM y") == super.transform(yestarday, "EEE d MMMM y")) {
            return super.transform(value, "EEE d MMM h:mm a");
        }
        else {

            return super.transform(value, "EEE d MMM y h:mm a");
        }

    }

}