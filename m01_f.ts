type BasicPrimitive=boolean|number|string;

/**
 * Stores key-value variables.
 * 
 * When called, this returns `getStore()` and `setStore()`:
 * - `getStore(key)`
 *   - gets `value` corresponds to the given key.
 * - `setStore(key, value)`
 *   - sets `key` and `value`, this overwrites the value when it's already set. Then returns a single `{key:value}` set of onject.
 * 
 * Notice each `key` must be `string` and `value` be scalar (that is, boolean, number, string).
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