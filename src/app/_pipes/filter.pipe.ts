import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], options: FilterOptions): any[] {
		let { attrName, childAttrName, value } = options;
		if(!items) return [];

		if(typeof(value)=="string" && !value) return items;
		if(typeof(value)=="string") value = value.toLowerCase();

		return items.filter( it => {
			let attr = childAttrName? it[attrName][childAttrName]: it[attrName];

			if(typeof(attr)=="string") {
				attr = attr.toLowerCase();
				return attr.includes(value);

			} else {
				return attr == value;
			}

		});
	} 
}

export class FilterOptions {
	attrName: string;
	childAttrName: string;
	value: any;

	deserialize(data: any) {
		Object.assign(this, data);

		return this;
	}
}