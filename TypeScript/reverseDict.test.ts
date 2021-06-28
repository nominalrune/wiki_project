import 'jest';
import { ArrayDict, HashDict } from './reverseDict';
const testGroup00= {
	hokkaido: ['北海道'],
	tohoku: ['青森県', '秋田県', '岩手県','宮城県', '山形県','福島県'],
} as const;


describe("reverseDict test00",()=>{
	it("do",()=>{
		const prefDict=new HashDict(testGroup00);
	})
})
