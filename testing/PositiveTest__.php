<?php



it("should be positive", function(){
    $input = 3;
    expect($input)->toBeGreaterThan(0);
});