<?php

use function PHPUnit\Framework\assertNotNull;
use App\Participant;
use App\NotAStringException;
use App\StringTooLongException;
use App\SurnameStringTooShortException;
use App\SpecialCharsException;

// ne doit pas être null?????????
// ne doit pas ne pas avoir de nom -----------
// nom doit être une string-------------------
// nom doit avoir moins de 25 caractères------
// nom doit avoir plus de 2 caractères--------
// nom ne doit pas avoir de caractères spéciaux--------
// ne doit pas ne pas avoir de prenom--------------------
// prenom doit être une string---------------------------
// prenom doit avoir moins de 20 caractères--------------
// prenom doit avoir plus de 2 caractères----------------
// prenom ne doit pas avoir de caractères spéciaux-------
// ne doit pas ne pas avoir un dateNaissance
// dateNaissance doit être un entier ???????????????
// dateNaissance doit être positif
// dateNaissance doit être compris entre 7 et 99 ans
// adressemail ne doit pas être null
// adressemail doit être une string
// adressemail doit être au format adresse mail
// adresssemail doit être valide ???
// profil ne peut pas être autre chose que null ou ASVP, ou Open, ou Garde-champêtre
// categorie ne peut pas être autre chose que null ou M1, M2, M3, Snow, Senior, V, ou NG
// lienPhoto ne doit pas être null
// lienPhoto doit être une string
// lienPhoto doit être au format adresse jpg ou png
// ne doit pas ne pas avoir de numeroDossard
// numeroDossard doit être un nombre
// numeroDossard ne doit pas être negatif
// numeroDossard ne doit pas être égal à un autre numeroDossard
// numeroDossard doit être un entier

it("should not be possible to not have a name", function(){
    $participant = new Participant();
    $participant->setSurname("Astier");
    $participant->setName("Alexandre");
    assertNotNull($participant->getSurname());
    assertNotNull($participant->getName());
});

it("should return a string", function(){
    $participant = new Participant();
    $participant->setSurname(8);
    $participant->setName(8);
})->expectException(NotAStringException::class);

it("should return a string below 30 signs", function(){
    $participant = new Participant();
    $participant->setSurname("Ceci est un nom de famille bien trop long !!");
    $participant->setName("Ceci est un prenom-composé bien trop long !!");
})->expectException(StringTooLongException::class);

it("should return a string above 1 sign", function(){
    $participant = new Participant();
    $participant->setSurname("Z");
    $participant->setName("Z");
})->expectException(SurnameStringTooShortException::class);

it("should not contain special signs", function(){
    $participant = new Participant();
    $participant->setSurname("Y•L0");
    $participant->setName("Y•L0");
})->expectException(SpecialCharsException::class);

// it("should not be possible to be null", function(){
//     $participant = new Participant();
//     assertNotNull($participant->getMail());
// });