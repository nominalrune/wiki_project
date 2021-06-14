type BasicPrimitive=boolean|number|string;

/**
 * stores key-value variables.<br/>
 * each `key` must be `string` and `value` be scalar (boolean, number, string).<br/><br/>
 * When called, this returns `getStore()` and `setStore()`:
 * - `getStore(key)`
 *   - gets `value` corresponds to the givven key.
 * - `setStore(key, value)`
 *   - sets `key` and `value`. Then returns `{key:}`
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
