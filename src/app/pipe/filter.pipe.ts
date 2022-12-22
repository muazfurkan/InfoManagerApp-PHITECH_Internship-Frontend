import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: User[], _filterText: string, _searchCondition: string): User[] {
    console.log(value, _filterText, _searchCondition)
    if(!_filterText){
      return value;
    }
    else if(_searchCondition=='Name'){
      return value.filter(_name=>_name.name.trim().toLocaleLowerCase()
      .indexOf(_filterText.toLocaleLowerCase())!==-1)  // bulamazsa -1 döndürmeli
    }                                                 // bulursa index numarasını döndürür
    else if(_searchCondition=='Email'){
      return value.filter(_email=>_email.email.trim().toLocaleLowerCase()
      .indexOf(_filterText.toLocaleLowerCase())!==-1)
    }
    else if(_searchCondition=='Phone'){
      return value.filter(_phone=>_phone.phone.trim().toLocaleLowerCase()
      .indexOf(_filterText.toLocaleLowerCase())!==-1)
    }
    else if(_searchCondition=='Address'){
      return value.filter(_address=>_address.address.trim().toLocaleLowerCase()
      .indexOf(_filterText.toLocaleLowerCase())!==-1)
    }
    else{ return value ; }
  }

}
