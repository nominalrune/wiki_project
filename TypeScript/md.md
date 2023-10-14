# クラス設計.md

## 継承での実装
```mermaid
classDiagram
    class BaseRepository {
        <<abstract>>
        +connect()
        +close()
        +execute(sql: string)
        +insertData(data: T)
        +updateData(data: T)
        +create(...args: any[]): T
        +update(...args: any[]): T
    }
    class UserRepository {
        +create(name: string, email: string, password: string)
        +update(id: number, name: string, email: string, password: string)
    }
    class UserData {
        -id?: number
        -name: string
        -email: string
        -password: string
        +toArray(): (string | number)[]
        +construcinterface IDatabaseConnection {
	execute(sql: string): any;
}
class DatabaseConnection implements IDatabaseConnection {
	constructor(private config: DatabaseConfig) {
		this.connect();
	}
	private connect() {
		// Connect to the database using this.config
	}
	private close() {
		// Close the database connection
	}
	execute(sql: string) {
		try {
			// Execute the query using the provided SQL
		} finally {
			this.close();
		}
	}
}

class DatabaseConfig {
	// Define configuration properties like host, port, username, password, etc.
	constructor(public url: string, public port: number, public username: string, public password: string) { }
}

class TableRepository {
	private name: string;

	constructor(private connection: IDatabaseConnection, name: string) {
		this.name = name;
	}
	find(id: number) {
		const result = this.connection.execute(`SELECT * FROM ${this.name} WHERE id = ${id}`);
		return result;
	}
	insert(data: Arrayable) {
		const result = this.connection.execute(`INSERT INTO ${this.name} VALUES (${data.toArray().join(',')})`);
		return result;
	}
	update(data: WithId<Arrayable>) {
		const result = this.connection.execute(`UPDATE ${this.name} SET ${data.toArray().join(',')} WHERE id = ${data.id}`);
		return result;
	}
}
type WithId<T> = T & { id: number; };
interface Arrayable {
	toArray(): (string | number)[];
}
class UserData implements Arrayable {
	constructor(public name: string, public email: string, public password: string) { }
	toArray() {
		return [this.name, this.email, this.password];
	}
}

class UserRepository {
	private repository: TableRepository;

	public create(name: string, email: string, password: string) {
		const user = new UserData(name, email, password); // Assuming ID is auto-generated or provided later
		this.repository.insert(user);
		return user;
	}
	constructor(connection: IDatabaseConnection) {
		this.repository = new TableRepository(connection, 'users');
	}
}tor(name: string, email: string, password: string)
    }
    class Arrayable {
        <<interface>>
        +toArray(): (string | number)[]
    }
    BaseRepository <|-- UserRepository :inherits
    UserData <.. BaseRepository :dependes on
    Arrayable <|.. UserData :realizes
```
