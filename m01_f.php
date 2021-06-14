<?php
declare(strict_types=1);

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
function use_store(array $initial=[])
{
    /**@var (bool|int|float|string)[] $store */
    $store = array_filter($initial,fn($val)=>(is_scalar($val)))
        ? array_filter($initial,fn($val)=>(is_scalar($val)))
        : [];

    $get_store = fn(string $key): ?array => (
        array_key_exists($key, $store)
            ? [$key => $store[$key]]
            : null
    );
    $set_store=function(string $key, bool|int|float|string $value) use(&$store)
    {
        $store[$key] = $value;
        return [$key => $store[$key]];
    };

    return [$get_store, $set_store];
}

list($get, $set_store) = use_store();

print_r($set_store("name","Kay"));
