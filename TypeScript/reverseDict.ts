
type Primitive = number | string;
type Primitives<T> = T extends infer Primitive? Primitive:Primitive[];

interface hash<T>{
	[key:string]:Primitives<T>,
}

abstract class IDict<T>{
	protected data:hash<T>
	constructor(data:hash<T>){this.data=data;}
	abstract has(query:Primitive):boolean;
	abstract get(query:Primitive):string;
}

export class ArrayDict<T extends Primitive[]> extends IDict<T>{
	constructor(data:hash<T>){
		super(data);
	}
	get(query:Primitive){
		for (const key in this.data){
			if(this.data[key].find(i=>i===query))return key;
		}
		throw new Error("no results")
	}
	has(query:Primitive){
		try{
			this.get(query);
			return true;
		}
		catch{
			return false;
		}
	}
};
export class HashDict<T extends object> extends IDict<T>{
	constructor(data:hash<T>){
		super(data);
	}
	get(query:Primitive){
		for (const key in this.data){
			if(this.data[key]===query) return key;
		}
		throw new Error("no results")
	}
	has(query:Primitive){
		try{ //FIXME
			this.get(query);
			return true;
		}
		catch{
			return false;
		}
	}
};







// type groupValue= typeof group[keyof typeof group][number] 



// function getKeyFromValue(value:groupValue){
// 	const parentList=Object.keys(group).filter(k=>value in group[k])
// 	return value in group? group[value] as const:undefined
// }


// function belongsTo(pref: string) {
// 	return Object.keys(group).find(
// 		(branch, index) => {
// 			if (branch in group) {
// 				return group[branch].find((item, index) => (
// 					item === pref ? branch : false
// 				))
// 			}
// 		})
// };
