# work/都道府県振り分け.md
```ts
const list = {
	sapporo: ['北海道'],
	morioka: ['青森県', '秋田県', '岩手県'],
	sendai: ['宮城県', '山形県'],
	fukushima: ['福島県'],
};

function belongsTo(pref: string) {
	return Object.keys(list).find(
		(branch, index) => {
			if (branch in list) {
				return list[branch].find((item, index) => (
					item === pref ? branch : false
				))
			}
		})
};

```