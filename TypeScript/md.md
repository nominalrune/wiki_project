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
        +constructor(name: string, email: string, password: string)
    }
    class Arrayable {
        <<interface>>
        +toArray(): (string | number)[]
    }
    UserRepository --|> BaseRepository :inherits
    Arrayable <.. BaseRepository :dependes on
    UserDataArrayable <|..  :realizes
```


## Composition pattern

```mermaid
classDiagram
    class IDatabaseConnection {
        <<interface>>
        +execute(sql: string) any
    }
    class DatabaseConnection {
        -config DatabaseConfig
        +constructor(config: DatabaseConfig)
        -connect() void
        -close() void
        +execute(sql: string) any
    }
    class DatabaseConfig {
        -url string
        -port number
        -username string
        -password string
        +constructor(url: string, port: number, username: string, password: string)
    }
    class Arrayable {
        <<interface>>
        +toArray(): (string | number)[]
    }
    class TableRepository {
        <<T>>
        -connection IDatabaseConnection
        -name string
        +constructor(connection: IDatabaseConnection, name: string)
        +find(id: number) T
        +insert(data: T) T
        +update(data: T) T
    }
    class UserData {
        -name string
        -email string
        -password string
        +constructor(name: string, email: string, password: string)
        +toArray() (string | number)[]
    }
    class UserRepository {
        -repository TableRepository
        +constructor(connection: IDatabaseConnection)
        +create(name: string, email: string, password: string) WithId<Arrayable>
    }
    UserRepository --> DatabaseConnection :depends on
    UserRepository --* TableRepository :composition
    DatabaseConnection ..|> IDatabaseConnection :realizes
    DatabaseConnection --> DatabaseConfig :depends on
    UserData <|.. TableRepository
    UserData ..|> Arrayable
```
