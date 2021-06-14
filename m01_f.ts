type BasicPrimitive=boolean|number|string;
/**
 * returns `getStore`
 *
 * 
 */
function useStore() {
	const store: {[key:string]:BasicPrimitive} = {};

	const getStore = (key: string) => {
		if (key in store) return { [key]: store[key] };
		return undefined;
	};
	const setStore = (key: string, value: BasicPrimitive) => {
		
		return { [key]: Object.assign(store, { [key]: value })[key] };
	};
	return { getStore, setStore };
}

const { setStore } = useStore();

console.log(setStore("name","Kay"))
