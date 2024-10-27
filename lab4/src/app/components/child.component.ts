import { Input, Component} from '@angular/core';
      
@Component({
    selector: 'child-comp',
	templateUrl:'./child.component.html'
})
export class ChildComponent{ 
    @Input() myArr!: number[] | null;

	sample():number[] | null{
		if(this.myArr && this.myArr.length > 1){
			const min_index = this.myArr.indexOf(Math.min(...this.myArr))
			const max_index = this.myArr.indexOf(Math.max(...this.myArr))

			const start_index = Math.min(max_index, min_index);
			const end_index = Math.max(max_index, min_index);

			return this.myArr.slice(start_index+1,end_index)
		}
		else 
		return null;
	} 
}
