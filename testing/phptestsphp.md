# 

<?php

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNotNull;
use App\Epreuve;
use App\Lieu;
use App\Date;
use App\Participant;
use App\NotAStringException;
use App\StringTooLongException;
use App\StringTooShortException;
use App\SpecialCharsException;
use App\DateFormatException;
use App\PastDateException;

//nom doit etre non null
//nom doit être une string
//nom doit âvoir moins de 30 caractères
// nom doit avoir plus de 5 caracteres
//nom ne doit pas avoir de carcteres speciaux ?
//lieu doit etre non null
// lieu doit être une string
// lieu doit avoir moins de 40 caractères
// lieu doit avoir plus de 1 caractère
// lieu doit ne doit pas avoir de caractere speciaux
//date doit etre non null
// date doit être au format date
// date doit être dans le futur
//liste-participants doit être non null

it("should not be possible to not have a name", function(){
    $epreuve = new Epreuve();
    $epreuve->setName("Nom de l'épreuve");
    assertNotNull($epreuve->getName());
});

it("should return a string", function(){
    $epreuve = new Epreuve();
    $epreuve->setName(8);
})->expectException(NotAStringException::class);

it("should return a string below 30 signs", function(){
    $epreuve = new Epreuve();
    $epreuve->setName("Ceci est un nom de test bien trop long !!");
})->expectException(StringTooLongException::class);

it("should return a string above 5 signs", function(){
    $epreuve = new Epreuve();
    $epreuve->setName("cc");
})->expectException(StringTooShortException::class);

it("should not contain special signs", function(){
    $epreuve = new Epreuve();
    $lieu = new Lieu();
    $epreuve->setName("L'épeuv€ de Gued|n w@ow");
    $lieu->setName("L'épeuv€ de Gued|n w@ow");
})->expectException(SpecialCharsException::class);

it("should not be possible to not have a location", function(){
    $lieu = new Lieu();
    $lieu->setName("Lieu de l'épreuve");
    assertNotNull($lieu->getName());
});

it("should return a string as location", function(){
    $lieu = new Lieu();
    $lieu->setName(8);
})->expectException(NotAStringException::class);

it("should return a string below 40 signs", function(){
    $lieu = new Lieu();
    $lieu->setName("Ceci est un nom de test bien trop long !!");
})->expectException(StringTooLongException::class);

it("should return a string above 2 signs", function(){
    $lieu = new Lieu();
    $lieu->setName("cc");
})->expectException(StringTooShortException::class);

it("should not be possible to not have a date", function(){
    $date = new Date();
    $date->setDate(1,2,3);
    assertNotNull($date->getDate());
}); 

it("should not return something else than a date", function(){
    $date = new Date();
    $date->setDate(35,18,145);
})->expectException(DateFormatException::class);

// it("should not be possible to choose a past date", function(){
//     $date = new Date();
//     $date->setDate(4,18,1945);
// })->expectException(PastDateException::class);

it("should not be possible for the contestant list to be null", function(){
    $epreuve = new Epreuve();
    assertNotNull($epreuve->getListeParticipants());
}); 

// it("should not be possible for listeParticipants to be equal to 0", function(){
//     $epreuve = new Epreuve();
//     assertEquals(0,$epreuve->getNombreParticipants());
// });
