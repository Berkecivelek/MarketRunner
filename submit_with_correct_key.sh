#!/bin/bash

# Doğru API key ile submit et
export APP_STORE_CONNECT_API_KEY_ID=LS6J5L9QM2
export APP_STORE_CONNECT_ISSUER_ID=c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe
export APP_STORE_CONNECT_API_KEY_PATH=/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8

eas submit --platform ios --latest
