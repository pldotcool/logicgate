# logicgate
Demo -> https://free.logicgate.pl.cool



    [ SET ]     A -|---------
                   | NAND 1   )- OUT
    [ ENABLE ]  B -|_________

    ================================================

    [ ENABLE ]  A -|---------
                   | NAND 2   )- OUT
    [ RESET ]   B -|_________

    ================================================

    [ NAND 1 OUT ]     A -|---------
                          | NAND 3   )- OUT
    [ NAND 4 OUT ]     B -|_________

    ================================================

    [ NAND 3 OUT ]     A -|---------
                          | NAND 4   )- OUT
    [ NAND 2 OUT ]     B -|_________


