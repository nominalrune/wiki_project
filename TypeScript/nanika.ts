
const group= {
	hokkaido: ['北海道'],
	tohoku: ['青森県', '秋田県', '岩手県','宮城県', '山形県','福島県'],
} as const;

type Primitive = number | string;
type Primitives<T> = T extends infer Primitive? Primitive:Primitive[];


interface hash<T>{
	[key:string]:Primitives<T>,
}


declare class IDict<T>{
	protected data:hash<T>
	constructor(data:hash<T>){this.data=data;}
	has(query:Primitive):boolean;
	get(query:Primitive):string;
}

class ArrayDict<T extends Primitive[]> extends IDict<T>{
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
class hashDict<T extends Primitive> extends IDict<T>{
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
		try{
			this.get(query);
			return true;
		}
		catch{
			return false;
		}
	}
};












function getGroup<T extends keyof typeof group, U extends typeof group[T]>(pref:U){
	Object.keys(group).map<Pick<typeof group, T>>((name as U)=>{
		if(group[name].includes())
	})
}


function belongsTo(pref: string) {
	return Object.keys(group).find(
		(branch, index) => {
			if (branch in group) {
				return group[branch].find((item, index) => (
					item === pref ? branch : false
				))
			}
		})
};
