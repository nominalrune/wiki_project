<?php

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNull;


use App\Hello;
use App\Passage;
use App\NegativeNumberException;
use App\NonIntegerNumberException;
use App\HighNumberException;

// it("returns Hello if input is multiple of 3", function(){
//     $hello = new Hello();
//     $input = 3;
//     assertEquals("Hello", $hello->hello($input));
// });

// it("returns Salut if input is multiple of 5", function(){
//     $hello = new Hello();
//     $input = 5;
//     assertEquals("Salut", $hello->hello($input));
// });

//prendre l'habitude d'écrire en comm ce que mon objet peut ou ne pas faire.
// nombre de passages doit être entier.
// pas supérieur à 2


it("should set and return the passage number 1", function(){
    $passage = new Passage();
    $passage->setPassageNumber(1);
    assertEquals($passage->getNumber(), 1);
});


it("should set and return the passage number 2", function(){
    $passage = new Passage();
    $passage->setPassageNumber(2);
    assertEquals($passage->getNumber(), 2);
});


it("should be possible for passageNumber to be null", function(){
    $passage = new Passage();

    assertNull($passage->getNumber());
});

it("should not be possible for passageNumber to be negative", function(){
    $passage = new Passage();
    $passage->setPassageNumber(-2);
})->expectException(NegativeNumberException::class);

it("should not be possible for passageNumber to be superior to 2", function(){
    $passage = new Passage();
    $passage->setPassageNumber(4);
})->expectException(HighNumberException::class);

it("should not be possible for passageNumber to be a non-integral", function(){
    $passage = new Passage();
    $passage->setPassageNumber(1.38);
})->expectException(NonIntegerNumberException::class);

