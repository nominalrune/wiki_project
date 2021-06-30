#!usr/bin/env python
import sys
from os import path
import fileinput
from datetime import date

input("HI")
FILE_PREFIX="mail"
ENCODE="iso-2022-jp"
ENCODE=input("what is the encode? iso-2022-jp?" ) or "iso-2022-jp"

if(sys.argv[1:]):
	out=""
	out.join(fileinput.input(sys.argv[1:]))

	with open(path.dirname(sys.argv[1]) + date.today().strftime("%Y%m%d%H%M") + ".txt", "x") as out_file:
		out_file.write(out)
else : print("BYE")
