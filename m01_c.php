<?php
declare(strict_types=1);

class Store
{
    /**@var (bool|int|float|string)[] $store */
    private $store = [];

    public function getStore(string $key): ?array {
        return array_key_exists($key, $this->store)
            ? [$key => $this->store[$key]]
            : null;
    }
    public function setStore(string $key, object|int|float|string $value)
    {
        $this->store[$key] = $value;
        return [$key => $this->store[$key]];
    }
}

$store= new Store();

print_r($store->setStore("name","Kay"));


