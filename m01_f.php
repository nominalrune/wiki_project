<?php
declare(strict_types=1);


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
