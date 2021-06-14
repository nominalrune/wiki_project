from typing import Union
T = Union[bool, int, float, str]


def use_store():
  store: dict[str, T] = {}

  def get_store(key: str):
    return {key: store[key]} if key in store else None

  def set_store(key: str, value: T) -> dict[str, T]:
    store[key] = value
    return {key: store[key]}

  return (get_store, set_store)


(get, set_store) = use_store()

print(set_store("name", "Kay"))
