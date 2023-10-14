abstract class BaseRepository<T extends Arrayable>{
	private connect() {
		// connect to database
	}
	private close() {
		// close database connection
	}
	private execute(sql: string) {
		this.connect();
		try {
			// execute query using given sql
		} finally {
			this.close();
		}
	}
	protected insertData(data: T) {
		const sql = `INSERT INTO ${this.constructor.name} VALUES(${data.toArray().join(",")})`;
		this.execute(sql);
	}
	protected updateData(data: T) {
		const sql = `UPDATE ${this.constructor.name} SET ${data.toArray().join(",")} WHERE id = ${data.id}`;
		this.execute(sql);
	}
	abstract create(...args: any[]): T;
	abstract update(...args: any[]): T;
}
interface Arrayable {
	toArray(): (string | number)[];
}
class UserData implements Arrayable{
	id?: number;
	name: string;
	email: string;
	password: string;
	toArray() {
		return [this.name, this.email, this.password]; // return array of values
	}
	constructor(name:string, email:string, password:string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
class UserRepository extends BaseRepository<UserData>{
	public create(name:string, email:string, password:string) {
		const user = new UserData(name, email, password);
		this.insertData(user);
		return user;
	}
	public update(id:number, name:string, email:string, password:string) {
		const user = new UserData(name, email, password);
		user.id = id;
		this.updateData(user);
		return user;
	}
}
