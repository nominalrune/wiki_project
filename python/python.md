# Python
## main.py
```py
def main():
  # include whatever
if __name__ == "__main__":
  main()
```

## Array
array`col`がある。
dictにcolの先頭をキーとして、それ以降をあれーとして収める。
もしNoneじゃなかったら収める。
```py
dict[col[1]]=[i for i in col[2:] if bool(i)]
```
