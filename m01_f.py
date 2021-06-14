from typing import Union
T = Union[bool, int, float, str]


def use_store():
  """
  Stores key-value variables.

  When called, this returns `getStore()` and `setStore()`:
  - `getStore(key)`
    - gets `value` corresponds to the given key.
  - `setStore(key, value)`
    - sets `key` and `value`, this overwrites the value when it's already set. Then returns a ingle `{key:value}` set of onject.

  Notice each `key` must be `string` and `value` be scalar (that is, boolean, number, string).
  """
    store: dict[str, T] = {}

    def get_store(key: str):
      return {key: store[key]} if key in store else None

    def set_store(key: str, value: T) -> dict[str, T]:
      store[key] = value
      return {key: store[key]}

    return (get_store, set_store)

if '__name__'=='__main__'
(get, set_store) = use_store()

print(set_store("name", "Kay"))
