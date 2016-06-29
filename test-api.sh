#!/bin/sh

curl --verbose -H "Accept:application/json" http://contacts/contacts/v1/contacts

echo

curl --verbose -H "Accept:application/json" http://contacts/contacts/v1/contacts/80

echo
