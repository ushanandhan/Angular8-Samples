import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<any>, field: string, searchTerm: string): any {
    if (!field) { return []; }
    if (searchTerm == null) { 
      return [...value]; // spread operator
    }
    return value.filter((item) => item[field] === searchTerm);
  }

}
